---
title: Stochastic Set-Point Optimization for Efficiency
subtitle: Optimizing combustion when every cycle is slightly different
description: How stochastic combustion models and Monte Carlo simulation can optimize combustion-control set-points while balancing efficiency, pressure-rise constraints, and pilot misfire risk.
publishDate: 2026-06-25
updatedDate: 2026-07-07
readingTime: 12 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion efficiency
  - Stochastic modeling
  - Monte Carlo simulation
  - Set-point optimization
  - Constraint handling
  - Combustion control
featured: true
draft: true
heroImage:
  src: /images/blog/stochastic-set-point-optimization/thesis-optimal-setpoint.svg
  alt: Thesis plot of indicated efficiency and CA50 set-point references under operating constraints
---

<section class="article-callout" aria-labelledby="key-ideas-title">
	<h2 id="key-ideas-title">Key ideas</h2>
	<ul>
		<li>Combustion set-points should be optimized over distributions, not only nominal cycles.</li>
		<li>Monte Carlo simulation makes efficiency and constraint risk visible together.</li>
		<li>Reduced cycle-to-cycle variation allows operation closer to efficient combustion phasing.</li>
		<li>Pressure-rise, peak-pressure, exhaust-temperature, and misfire constraints shape the feasible region.</li>
		<li>The best set-point is the highest usable efficiency under acceptable risk, not the highest theoretical efficiency.</li>
	</ul>
</section>

Efficiency optimization in combustion engines is rarely a matter of finding one perfect calibration point. The engine does not repeat the same combustion event exactly from cycle to cycle. Fuel delivery varies, ignition delay changes, pilot combustion may be weak or missing, and the same nominal control setting can produce different outcomes across operating conditions. A set-point that looks optimal in an average sense may be too aggressive once that dispersion is considered.

This article is part of a series on my PhD research into in-cycle closed-loop combustion control; the motivation and full context are in [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/). Here I cover the part of the work that converts the controller's reduced cycle-to-cycle dispersion into efficiency: stochastic set-point optimization. The method uses stochastic combustion models and Monte Carlo simulation to select combustion-control set-points that improve indicated efficiency while respecting operational constraints and misfire risk. The efficiency-optimization results were later consolidated in a peer-reviewed article in [Control Engineering Practice](https://doi.org/10.1016/j.conengprac.2022.105097).

## Stochastic optimization workflow

The optimization process connected candidate combustion-control targets, stochastic simulation, expected efficiency, and constraint risk.

<ol class="process-list">
	<li>Define candidate combustion set-points.</li>
	<li>Generate stochastic combustion outcomes with Monte Carlo simulation.</li>
	<li>Evaluate expected indicated efficiency.</li>
	<li>Estimate probability of constraint violations and misfire risk.</li>
	<li>Select the highest-efficiency feasible set-point.</li>
</ol>

<figure class="article-figure">
	<img src="/images/blog/stochastic-set-point-optimization/thesis-controller-comparison.svg" alt="Simulation comparison of open-loop control, main SOC control, and CA50 closed-loop control" loading="lazy" />
	<figcaption>Monte Carlo simulation turns cycle-to-cycle combustion variability into distributions that can be used for calibration decisions.</figcaption>
</figure>

## Why set-point optimization is a stochastic problem

Combustion-control set-points are often expressed in terms of phasing targets, such as the center of combustion or CA50. Moving the combustion phasing can improve indicated efficiency because it changes how effectively the released heat is converted into work.

But the most efficient phasing is not always the safest or most robust phasing. If combustion is advanced too far, peak pressure and pressure-rise rate can increase, which matters for hardware durability, combustion noise, and safe engine operation. If combustion is too delayed, efficiency drops and exhaust temperature rises. If pilot combustion becomes unreliable, the main combustion may shift and the apparent optimum can change.

The key difficulty is that these outcomes are not deterministic. Even at the same operating condition and set-point, cycle-to-cycle variation produces a distribution of combustion outcomes, so a constraint should be treated as a probability of violation, not a single predicted value. Instead of asking, "Which set-point gives the highest efficiency for the nominal cycle?", the stochastic optimizer asks, "Which set-point gives the best expected efficiency while keeping the probability of constraint violations acceptable?"

## From in-cycle control to efficiency optimization

The thesis first developed in-cycle closed-loop combustion control methods that used pressure-based virtual sensing and predictive control to reduce cyclic variation. That reduction then became the input to the optimization.

In open-loop operation, the engine must often be calibrated conservatively. If combustion phasing or pressure-rise rate varies significantly from cycle to cycle, the nominal set-point must stay farther away from constraints to avoid violations in the worst cycles. In-cycle control changes this situation.

This is the link between control and optimization:

1. virtual sensors improve combustion-state observability,
2. predictive in-cycle control reduces cycle-to-cycle dispersion,
3. lower dispersion reduces the safety margin required around constraints,
4. the set-point can move closer to the efficiency optimum,
5. indicated efficiency improves while constraints remain respected.

In this sense, the efficiency benefit does not come only from changing the target. It comes from changing the uncertainty around the target. That connection builds on the same control architecture discussed in [predictive in-cycle combustion control](/writing/predictive-in-cycle-combustion-control/) and the estimator layer described in [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/).

<figure class="article-figure">
	<img src="/images/blog/stochastic-set-point-optimization/thesis-optimal-reference.svg" alt="Maximum indicated efficiency results for exhaust temperature, maximum pressure, and pressure-rise constraints" loading="lazy" />
	<figcaption>Reducing dispersion can make a more efficient set-point feasible without increasing the accepted probability of constraint violation.</figcaption>
</figure>

## The role of Monte Carlo simulation

The thesis used Monte Carlo simulation to evaluate combustion set-points under uncertainty. Rather than simulating only one deterministic combustion response, the method generated many possible cycle outcomes based on stochastic models of combustion behavior.

Each simulated cycle represented a possible realization of the engine at the same operating condition. Across many realizations, the optimizer could estimate distributions of efficiency, combustion phasing, pressure-rise rate, exhaust temperature, and misfire-related behavior. A candidate set-point could then be judged statistically: a slightly higher average efficiency is unacceptable if it frequently produces excessive pressure rise, while a slightly lower nominal efficiency may be preferable if it is much more robust.

Monte Carlo simulation therefore acted as a bridge between combustion variability and calibration decisions. This heavy computation happens offline. The controller it calibrates still has to execute inside microsecond timing budgets, which is the subject of [real-time combustion control implementation](/writing/real-time-combustion-control-implementation/).

## Efficiency, constraints, and trade-offs

The performance objective was indicated efficiency. The constraints included maximum cylinder pressure, maximum pressure-rise rate, exhaust-temperature limits, and operating constraints associated with emissions, combustion noise, and hardware protection. These constraints define the feasible region of engine operation.

A deterministic optimizer might check whether the predicted mean value of each constraint remains below its limit. The stochastic optimizer instead considers the spread of the predicted outcomes, so a candidate set-point can be rejected even if its mean value is acceptable, if the probability of violating a constraint is too high. This is especially relevant for pressure-rise rate: advancing combustion may increase efficiency, but it also increases the probability of high pressure-rise events.

The optimizer made these trade-offs explicit. Engine calibration is fundamentally a constrained optimization problem, and the best set-point is the one with the highest usable efficiency under the required reliability, safety, emissions, noise, and hardware limits. Once cycle-to-cycle dispersion and misfire probability are considered, the optimum can shift away from the nominal deterministic one. Because the constraints are expressed probabilistically, the framework also stays useful when fuel properties, operating conditions, or injection-system behavior shift the underlying distribution.

<figure class="article-figure">
	<img src="/images/blog/stochastic-set-point-optimization/thesis-optimal-setpoint.svg" alt="Indicated efficiency and CA50 set-point references for open-loop and closed-loop operation under four constraints" loading="lazy" />
	<figcaption>Constraint-aware optimization treats pressure-rise, peak pressure, exhaust temperature, and misfire probability as boundaries on usable efficiency.</figcaption>
</figure>

## Misfire risk as part of optimization

Pilot misfire is another important source of stochastic behavior. In pilot-main combustion, a successful pilot event can shorten main ignition delay, influence heat-release shape, and stabilize combustion phasing. If the pilot event misfires, the main combustion can shift, load can deviate, and the efficiency outcome can change.

A calibration that looks efficient under the assumption of normal pilot combustion may perform differently once the probability of pilot misfire is included. The stochastic optimization therefore treated misfire probability as part of the combustion outcome distribution, which allowed it to account for the risk of abnormal pilot-combustion events, not only average behavior. The related diagnostic decision problem is discussed in [stochastic fault detection and diagnostic decision logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/).

<figure class="article-figure">
	<img src="/images/blog/stochastic-set-point-optimization/thesis-optimal-pilot-setpoint.svg" alt="Maximum indicated efficiency and pilot injection set-point under pressure-rise-rate constraints" loading="lazy" />
	<figcaption>The best usable set-point can sit below the highest theoretical efficiency if the risk of pressure-rise violation becomes unacceptable.</figcaption>
</figure>

## Optimization approach comparison

The thesis investigated two related approaches to efficiency optimization.

The first was direct in-cycle efficiency optimization, in which the in-cycle controller directly adjusted combustion behavior to increase indicated efficiency. The results showed that the method could compensate much of the impact of pilot-combustion variation, although its effectiveness was limited by the linear approximations used in the controller.

The second was indirect set-point optimization. Instead of directly optimizing the control action within each cycle, this approach optimized the combustion set-point using stochastic simulation, taking the reduced dispersion achieved by in-cycle control as an input. This indirect approach was especially powerful because it connected closed-loop control performance with calibration strategy: if the controller reduced dispersion, the optimizer could safely select a more efficient set-point.

<div class="comparison-table" role="region" aria-labelledby="optimization-comparison-title" tabindex="0">
	<table>
		<caption id="optimization-comparison-title">Comparison of combustion set-point optimization approaches</caption>
		<thead>
			<tr>
				<th scope="col">Approach</th>
				<th scope="col">What it optimizes</th>
				<th scope="col">Main advantage</th>
				<th scope="col">Main limitation</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Nominal deterministic set-point</th>
				<td>Mean expected combustion behavior</td>
				<td>Simple and calibration-friendly</td>
				<td>Can ignore cycle-to-cycle risk</td>
			</tr>
			<tr>
				<th scope="row">Direct in-cycle efficiency optimization</th>
				<td>Current-cycle control action</td>
				<td>Can react to observed combustion variation</td>
				<td>Sensitive to model linearization</td>
			</tr>
			<tr>
				<th scope="row">Indirect stochastic set-point optimization</th>
				<td>Closed-loop set-point under uncertainty</td>
				<td>Balances efficiency and constraint probability</td>
				<td>Requires stochastic models and simulation</td>
			</tr>
			<tr>
				<th scope="row">Misfire-aware optimization</th>
				<td>Set-point including pilot misfire risk</td>
				<td>Avoids over-optimistic calibration</td>
				<td>Requires reliable misfire probability model</td>
			</tr>
		</tbody>
	</table>
</div>

The measured gains compare conventional open-loop calibration against in-cycle closed-loop operation with the optimized set-points, under the evaluated constraints:

<div class="comparison-table" role="region" aria-labelledby="efficiency-gains-title" tabindex="0">
	<table>
		<caption id="efficiency-gains-title">Indicated efficiency: open-loop calibration vs in-cycle closed-loop operation</caption>
		<thead>
			<tr>
				<th scope="col">Optimization result</th>
				<th scope="col">Open-loop calibration</th>
				<th scope="col">In-cycle closed-loop operation</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Direct in-cycle efficiency optimization</th>
				<td>Baseline</td>
				<td>+0.42 pp indicated efficiency</td>
			</tr>
			<tr>
				<th scope="row">Indirect set-point optimization, medium load</th>
				<td>Baseline</td>
				<td>About +0.6 pp indicated efficiency</td>
			</tr>
			<tr>
				<th scope="row">Indirect set-point optimization, low load</th>
				<td>Baseline</td>
				<td>Up to +1.8 pp indicated efficiency</td>
			</tr>
			<tr>
				<th scope="row">Misfire-aware modeling</th>
				<td>Misfire risk ignored</td>
				<td>About +0.3 pp additional</td>
			</tr>
		</tbody>
	</table>
</div>

<figure class="article-figure">
	<img src="/images/blog/stochastic-set-point-optimization/thesis-optimal-loads-comparison.svg" alt="Indicated efficiency increase from in-cycle closed-loop operation across load and constraint cases" loading="lazy" />
	<figcaption>The useful calibration question is not only where the mean lands, but how much of the distribution approaches operational limits.</figcaption>
</figure>

## Why low-load operation benefits most

The largest efficiency improvements were observed at low loads, and that is consistent with the combustion-control problem. At low load, pilot combustion is more sensitive to operating-condition variation, fuel-injection uncertainty, and misfire risk. The combustion signal is weaker, stochastic variation is more influential, and conservative calibration margins become larger.

When in-cycle control reduces this variation, the optimizer gains more room to move the set-point toward the efficient region. The benefit is therefore greatest where open-loop operation must be most conservative. At higher loads, combustion is more robust and the engine may already operate close to the feasible efficiency region, so the incremental benefit is smaller. The value of stochastic optimization depends on how much uncertainty constrains the operating point.

## The effect of in-cycle compensation

Without in-cycle compensation, pilot-combustion variation can propagate into main combustion phasing and load, forcing larger calibration margins. With it, the thesis showed that in-cycle regulation could compensate the effect of pilot-combustion variations in about 86% of cases.

However, in-cycle control is not always available: the observability and controllability limits discussed in [predictive in-cycle combustion control](/writing/predictive-in-cycle-combustion-control/) restrict when the controller can act. The optimization therefore had to account for the cases where compensation is feasible and the cases where it is not, so that the set-point never relies on control authority that may not exist in every cycle.

## From optimization result to calibration insight

One useful outcome of stochastic set-point optimization is not only the final selected set-point, but the information it provides about why that set-point is selected. The Monte Carlo framework can show whether the optimum is limited by pressure-rise rate, peak pressure, exhaust temperature, misfire probability, or efficiency roll-off.

For example, if the optimum is constrained by pressure-rise rate, then further efficiency improvement may require reducing combustion dispersion, changing injection shaping, or modifying the pilot-main interaction. If it is constrained by misfire risk, then improving pilot stability may have more value than further optimizing nominal combustion phasing. This turns optimization into a diagnostic tool for calibration strategy: it identifies not only what set-point to use, but what physical limitation is preventing a better one.

## The takeaway

Stochastic set-point optimization is about choosing the best target when combustion outcomes are distributed, not fixed. The practical optimum is the set-point that delivers the best expected efficiency while keeping constraint violations acceptably unlikely.

That is the contribution of this part of the thesis: it showed how stochastic combustion models, Monte Carlo simulation, constraint handling, and in-cycle control performance can be combined to optimize combustion-control set-points, with measurable efficiency gains. What it took to run the underlying control at combustion speed is covered in [real-time combustion control implementation](/writing/real-time-combustion-control-implementation/).

The practical effect of the work is a shift in how calibration is done: away from nominal set-point selection and toward uncertainty-aware optimization. The engine is not calibrated only for the average cycle. It is calibrated for the distribution of cycles it will actually experience.

## Part of the series: In-Cycle Combustion Control

1. [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/) (the overview)
2. [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/)
3. [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/)
4. [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/)
5. Stochastic Set-Point Optimization for Efficiency (this article)
6. [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/)

## Source articles

This article is based on my PhD thesis and the following thesis papers:

- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Stochastic Set-Point Optimization for In-Cycle Closed-Loop Combustion Control Operation," *SAE Technical Paper* 2021-01-0531, 2021.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, ["Indicated Efficiency Optimization by In-Cycle Closed-Loop Combustion Control of Diesel Engines,"](https://doi.org/10.1016/j.conengprac.2022.105097) *Control Engineering Practice*, 122:105097, 2022. The peer-reviewed journal version of this efficiency work.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "In-Cycle Closed-Loop Combustion Control with Pilot-Main Injections for Maximum Indicated Efficiency," *IFAC-PapersOnLine*, 51(31):92-98, 2018.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, [*Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf), PhD thesis, Lund University, 2021. Open-access PDF.
- L. Leng et al., ["A review of model-based offline and online optimization control systems for combustion engines,"](https://doi.org/10.1177/14680874261416376) *International Journal of Engine Research*, 2026. A review covering this line of model-based combustion optimization work.

<section class="article-cta" aria-labelledby="optimization-cta-title">
	<h2 id="optimization-cta-title">Need help optimizing control set-points under uncertainty?</h2>
	<p>I work on combustion efficiency optimization, stochastic modeling, Monte Carlo simulation, constraint handling, model-based diagnostics, and real-time control strategy design for advanced powertrain systems.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about optimization</a></li>
		<li><a href="/research/">Explore related research</a></li>
	</ul>
</section>
