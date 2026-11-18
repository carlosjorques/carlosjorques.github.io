---
title: "Build a cruise controller yourself"
seoTitle: "Build a cruise controller: a control engineering game"
subtitle: "Hold a 40-tonne truck at 80 km/h over a hill, then become a control engineer and design its cruise controller"
description: "Can you hold a 40-tonne truck at 80 km/h over a hill? Try it, then become a control engineer and design its cruise controller: PI tuning, feedforward, MPC."
teaser: "Be a control engineer for a day: drive a truck, then design the cruise controller that beats you."
publishDate: 2026-12-01
readingTime: 15 min read, plus the levels
category: Control Algorithms & Diagnostics
tags:
  - Control engineering
  - PID control
  - Feedforward
  - Predictive control
  - Interactive
relatedProject: electric-truck-thermal-management
interactive: control-lessons
featured: false
socialImage:
  src: "/images/blog/control-engineering-in-ten-levels/social.png"
  alt: "Interactive article. Build a cruise controller yourself. A level picker with ten levels: three cleared with three stars, level 4 next and six still locked. Drive the truck yourself, then build the controller that beats you."
draft: true
---

## The game: ten levels from your own driving to predictive control

<div class="cl-game" data-cl-game><p>The game needs JavaScript. The theory below explains every level without it.</p></div>

### How a control engineer solves the levels

If you played the levels above, you probably got stuck on one, or passed one without knowing why. A control engineer would not guess the settings. **A model of the truck shows how each setting changes the response before the truck drives.**

When someone asks me what I do for a living, the answer "embedded control software" always leads to a second question about what a control engineer does. That answer is hard to give in words, because the work only becomes visible when a machine meets something it did not plan for, such as a hill, a heavier load or a noisy sensor. I built this game as my answer: you drive a truck yourself, then design the cruise controller that does it better. The same steps run through my [projects](/work/), for example the [speed control of Volvo's autonomous TA15 hauler](/work/autonomous-hauler-propulsion-control/).

The theory below follows the levels in four steps of complexity: feedback against the hill, tuning, physical limits and, finally, knowledge of the road ahead. Each level gives the numbers behind its result and a link back to the game.

## 1. Feedback reacts to a changing road (levels 1 to 3)

The first challenge is the hill itself. It pushes the truck from outside, and any rule that does not watch the speed loses against it. Levels 1 to 3 go from the driver's foot, to a computer that does not measure, to the simplest rule that does.

### Level 1: a control loop measures, compares and acts

Your job is to hold 80 km/h. The truck starts on the flat, and a 2% climb begins at 0.6 km. You drive by dragging on the pedal plot, and the game runs four times faster than real-time.

The powertrain needs about 1.5 s to build up force, and a 40-tonne truck changes speed slowly because its mass resists every change. So the effect of a push arrives late (a *delay*), and when the speed finally moves, the pedal has already been wrong for a while. The usual result is a pedal pushed too late on the climb and too much at the top.

In the words of a control engineer, you read the speed (the *measurement*), compared it with 80 km/h (the difference is the *error*) and moved the pedal (the *actuator*). The pedal changed the speed, and the speed changed your next decision. That is a *control loop*. **Control engineering designs the rule inside that loop: what to measure, how to compare it with the goal and how hard to act on the difference.** Cruise control is the running example of one of the reference textbooks of the field [1], because it contains almost every difficulty a controller meets in a machine on the road.

The other nine levels ask whether a computer can do this job better than you, and what it needs to know to do it.

[Play level 1](#play-drive)

### Level 2: an open loop loses against a disturbance

The simplest idea for a computer is not to watch the speed at all: set the pedal once and let the truck drive the whole road. About 28% of the pedal holds 80 km/h on the flat, but on the climb the truck then crawls and loses more than 40 km/h. About 80% climbs well, but runs more than 20 km/h too fast on the flat. No single position works for both, because the climb needs about three times the force of the flat (about 12 kN against 4 kN).

**A controller that has to hold a speed on a hilly road must measure the speed and act on the difference from the target (*feedback*).** With a fixed pedal, the action is decided in advance and never compared with the result (*open-loop control*). That works only whilst the world matches the plan, and the hill is a *disturbance*: a force from outside that the controller does not decide.

[Play level 2](#play-open)

### Level 3: on and off control holds the speed, but jolts

The next idea watches the speed and follows the rule of a home thermostat: full power when the truck drops below a lower switching line, no power when it rises above an upper one (*on/off control*). With the lines at 80 ± 1.5 km/h, this rule keeps the truck within ±3 km/h, the three-star band of level 1, because the heavy truck averages the pedal over time. The price is a pedal that slams between zero and full power about five times a minute. The closer the lines, the tighter the speed and the more often the pedal switches. Lines further apart switch less and let the speed wander.

For a home heater that is fine. For a truck, each switch is a jolt in the driveline and for the driver. A better rule moves the pedal in proportion to the error, which is the next level.

[Play level 3](#play-onoff)

## 2. PI tuning decides between a fast response and robustness (levels 4 to 6)

Once the controller measures the speed, the challenge becomes how hard it should act. Pushing hard corrects quickly but makes the pedal shake, whilst pushing gently leaves the truck slow. Levels 4 to 6 introduce the tuning parameters of the most common controller in industry and ask for one tuning that works on every day.

### Level 4: proportional control always leaves an error

A *proportional controller* (P) pushes harder the further the truck is from 80 km/h. The force it adds is the error times a gain, Kp, on top of the 4 kN that hold 80 km/h on the flat. Kp is the first tuning parameter. For example, a Kp of 8 adds 8 kN of force for every km/h that the truck is below the target.

On the 2% climb the truck needs about 7.9 kN more than on the flat. A proportional controller only produces extra force when there is an error, so the truck settles at the speed where the error times Kp equals those 7.9 kN. With Kp = 1 it climbs about 8 km/h below the target, and with Kp = 8 about 1 km/h below. This remaining error is the *steady-state error*.

Raising Kp shrinks the error, but because of the delay of level 1, a strong controller keeps pushing whilst the effect of its last push is still on its way. The truck overshoots, the controller pushes back just as hard, and above about Kp = 10 the pedal starts to shake. The longer the delay, the lower the gain at which this begins. Delay sets the highest gain a loop can use, and a proportional controller alone can never bring the error to zero.

[Play level 4](#play-p)

### Level 5: the integral removes the error and adds overshoot

Removing that last km/h needs a second term. The *integral term* (I) adds up the error over time and keeps pushing whilst any error is left. It works as a memory: every second below the target adds a little more push. Together with the proportional term it forms the *PI controller*. PI and PID controllers regulate most control loops in industry [1], and a short video series by MathWorks explains how to tune them [2]. Ki sets how fast the integral grows.

The integral removes the steady-state error. As long as the truck is slow, the stored push grows until the force matches the hill exactly. However, the same memory works against the controller once the hill ends. At the top of the hill the stored push is still there, and the truck overshoots before the integral unwinds. The larger Ki, the faster the error disappears and the larger the swing. With too much Ki, the speed oscillates around 80 km/h.

A Kp of about 8 with a Ki between 0.3 and 0.6 keeps the truck within ±1.5 km/h. The classic third term, the derivative (D), reacts to how fast the error changes. I left it out of the game because the speed signal of a truck is noisy, and level 8 shows what noise does to a controller.

[Play level 5](#play-pi)

### Level 6: a robust tuning trades speed for margin

A tuning is found once, but the same software drives the truck every day, and no two trips are alike: full or empty, headwind or tailwind, cold tyres or warm ones. For the game, I chose the largest of these changes, the load, and one tuning drives on a heavy day (full truck, 40 t) and on a light day (empty truck, 15 t). An empty truck accelerates 2.7 times more with the same force, so the same gain acts 2.7 times stronger.

A tuning that is sharp on the heavy day shakes the light one. The lighter the truck, the more speed each kilonewton buys, so the controller and the truck together amplify an error more strongly (a higher *loop gain*). A controller that keeps working across the whole range of conditions is *robust*. Robustness costs speed. A Kp of about 4 with a small Ki works on both days, but the full truck now drops about 2 km/h on the climb instead of 1.5.

**Engineers tune for the worst case of the range and keep a margin for what the model does not know.** The tuning game on the [home page](/) asks for the same margin. In the predictive thermal control I lead at Scania, the battery temperature model has to hold from −20 to 40 °C ambient. Over that range, it stays within ±0.6 °C of the measured temperature ([project page](/work/electric-truck-thermal-management/)).

[Play level 6](#play-robust)

## 3. Physical limits must be designed into the controller (levels 7 and 8)

An engine has a maximum force, and a sensor has noise. Neither appears in the rule of a textbook controller, and both decide whether it works in a truck. Levels 7 and 8 show what each limit does to the controller and the protection it needs.

### Level 7: anti-windup protects the integral at saturation

At 80 km/h the engine of this truck delivers about 15 kN, and a 4% climb at 40 t needs about 20 kN. No tuning can hold 80 km/h here, and the speed drops. The goal changes from holding the speed on the climb to recovering it cleanly after the top.

When the actuator is at its limit, it is *saturated*: the controller asks for more force than the engine has. The proportional term does no harm, but the integral keeps adding up the large error for the whole climb (*integrator windup*). At the top, the integral stored during the climb takes the truck more than 20 km/h above the target before it unwinds.

*Anti-windup* stops the integral whilst the actuator is saturated and the error would push it further into the limit, so the integral stores no push that the engine cannot deliver. With it, the overshoot after the top falls to about 1 km/h, for the same speed lost on the climb. Every actuator in a vehicle saturates at some point (the motor torque, the brakes, the pump of a cooling circuit), which is why **almost every controller in production software has anti-windup**.

[Play level 7](#play-windup)

### Level 8: filtering calms the noise and adds delay

So far the controller read the true speed. A wheel-speed sensor on a rough road is noisy, in the game by about ±1 km/h. The controller cannot tell the noise from a real change of speed, so it treats the noise as error and passes it, multiplied by Kp, straight to the pedal. A *low-pass filter* averages the speed over a short time window before the controller uses it, and the length of that window is the filter's *time constant*.

Without a filter, the pedal moves the equivalent of about 150 full strokes a minute whilst the truck speed hardly changes, because the controller reacts to the sensor and not to the truck. A filter with a time constant of 0.6 to 2 s brings it below 10 strokes a minute. However, filtering adds delay, and delay is what limited the gain in level 4: with a filter of 3 s, the controller reacts so late that the truck leaves the ±3 km/h band.

The filter is one more trade-off between a calm actuator and a fast response. A cleaner measurement avoids that trade-off. Estimating a variable from several noisy measurements and a model (*virtual sensing*) was the core of my PhD, applied to combustion inside an engine ([project page](/work/heavy-duty-engine-diagnostics-control-research/)).

[Play level 8](#play-noise)

## 4. Knowing the road lets the controller plan ahead (levels 9 and 10)

Every controller so far reacts to an error after it appears. The last challenge is to act before it. Levels 9 and 10 give the controller a model of the truck and a map of the road, first to push before the hill and then to plan the speed for the least energy.

### Level 9: feedforward acts before the error appears

A good driver sees the hill and pushes before the truck slows down. A digital map gives the controller the same view. With the slope known, the controller can compute the force that slope needs and add it to the pedal before any error appears. This is *feedforward*. The PI controller stays on and corrects whatever the calculation missed. But the force a slope needs depends on the mass of the truck, and the controller has to assume one.

On the rolling road of the game, feedback alone stays within ±3.1 km/h. With feedforward and the correct mass of 40 t, the truck stays within ±1 km/h, with the same PI tuning. With an assumed mass of 20 t, feedforward still helps, but only about half as much, and feedback has to correct the rest.

Feedforward handles the part of the disturbance that the model predicts, and feedback corrects the rest. The quality of feedforward depends on the model, here the mass. A production truck estimates its mass whilst driving, from the force it applies and the acceleration it gets.

[Play level 9](#play-ff)

### Level 10: predictive control plans the speed for less energy

Holding exactly 80 km/h wastes energy: the truck pushes hard on every climb and brakes on every descent, and braked energy is lost. A driver who sees the hill coming would let the speed drop a little before the top and let gravity bring it back on the way down. In the last level, the computer plans the speed over the whole road for the least energy, inside a band around 80 km/h that you choose. Its energy is then compared with that of the constant 80 km/h of level 9.

With a band of ±1 km/h, the planned speed saves about 1.4% of the energy at the wheels. With ±3 km/h, it saves about 3.1% and arrives less than 1 s later on a trip of four and a half minutes. Wider bands save a little more, at the cost of more speed variation and more travel time. The saving comes mostly from braking less on the 3% descent.

I computed this plan once for the whole road by *dynamic programming*, which compares every reachable speed at every 10 m. A vehicle does the same over a shorter stretch of road ahead (the *horizon*) and repeats it every few seconds as new information arrives (*model predictive control*, MPC). **The band you chose is exactly what an MPC engineer tunes: how much the speed may move in exchange for energy.** Predictive cruise control in modern trucks applies this idea with the route map. In my current work at Scania, the same principle decides when to heat and cool the battery of an electric truck: in truck tests, the predictive control used 2–4% less energy than the production control. [Part 2 of the series on electric trucks](/writing/control-software-electric-trucks-part-2-engineering/) explains how, and the [project page](/work/electric-truck-thermal-management/) summarises the work.

[Play level 10](#play-plan)

## What the game teaches about control engineering

The four steps follow the order in which a control engineer thinks about a system: measure first, then tune, then respect the physical limits, and finally add knowledge. On the same road and the same truck, the controller grew from a fixed pedal to a planner that saves about 3% of the energy. Steps 2 and 3 are the same for a PID loop in a motor drive or a process plant.

A production system adds what the game leaves out. The truck in the game has one pedal, one measurement and a model that is known exactly, whilst a production system rarely has any of the three. In the [thermal management of an electric truck](/writing/series/control-software-electric-trucks/), the same thinking meets five more challenges:

- **Actuators that interact:** pumps, valves, fans, a compressor and heaters share several coolant circuits, and each of them moves more than one temperature (*multivariable control*, with *control allocation* to share the work between actuators).
- **Temperatures that are not measured:** the temperature inside a battery cell is estimated from a model and the sensors that exist (*state estimation*, with the Kalman filter as its best-known method).
- **Models that have to be found and kept up to date:** the model is fitted to test data (*system identification*), and it drifts as the truck and its battery age (*adaptive control*).
- **Faults:** a sensor fails or a pump stops, and the software has to detect it and keep the truck safe (*diagnostics* and *fault-tolerant control*, under the functional-safety standard ISO 26262).
- **A small computer with deadlines:** the controller runs in discrete time steps on a control unit shared with other functions, and it is tested in simulation (MIL and SIL), on test rigs with the real control unit (HIL) and in trucks.

Each of these challenges adds models and calibrations that have to be tested and maintained for the life of the truck. **Deciding which of them a product needs, and proving that the result works on every truck and every road, is the control work I lead.**

## The model behind the game: a truck on a slope

I model the truck as a point mass on a slope. Its speed $v$ follows from the force at the wheels $F$ minus the rolling resistance, the slope and the air drag:

$$
m\,\frac{dv}{dt} = F - m\,g\,(C_r + s) - k\,v^2
$$

with a mass $m$ of 40 t (15 t on the light day of level 6), $g$ = 9.81 m/s², a rolling coefficient $C_r$ of 0.006, the slope $s$ as a fraction, and an air drag coefficient $k$ of 3.3 N/(m/s)². The force follows the command with a first-order lag of 1.5 s and is limited to $\min(30\ \text{kN},\ 330\ \text{kW}/v)$ for traction and 40 kN for braking. The speed reaches the controller 0.5 s late, with ±1 km/h of noise in level 8. The equation is integrated every 0.05 s.

The PI controller of levels 4 to 9 commands

$$
F_c = F_0 + K_p\,e + K_i \int e\,dt, \qquad e = v_{\text{ref}} - v_{\text{measured}}
$$

where $F_0$ is the force that holds 80 km/h on the flat, or the map feedforward $m_{\text{est}}\,g\,(C_r + s) + k\,v_{\text{ref}}^2$ in levels 9 and 10. Anti-windup stops the integration whilst the command is beyond the limit and the error points further into it. The filter of level 8 is a first-order low-pass filter. The plan of level 10 is a dynamic program over steps of 10 m and a speed grid of 0.5 km/h, minimising the positive work at the wheels plus a constant price per second of travel.

I left out gears, engine efficiency maps, regeneration and the driver, so the numbers illustrate the mechanisms and are not those of a specific truck. The source code runs in the browser and is part of this site. I based the format on the *explorable explanations*, texts in which the reader learns by changing a model [4, 5], and browser games in which the reader writes the controller [3].

## References

1. K. J. Åström and R. M. Murray, *Feedback Systems: An Introduction for Scientists and Engineers*, 2nd edition, Princeton University Press, 2021. https://fbswiki.org/
2. B. Douglas, *Understanding PID Control*, MATLAB Tech Talks, MathWorks. https://www.mathworks.com/videos/series/understanding-pid-control.html
3. J. Mačiulis (janismac), *Control Challenges*, browser games for writing controllers. https://janismac.github.io/ControlChallenges/
4. B. Victor, *Explorable Explanations*, 2011. https://worrydream.com/ExplorableExplanations/
5. N. Case, *How to make explorable explanations*. https://blog.ncase.me/explorable-explanations/
