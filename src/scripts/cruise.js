// Longitudinal model of a 40 t truck on a road with slopes, and the controllers used by the control lessons.
// Plain functions, no DOM: the lessons component draws what these return.

export const G = 9.81;
export const TRUCK = {
	mass: 40000, // kg
	cr: 0.006, // rolling resistance coefficient
	aero: 3.3, // 0.5 * air density * Cd * frontal area, N/(m/s)^2
	power: 330e3, // W at the wheels
	forceMax: 30e3, // N, traction limit at low speed
	brakeMax: 40e3, // N, service brake and retarder
	lag: 1.5, // s, time constant of the powertrain force
	delay: 0.5, // s, measurement and communication delay
};

export const kmh = (v) => v * 3.6;
export const ms = (v) => v / 3.6;

/** Road: list of [start km, slope %] segments; slopes blend over 60 m so the truck never meets a step in grade. */
export const road = (segments, length) => {
	const blend = 0.06;
	const slopeAt = (km) => {
		let s = 0;
		for (let i = 0; i < segments.length; i += 1) {
			const [start, slope] = segments[i];
			const prev = i ? segments[i - 1][1] : slope;
			if (km < start - blend / 2) break;
			const f = Math.min(1, (km - (start - blend / 2)) / blend);
			s = prev + (slope - prev) * (0.5 - 0.5 * Math.cos(Math.PI * f));
		}
		return s;
	};
	const n = Math.round((length * 1000) / 10);
	const height = [0];
	for (let i = 1; i <= n; i += 1) height.push(height[i - 1] + (slopeAt((i - 0.5) / 100) / 100) * 10);
	const heightAt = (km) => {
		const x = Math.min(n, Math.max(0, km * 100));
		const i = Math.min(n - 1, Math.floor(x));
		return height[i] + (height[i + 1] - height[i]) * (x - i);
	};
	return { length, segments, slopeAt, heightAt };
};

export const resist = (v, slope, mass) => mass * G * (TRUCK.cr + slope / 100) + TRUCK.aero * v * v;
export const tractionMax = (v) => Math.min(TRUCK.forceMax, TRUCK.power / Math.max(v, 1));

/** Seeded noise, so every run of a level sees the same sensor noise. */
const rng = (seed) => () => {
	seed = (seed * 1664525 + 1013904223) % 4294967296;
	return seed / 4294967296;
};

/**
 * Controller settings (all optional):
 * mode: 'fixed' | 'onoff' | 'pi' | 'plan' | 'manual'
 * pedal: fixed pedal in % of the engine (mode fixed)
 * band: on/off switching band, km/h
 * kp: kN per km/h; ki: kN per km/h per s; antiWindup: boolean
 * filter: s, time constant of the speed filter
 * ff: feedforward of the slope from the map; ffMass: mass the feedforward assumes, t
 * plan: array of target speeds (km/h) per 10 m, used by mode 'plan'
 * manual: pedal in % from -100 (full brake) to 100 (full power), read at every step (mode manual)
 */
export function makeSim(opts) {
	const { route, ctrl = {}, mass = TRUCK.mass, target = 80, noise = 0, dt = 0.05, start } = opts;
	const v0 = ms(start ?? target);
	const vt = ms(target);
	const flatHold = resist(vt, 0, mass);
	const s = { v: v0, x: 0, t: 0, force: resist(v0, route.slopeAt(0), mass), integ: 0, filt: v0, on: false, k: 0 };
	if (ctrl.mode === 'pi' || ctrl.mode === 'plan') s.integ = s.force - (ctrl.ff ? resist(v0, route.slopeAt(0), (ctrl.ffMass ?? mass / 1000) * 1000) : flatHold);
	const meas = Array(Math.round(TRUCK.delay / dt) + 1).fill(v0);
	const rand = rng(7);
	const out = { t: [], x: [], v: [], pedal: [], ff: [], ref: [], time: 0, energy: 0, brake: 0, activity: 0, switches: 0 };
	let energy = 0, brakeEnergy = 0, activity = 0, lastOn = null, sw = 0, cmdPrev = s.force;
	const maxT = (route.length * 1000) / ms(30) + 60;
	const done = () => s.x >= route.length * 1000 || s.t >= maxT;
	const step = () => {
		const km = s.x / 1000;
		const slope = route.slopeAt(km);
		const n = noise ? (rand() + rand() + rand() - 1.5) * 2 * ms(noise) : 0;
		meas.push(s.v + n);
		const vm = meas.shift();
		s.filt = ctrl.filter ? s.filt + (dt / (ctrl.filter + dt)) * (vm - s.filt) : vm;
		let ref = vt;
		if (ctrl.mode === 'plan' && ctrl.plan) ref = ms(ctrl.plan[Math.min(ctrl.plan.length - 1, Math.round(s.x / 10))]);
		const e = kmh(ref - s.filt);
		const fmax = tractionMax(s.v);
		let cmd;
		if (ctrl.mode === 'fixed') cmd = ((ctrl.pedal ?? 30) / 100) * fmax;
		else if (ctrl.mode === 'onoff') {
			const b = ctrl.band ?? 1;
			if (e > b / 2) s.on = true;
			else if (e < -b / 2) s.on = false;
			cmd = s.on ? fmax : 0;
			if (lastOn !== null && s.on !== lastOn) sw += 1;
			lastOn = s.on;
		} else if (ctrl.mode === 'manual') {
			const p = ctrl.manual();
			cmd = p >= 0 ? (p / 100) * fmax : (p / 100) * TRUCK.brakeMax;
		} else {
			const ff = ctrl.ff ? resist(ref, slope, (ctrl.ffMass ?? mass / 1000) * 1000) : flatHold;
			s.ff = ff;
			const p = (ctrl.kp ?? 0) * 1000 * e;
			const ii = s.integ + (ctrl.ki ?? 0) * 1000 * e * dt;
			const raw = ff + p + ii;
			const sat = Math.min(fmax, Math.max(-TRUCK.brakeMax, raw));
			if (!ctrl.antiWindup || raw === sat || Math.sign(e) !== Math.sign(raw - sat)) s.integ = ii;
			cmd = raw;
		}
		cmd = Math.min(fmax, Math.max(-TRUCK.brakeMax, cmd));
		activity += Math.abs(cmd - cmdPrev) / 1000;
		cmdPrev = cmd;
		s.force += (dt / TRUCK.lag) * (cmd - s.force);
		const f = Math.min(fmax, Math.max(-TRUCK.brakeMax, s.force));
		const acc = (f - resist(s.v, slope, mass)) / mass;
		if (f > 0) energy += f * s.v * dt;
		else brakeEnergy -= f * s.v * dt;
		s.v = Math.max(ms(5), s.v + acc * dt);
		s.x += s.v * dt;
		s.t += dt;
		if (s.k % 4 === 0) {
			out.t.push(s.t); out.x.push(s.x / 1000); out.v.push(kmh(s.v)); out.ref.push(kmh(ref));
			out.pedal.push(f >= 0 ? (100 * f) / tractionMax(s.v) : (100 * f) / TRUCK.brakeMax);
			// Share of the pedal that the map feedforward asks for, on the same scale as the pedal.
			if (ctrl.ff) out.ff.push(s.ff >= 0 ? (100 * s.ff) / tractionMax(s.v) : (100 * s.ff) / TRUCK.brakeMax);
		}
		s.k += 1;
		out.time = s.t;
		out.energy = energy / 3.6e6; // kWh at the wheels
		out.brake = brakeEnergy / 3.6e6;
		out.activity = activity / Math.max(s.t / 60, 1e-6); // kN of pedal change per minute
		out.switches = (sw / Math.max(s.t, 1)) * 60;
	};
	return { step, done, out, state: s };
}

export function simulate(opts) {
	const sim = makeSim(opts);
	while (!sim.done()) sim.step();
	return sim.out;
}

/** Pedal reversals larger than 2 points: a simple count of how much the controller shakes the truck. */
export function shake(run) {
	let count = 0, dir = 0, last = run.pedal[0];
	for (const p of run.pedal) {
		const d = p - last;
		if (Math.abs(d) < 2) continue;
		const sg = Math.sign(d);
		if (dir && sg !== dir) count += 1;
		dir = sg;
		last = p;
	}
	return count;
}
/** Scores the part of a run between two distances: worst drop below and peak above the reference, and the rms error. */
export function measure(run, fromKm = 0, toKm = Infinity) {
	let low = 0, high = 0, sq = 0, n = 0;
	for (let i = 0; i < run.x.length; i += 1) {
		if (run.x[i] < fromKm || run.x[i] > toKm) continue;
		const d = run.v[i] - run.ref[i];
		low = Math.max(low, -d);
		high = Math.max(high, d);
		sq += d * d;
		n += 1;
	}
	return { low, high, rms: Math.sqrt(sq / Math.max(n, 1)) };
}

/**
 * Speed plan by dynamic programming over the road: minimum energy at the wheels plus a price on time,
 * with the speed kept inside target ± band. The truck starts and ends at the target speed.
 */
export function plan(route, { target = 80, band = 5, timePrice = 0.8, mass = TRUCK.mass } = {}) {
	const ds = 10;
	const steps = Math.round((route.length * 1000) / ds);
	const dv = 0.5;
	const speeds = [];
	for (let s = target - band; s <= target + band + 1e-9; s += dv) speeds.push(s);
	const S = speeds.length;
	const vt = ms(target);
	const lambda = timePrice * 2 * TRUCK.aero * vt * vt * vt;
	let cost = speeds.map((s) => (Math.abs(s - target) < 1e-9 ? 0 : Infinity));
	const from = [];
	for (let i = 0; i < steps; i += 1) {
		const slope = route.slopeAt(((i + 0.5) * ds) / 1000);
		const next = Array(S).fill(Infinity);
		const arg = Array(S).fill(-1);
		for (let a = 0; a < S; a += 1) {
			if (!Number.isFinite(cost[a])) continue;
			const va = ms(speeds[a]);
			for (let b = Math.max(0, a - 6); b < Math.min(S, a + 7); b += 1) {
				const vb = ms(speeds[b]);
				const vm = (va + vb) / 2;
				const f = (mass * (vb * vb - va * va)) / (2 * ds) + resist(vm, slope, mass);
				if (f > tractionMax(vm) || f < -TRUCK.brakeMax) continue;
				const c = cost[a] + Math.max(f, 0) * ds + lambda * (ds / vm);
				if (c < next[b]) { next[b] = c; arg[b] = a; }
			}
		}
		from.push(arg);
		cost = next;
	}
	let b = speeds.findIndex((s) => Math.abs(s - target) < 1e-9);
	if (!Number.isFinite(cost[b])) b = cost.indexOf(Math.min(...cost));
	const path = [speeds[b]];
	for (let i = steps - 1; i >= 0; i -= 1) {
		b = from[i][b];
		path.push(speeds[b]);
	}
	return path.reverse();
}
