---
title: Stochastic Set-Point Optimization for Efficiency
subtitle: Optimizing combustion when every cycle is slightly different
description: How stochastic combustion models and Monte Carlo simulation can optimize combustion-control set-points while balancing efficiency, pressure-rise constraints, and pilot misfire risk.
publishDate: 2026-06-25
readingTime: 19 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion efficiency
  - Stochastic modeling
  - Monte Carlo simulation
  - Set-point optimization
  - Constraint handling
  - Combustion control
featured: true
draft: false
heroImage:
  src: /images/blog/stochastic-set-point-optimization/hero-efficiency-optimization.svg
  alt: Combustion efficiency optimization visualization with stochastic distributions and set-point surface
---

<!-- TODO: Replace placeholder hero image with a custom stochastic optimization illustration or thesis-derived figure if reuse is permitted. -->

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

Efficiency optimization in combustion engines is rarely a matter of finding one perfect calibration point. The engine does not repeat the same combustion event exactly from cycle to cycle. Fuel delivery varies, ignition delay changes, pilot combustion may be weak or missing, pressure-rise constraints may be approached unpredictably, and the same nominal control setting can produce different outcomes across operating conditions.

That variability matters. A combustion set-point that looks optimal in an average sense may be too aggressive once stochastic dispersion is considered. It may improve efficiency in many cycles but increase the probability of excessive pressure rise, unacceptable noise, high peak pressure, or pilot-misfire-related combustion instability.

My [PhD thesis](/research/), *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, investigated this problem in the context of pilot-main diesel combustion. One part of the work focused on stochastic set-point optimization for efficiency: using stochastic combustion models and Monte Carlo simulation to select combustion-control set-points that improve indicated efficiency while respecting operational constraints and misfire risk.

The goal was not simply to maximize efficiency at a nominal operating point. The goal was to optimize the set-point while accounting for the fact that combustion is uncertain.

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
	<!-- TODO: Replace placeholder image with a custom Monte Carlo optimization workflow diagram or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-set-point-optimization/monte-carlo-workflow.svg" alt="Workflow diagram for stochastic set-point optimization using Monte Carlo simulation" loading="lazy" />
	<figcaption>Monte Carlo simulation turns cycle-to-cycle combustion variability into distributions that can be used for calibration decisions.</figcaption>
</figure>

## Why set-point optimization is a stochastic problem

Combustion-control set-points are often expressed in terms of phasing targets, such as the center of combustion or CA50. Moving the combustion phasing can improve indicated efficiency because it changes how effectively the released heat is converted into work.

But the most efficient phasing is not always the safest or most robust phasing.

If combustion is advanced too far, peak pressure and pressure-rise rate can increase. These constraints are important for hardware durability, combustion noise, and safe engine operation. If combustion is too delayed, efficiency may decrease and exhaust temperature can increase. If pilot combustion becomes unreliable, the main combustion may shift and the apparent optimum can change.

The key difficulty is that these outcomes are not deterministic. Even at the same operating condition and set-point, cycle-to-cycle variation produces a distribution of combustion outcomes. A constraint should therefore not be treated only as a single predicted value. It should be treated as a probability of violation.

This is where stochastic optimization becomes useful. Instead of asking, "Which set-point gives the highest efficiency for the nominal cycle?", the optimizer asks, "Which set-point gives the best expected efficiency while keeping the probability of constraint violations acceptable?"

## From in-cycle control to efficiency optimization

The thesis first developed in-cycle closed-loop combustion control methods that used pressure-based virtual sensing and predictive control to reduce cyclic variation. This reduction in variation then became important for optimization.

In open-loop operation, the engine must often be calibrated conservatively. If combustion phasing or pressure-rise rate varies significantly from cycle to cycle, the nominal set-point must stay farther away from constraints to avoid violations in the worst cycles.

In-cycle control changes this situation. By reducing combustion dispersion, it becomes possible to operate closer to the efficient region without increasing the probability of violating constraints.

This is the link between control and optimization:

1. virtual sensors improve combustion-state observability,
2. predictive in-cycle control reduces cycle-to-cycle dispersion,
3. lower dispersion reduces the safety margin required around constraints,
4. the set-point can move closer to the efficiency optimum,
5. indicated efficiency improves while constraints remain respected.

In this sense, the efficiency benefit does not come only from changing the target. It comes from changing the uncertainty around the target. That connection builds on the same control architecture discussed in [predictive in-cycle combustion control](/writing/predictive-in-cycle-combustion-control/) and the estimator layer described in [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/).

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a custom before/after set-point illustration or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-set-point-optimization/set-point-shift.svg" alt="Comparison of conservative open-loop set-point and optimized stochastic set-point" loading="lazy" />
	<figcaption>Reducing dispersion can make a more efficient set-point feasible without increasing the accepted probability of constraint violation.</figcaption>
</figure>

## The role of Monte Carlo simulation

The thesis used Monte Carlo simulation to evaluate combustion set-points under uncertainty. Rather than simulating only one deterministic combustion response, the method generated many possible cycle outcomes based on stochastic models of combustion behavior.

Each simulated cycle represented a possible realization of the engine at the same operating condition. Across many realizations, the optimizer could estimate distributions of efficiency, combustion phasing, pressure-rise rate, exhaust temperature, and misfire-related behavior.

This made it possible to evaluate candidate set-points statistically. A set-point could be judged not only by its mean indicated efficiency, but also by the probability that it would violate constraints.

That distinction is essential. A set-point with slightly higher average efficiency may be unacceptable if it frequently produces excessive pressure rise or enters a region where pilot misfire becomes likely. Conversely, a set-point with slightly lower nominal efficiency may be preferable if it is much more robust.

Monte Carlo simulation therefore acted as a bridge between combustion variability and calibration decisions.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a custom combustion-outcome distribution plot or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-set-point-optimization/combustion-outcome-distribution.svg" alt="Distribution of combustion outcomes around an optimized set-point" loading="lazy" />
	<figcaption>The useful calibration question is not only where the mean lands, but how much of the distribution approaches operational limits.</figcaption>
</figure>

## Modeling efficiency and constraints

The stochastic optimization framework considered both performance and operational constraints.

The performance objective was indicated efficiency. The optimizer searched for set-points that improved the conversion of released heat into indicated work. In the thesis, this was connected to combustion phasing and the effect of in-cycle control on reducing dispersion.

The constraints included maximum cylinder pressure, maximum pressure-rise rate, exhaust-temperature limits, and operating constraints associated with emissions, combustion noise, and hardware protection. These constraints define the feasible region of engine operation.

A deterministic optimizer might check whether the predicted mean value of each constraint remains below its limit. The stochastic optimizer instead considers the spread of the predicted outcomes. This means a candidate set-point can be rejected even if its mean value is acceptable, if the probability of violating a constraint is too high.

This is especially relevant for pressure-rise rate. A set-point that advances combustion may increase efficiency, but it can also increase the probability of high pressure-rise events. The optimization must therefore evaluate the trade-off between efficiency gain and pressure-rise risk.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a custom efficiency-risk trade-off plot or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-set-point-optimization/efficiency-risk-tradeoff.svg" alt="Trade-off plot between indicated efficiency and pressure-rise constraint violation probability" loading="lazy" />
	<figcaption>The best usable set-point can sit below the highest theoretical efficiency if the risk of pressure-rise violation becomes unacceptable.</figcaption>
</figure>

## Misfire risk as part of optimization

Pilot misfire is another important source of stochastic behavior.

In pilot-main combustion, the pilot injection affects the main combustion event. A successful pilot event can shorten main ignition delay, influence heat-release shape, and stabilize combustion phasing. If the pilot event misfires, the main combustion can shift, load can deviate, and the efficiency outcome can change.

The thesis showed that pilot misfire risk should not be ignored in set-point optimization. A calibration that looks efficient under the assumption of normal pilot combustion may perform differently once the probability of pilot misfire is included.

The stochastic optimization therefore considered misfire probability as part of the combustion outcome distribution. This allowed the optimizer to select set-points that accounted not only for average combustion behavior, but also for the risk of abnormal pilot-combustion events. The related diagnostic decision problem is discussed in [stochastic fault detection and diagnostic decision logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/).

The benefit was measurable. Considering pilot misfire risk in the optimization added about +0.3 percentage points of indicated efficiency compared with an optimization that ignored this effect.

## Direct and indirect efficiency optimization

The thesis investigated two related approaches to efficiency optimization.

The first was direct in-cycle efficiency optimization. In this approach, the in-cycle controller directly adjusted combustion behavior to increase indicated efficiency. Experimentally, this method increased indicated efficiency by +0.42 percentage points. The results also showed that the method could compensate much of the impact of pilot-combustion variation, although its effectiveness was limited by the linear approximations used in the controller.

The second was indirect set-point optimization. Instead of directly optimizing the control action within each cycle, this approach optimized the combustion set-point using stochastic simulation. The method used the reduced dispersion achieved by in-cycle control as an input to the optimization problem.

This indirect approach was especially powerful because it connected closed-loop control performance with calibration strategy. If the controller reduced dispersion, the optimizer could safely select a more efficient set-point. The improved set-point then translated into higher indicated efficiency during controlled operation.

The thesis reported that this indirect optimization increased indicated efficiency by about +0.6 percentage points at medium loads and up to +1.8 percentage points at low loads, under the evaluated constraints.

<section class="metric-grid" aria-label="Selected quantitative results from stochastic set-point optimization research">
	<div class="metric-card">
		<strong>+0.42 pp</strong>
		<span>Direct in-cycle indicated efficiency gain</span>
	</div>
	<div class="metric-card">
		<strong>+0.6 pp</strong>
		<span>Indirect optimization at medium load</span>
	</div>
	<div class="metric-card">
		<strong>Up to +1.8 pp</strong>
		<span>Low-load indicated efficiency gain</span>
	</div>
	<div class="metric-card">
		<strong>+0.3 pp</strong>
		<span>Misfire-risk modeling benefit</span>
	</div>
	<div class="metric-card">
		<strong>About 86%</strong>
		<span>In-cycle compensation feasibility</span>
	</div>
	<div class="metric-card">
		<strong>4 limits</strong>
		<span>Pressure-rise rate, peak pressure, exhaust temperature, misfire probability</span>
	</div>
</section>

## Why low-load operation benefits most

The largest efficiency improvements were observed at low loads.

This is consistent with the combustion-control problem. At low load, pilot combustion is more sensitive to operating-condition variation, fuel-injection uncertainty, and misfire risk. The combustion signal is weaker, stochastic variation is more influential, and conservative calibration margins can become larger.

When in-cycle control reduces this variation, the optimizer gains more room to move the set-point toward the efficient region. The benefit is therefore greater where open-loop operation must be most conservative.

At higher loads, combustion is often more robust. The relative variation is smaller, and the engine may already operate closer to the feasible efficiency region. In those cases, the incremental benefit from stochastic set-point optimization may be smaller.

This result highlights an important calibration principle: the value of stochastic optimization depends on how much uncertainty constrains the operating point.

## Constraint handling and trade-offs

A central contribution of the work was the explicit treatment of trade-offs.

Efficiency cannot be optimized independently from constraints. Advancing combustion phasing may improve indicated efficiency, but it can increase pressure-rise rate. Reducing misfire risk may require a different pilot strategy that changes combustion phasing or heat-release shape. Operating closer to a pressure constraint may improve efficiency but reduce robustness.

The stochastic optimizer made these trade-offs visible. Instead of producing a single deterministic optimum, it evaluated the expected efficiency together with the probability of constraint violation.

This is useful because engine calibration is fundamentally a constrained optimization problem. The best set-point is not the one with the highest theoretical efficiency. It is the one with the highest usable efficiency under the required reliability, safety, emissions, noise, and hardware limits.

The thesis showed that including stochastic variation changes the answer. Once cycle-to-cycle dispersion and misfire probability are considered, the optimum set-point can shift away from the nominal deterministic optimum.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a custom constraint-boundary map or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-set-point-optimization/constraint-boundary-map.svg" alt="Feasible combustion set-point region bounded by efficiency and operating constraints" loading="lazy" />
	<figcaption>Constraint-aware optimization treats pressure-rise, peak pressure, exhaust temperature, and misfire probability as boundaries on usable efficiency.</figcaption>
</figure>

## Optimization approach comparison

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

## The effect of in-cycle compensation

The optimization also showed how in-cycle compensation changes the feasible region.

Without in-cycle compensation, pilot-combustion variation can propagate into main combustion phasing and load. This increases dispersion and forces the calibration to maintain larger safety margins.

With in-cycle compensation, the controller can reduce the impact of pilot-combustion disturbances. The thesis showed that in-cycle regulation could compensate the effect of pilot-combustion variations in about 86% of cases. This reduced the penalty associated with stochastic disturbances and allowed a more efficient set-point to be selected.

However, the thesis also emphasized that in-cycle control is not always available. Observability and controllability restrictions can limit when the controller can act. For example, if the pilot event cannot be diagnosed early enough or the main injection can no longer be adjusted, same-cycle compensation is not possible.

The optimization therefore had to account for the cases where compensation is feasible and the cases where it is not. This prevents the set-point from relying on control authority that may not exist in every cycle.

## From optimization result to calibration insight

One useful outcome of stochastic set-point optimization is not only the final selected set-point, but the information it provides about why that set-point is selected.

The Monte Carlo framework can show whether the optimum is limited by pressure-rise rate, peak pressure, exhaust temperature, misfire probability, or efficiency roll-off. This makes the optimization useful for engineering interpretation.

For example, if the optimum is constrained by pressure-rise rate, then further efficiency improvement may require reducing combustion dispersion, changing injection shaping, or modifying the pilot-main interaction. If the optimum is constrained by misfire risk, then improving pilot stability may have more value than further optimizing nominal combustion phasing.

This turns optimization into a diagnostic tool for calibration strategy. It identifies not only what set-point to use, but what physical limitation is preventing a better one.

## Robustness under uncertainty

A practical set-point optimizer must be robust to modeling error. The thesis approached this by using stochastic combustion models, Monte Carlo evaluation, and constraints expressed probabilistically.

This does not remove all uncertainty, but it makes the uncertainty part of the decision. The optimizer does not assume that the model prediction is exact. It evaluates expected outcomes over a distribution.

That approach is particularly relevant when fuel properties, operating conditions, or injection-system behavior change. A set-point optimized only for a nominal deterministic model may not remain optimal when the distribution shifts. A stochastic framework provides a more realistic basis for selecting robust set-points.

The thesis results showed that efficiency improvement is possible without ignoring constraints. The optimization methods improved indicated efficiency while evaluating trade-offs between efficiency, pressure-rise constraints, and misfire risk.

## What this work shows

The central lesson is that combustion set-point optimization should account for variability, not only nominal behavior.

In pilot-main diesel combustion, the efficient operating region is shaped by stochastic effects: cycle-to-cycle dispersion, pilot-combustion variation, misfire probability, and uncertainty in pressure-rise behavior. These effects determine how close the engine can safely operate to its constraints.

The thesis developed stochastic set-point optimization methods that used combustion models and Monte Carlo simulation to evaluate efficiency and constraint risk together. The methods connected in-cycle control performance with calibration optimization: when control reduced variation, the optimizer could select a more efficient set-point.

The results showed measurable efficiency gains, including +0.42 percentage points from direct in-cycle efficiency optimization, about +0.6 percentage points at medium load from indirect set-point optimization, and up to +1.8 percentage points at low load under the evaluated constraints.

## The takeaway

Stochastic set-point optimization is about choosing the best target when combustion outcomes are distributed, not fixed.

A deterministic optimum can be misleading if it ignores cycle-to-cycle variation, pressure-rise risk, and pilot misfire probability. The practical optimum is the set-point that delivers the best expected efficiency while keeping constraint violations acceptably unlikely.

That is the contribution of this part of the thesis: it showed how stochastic combustion models, Monte Carlo simulation, constraint handling, and in-cycle control performance can be combined to optimize combustion-control set-points.

In practical terms, the work moves calibration from nominal set-point selection toward uncertainty-aware optimization. The engine is not calibrated only for the average cycle. It is calibrated for the distribution of cycles it will actually experience.

<section class="article-cta" aria-labelledby="optimization-cta-title">
	<h2 id="optimization-cta-title">Need help optimizing control set-points under uncertainty?</h2>
	<p>I work on combustion efficiency optimization, stochastic modeling, Monte Carlo simulation, constraint handling, model-based diagnostics, and real-time control strategy design for advanced powertrain systems.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about optimization</a></li>
		<li><a href="/research/">Explore related research</a></li>
	</ul>
</section>
