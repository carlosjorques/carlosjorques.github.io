---
title: Predictive In-Cycle Combustion Control
subtitle: Adjusting fuel injection before the combustion cycle is over
description: How predictive closed-loop controllers use pressure feedback, virtual sensing, online model adaptation, and FPGA implementation to regulate combustion within the same engine cycle.
publishDate: 2026-06-25
updatedDate: 2026-07-07
readingTime: 13 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion control
  - Predictive control
  - Closed-loop control
  - Model adaptation
  - FPGA implementation
  - Diesel engines
featured: true
draft: false
heroImage:
  src: /images/blog/predictive-in-cycle-control/thesis-general-controller.svg
  alt: Thesis diagram of the predictive in-cycle combustion controller architecture
---

<section class="article-callout" aria-labelledby="key-ideas-title">
	<h2 id="key-ideas-title">Key ideas</h2>
	<ul>
		<li>In-cycle combustion control acts before the current cycle is complete.</li>
		<li>Predictive models overcome the delay between fuel injection and measured combustion output.</li>
		<li>Virtual sensors provide early combustion-state estimates from pressure data.</li>
		<li>Online adaptation improves robustness when operating conditions or fuel properties change.</li>
		<li>FPGA implementation makes crank-angle-resolved control feasible in real time.</li>
	</ul>
</section>

Most combustion controllers operate from one engine cycle to the next. They measure what happened in a completed cycle, compare it with a target, and then adjust the next cycle. That approach is practical and widely used, but it has a fundamental limitation: it can only correct combustion after the event has already happened.

In-cycle combustion control asks for something faster. It uses measurements from the current combustion event to adjust a remaining actuator action within that same cycle. In pilot-main diesel combustion, this means observing the pilot combustion early enough to modify the following main injection before the main combustion develops.

This article is part of the series on my PhD research introduced in [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/), where you will find the motivation and the full context. The role of this article is the core control result of the thesis: predicting the main combustion and adjusting it within the same cycle. I cover how the predictive closed-loop controllers worked, what they achieved, and where their limits lie.

## Same-cycle control sequence

The control system had to behave not only as a feedback controller, but as a real-time decision system. In practice, the cycle-resolved control sequence was:

<ol class="process-list">
	<li>Measure in-cylinder pressure.</li>
	<li>Estimate pilot combustion state.</li>
	<li>Predict main combustion response.</li>
	<li>Compute injection correction.</li>
	<li>Apply the correction before the cycle is over.</li>
</ol>

<figure class="article-figure">
	<img src="/images/blog/predictive-in-cycle-control/thesis-cl-structure.svg" alt="Closed-loop architecture for in-cycle combustion control with in-cycle blocks highlighted" loading="lazy" />
	<figcaption>Pressure feedback becomes useful for same-cycle actuation only when measurement, estimation, prediction, and injection correction fit inside the available combustion window.</figcaption>
</figure>

## Why predictive control is needed in-cycle

Combustion control has an intrinsic timing problem. The controller action, such as a fuel injection command, occurs before the measured combustion output is fully available. A controller acting within the cycle cannot wait for the full pressure trace or the complete heat-release event. It must predict how the rest of the cycle will evolve from the partial information already observed.

This is why predictive control is central to in-cycle combustion regulation. The controller needs a model of the relationship between the current combustion state, the remaining injection command, and the final combustion output. In the thesis, the controller used early pressure-derived information to estimate the state of combustion, predict the effect of candidate fuel-injection actions, and select an injection correction before the available control window closed.

## The pilot-main control problem

The research focused on pilot-main diesel combustion. In this combustion strategy, a small pilot injection is delivered before the main injection. The pilot event influences the following main event by changing ignition conditions, heat-release shape, combustion phasing, noise, efficiency, and emissions.

That coupling creates both an opportunity and a challenge.

The opportunity is that the pilot combustion contains early information about how the cycle is developing. If the pilot event is stronger, weaker, delayed, or missing, the controller can detect this before the main injection. The main injection can then be adjusted to compensate.

The challenge is that the available time is short. The controller must estimate pilot combustion, predict its effect on main combustion, compute an actuator correction, and execute the command within a few crank-angle degrees.

The thesis treated this as an in-cycle feedback-control problem. The key controlled variables included combustion phasing, start of combustion, burnt pilot mass, and indicated mean effective pressure. The main control input was the injected fuel amount, commanded through a common-rail solenoid injector.

<figure class="article-figure">
	<img src="/images/blog/predictive-in-cycle-control/thesis-general-controller.svg" alt="Predictive in-cycle controller diagram with measured states, predicted output, reference error, feed-forward, and PI correction" loading="lazy" />
	<figcaption>The controller predicts the controlled combustion output from measured or estimated states, then updates the injection command before the remaining control authority is lost.</figcaption>
</figure>

## From virtual sensing to predictive control

Predictive in-cycle control depends on estimation. The controller cannot directly use hidden combustion states unless they are reconstructed from measurements.

The thesis therefore developed a set of virtual sensors and diagnostic estimators based primarily on in-cylinder pressure. These estimators provided information about cylinder volume deviation, heat capacity ratio, start of combustion, pilot misfire, and pilot fuel mass. A related article explains the diagnostic side in more detail: [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/).

For predictive control, the pilot fuel mass estimate was especially important. The thesis showed that pilot burnt mass significantly affects the timing and heat-release shape of the main combustion. If the pilot mass could be estimated before the main start of injection, the main injection could be modified to compensate for pilot-combustion variation.

## Predictive models for combustion regulation

The thesis used model-based prediction to link combustion-state estimates with the expected outcome of the current cycle. The models were developed from experimental characterization of combustion dynamics, using heat-release analysis and measured responses to fuel-injection changes.

The key modeling task was to predict how main combustion would respond to variations in pilot combustion and to changes in the main injection command. This included the interaction between pilot combustion and main combustion, especially the effect of pilot heat release on main start of combustion and main heat-release shape.

The predictive control strategy used this model information to calculate the injection correction needed to reduce cycle-to-cycle variation before the main combustion event was complete.

## Online model adaptation

Combustion models are never perfect. They change with operating condition, fuel properties, temperature, EGR level, injection hardware behavior, and cylinder-to-cylinder differences. A predictive controller that depends on a fixed model can lose accuracy when these conditions change.

The thesis therefore investigated online model adaptation. The controller updated model parameters during operation to improve prediction accuracy and maintain robustness under changing conditions.

This adaptation was necessary because the same injection correction does not always produce the same combustion response. Fuel properties, for example, affect ignition delay and combustion rate. Operating-condition changes alter the pressure and temperature environment in which the fuel burns. Without adaptation, the controller may calculate corrections based on outdated response behavior.

The research also showed that adaptation must be designed carefully. If too many model parameters are adapted independently, the system can become difficult to calibrate and may introduce undesirable transients. A reduced multi-cylinder adaptation method was therefore proposed, adapting some parameters per cylinder while sharing others across cylinders; the implementation details are covered in [real-time combustion control implementation](/writing/real-time-combustion-control-implementation/).

This approach improved robustness while keeping the implementation feasible for real-time control.

<figure class="article-figure">
	<img src="/images/blog/predictive-in-cycle-control/thesis-model-adaptation.svg" alt="Model adaptation structure for in-cycle predictive combustion models" loading="lazy" />
	<figcaption>Online adaptation updates prediction behavior during operation, but the adaptation structure has to remain simple enough to calibrate and stable enough for control.</figcaption>
</figure>

## Controllability and observability limits

In-cycle control is only possible when two conditions are satisfied.

First, the relevant combustion event must be observable early enough. The controller must detect or estimate pilot combustion before the main injection command must be finalized. If the pilot combustion is too weak, too noisy, or too delayed, reliable diagnosis may not be possible within the available window.

Second, the actuator must still have control authority. The main injection must still be adjustable at the moment when the controller computes the correction. If the main injection has already started, or if hardware timing limits prevent a new command, in-cycle compensation is no longer available.

The thesis explicitly analyzed these observability and controllability restrictions. This is important because in-cycle control should not be treated as always available. There are operating points, injection timings, and combustion conditions where the controller cannot safely or effectively intervene within the same cycle.

The research showed that applying in-cycle control without respecting these limits can reduce efficiency or increase constraint violations. A robust controller therefore needs diagnostic logic that knows when in-cycle compensation is possible and when the system should fall back to other control strategies.

## Reducing cycle-to-cycle variation

One of the main outcomes of the predictive in-cycle controller was the reduction of stochastic cyclic variation.

In open-loop operation, variations in pilot combustion can propagate into the main combustion and produce dispersion in combustion phasing and load. With predictive in-cycle control, the system could use early pilot-combustion information to compensate these variations before the main combustion developed.

The thesis quantified this over repeated cycles at the same operating point, comparing open-loop operation against predictive in-cycle closed-loop control:

<div class="comparison-table" role="region" aria-label="Cycle-to-cycle variation in open-loop versus in-cycle closed-loop operation">
	<table>
		<thead>
			<tr>
				<th scope="col">Controlled variable</th>
				<th scope="col">Open loop</th>
				<th scope="col">In-cycle closed loop</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Pilot start of combustion</th>
				<td>+/-1 CAD</td>
				<td>+/-0.4 CAD</td>
			</tr>
			<tr>
				<th scope="row">Main start of combustion</th>
				<td>+/-0.4 CAD</td>
				<td>+/-0.3 CAD</td>
			</tr>
			<tr>
				<th scope="row">Burnt pilot mass</th>
				<td>+/-1.5 mg</td>
				<td>+/-0.6 mg</td>
			</tr>
			<tr>
				<th scope="row">IMEP</th>
				<td>+/-0.8 bar</td>
				<td>+/-0.2 bar</td>
			</tr>
		</tbody>
	</table>
</div>

These results show the value of acting within the cycle. The controller did not merely correct the next combustion event. It reduced the propagation of pilot-combustion variation into the main combustion event of the same cycle.

<figure class="article-figure">
	<img src="/images/blog/predictive-in-cycle-control/thesis-in-cycle-results.svg" alt="Experimental comparison of in-cycle closed-loop and open-loop combustion control results" loading="lazy" />
	<figcaption>The thesis compared open-loop and in-cycle closed-loop operation over repeated cycles, showing how feedback reduces dispersion in combustion and load metrics.</figcaption>
</figure>

## Robustness under model uncertainty and fuel changes

A predictive controller must remain useful when the model is imperfect. The thesis therefore evaluated controller robustness under model uncertainty and changing fuel conditions.

Fuel changes are a strong test case because they affect ignition delay, combustion rate, and pilot-main interaction. A controller calibrated for one fuel may not predict the same combustion response when another fuel is used. The research included both conventional diesel and high-cetane biodiesel fuels, and the controller was evaluated across operating conditions to assess whether its performance remained robust.

The thesis showed that online adaptation and modular control architecture improved robustness. The controller could maintain improved tracking performance and shorter transients across changing operating conditions and fuel conditions.

This result is important because combustion control cannot rely on a perfectly calibrated model at one fixed operating point. A practical controller must tolerate uncertainty, adapt to changed combustion behavior, and avoid instability when the model is temporarily wrong.

## Pilot misfire compensation

Pilot misfire is one of the clearest examples of why in-cycle predictive control is valuable.

If the pilot event fails to ignite, the main combustion can be delayed and the engine load can deviate from its target. In a conventional controller, this would be corrected only after the fault has affected the cycle. In an in-cycle controller, the misfire can be detected before the main combustion develops, and the remaining injection strategy can be changed.

The thesis developed online pilot misfire diagnosis and used it as feedback for compensation. The related diagnostic decision problem is discussed in [stochastic fault detection and diagnostic decision logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/). When pilot misfire was detected, the controller could use a second pilot injection to recover the combustion trajectory.

With this strategy, the main start-of-combustion error was reduced from +1.5 +/- 0.6 crank-angle degrees to 0 +/- 0.4 crank-angle degrees. The load error was reduced from -0.5 +/- 0.4 bar IMEP to 0 +/- 0.2 bar IMEP.

This result highlights the difference between monitoring and control. Detecting a misfire is useful. Detecting it early enough to compensate for it within the same combustion cycle is much more powerful.

## FPGA implementation

The control algorithms were implemented on FPGA hardware, and that choice shaped the control design. In-cycle control must acquire pressure data, estimate combustion states, update predictions, and synchronize injection commands within 27-microsecond windows, and only the deterministic parallel execution of an FPGA could guarantee that timing. In return, the models and estimators had to be simplified enough to fit the available hardware resources while staying accurate enough for control. The full treatment of this implementation work, from fixed-point arithmetic to resource budgets, is in [real-time combustion control implementation](/writing/real-time-combustion-control-implementation/).

<figure class="article-figure">
	<img src="/images/blog/predictive-in-cycle-control/thesis-fpga-diagram.svg" alt="FPGA data acquisition and control architecture used for combustion-control experiments" loading="lazy" />
	<figcaption>FPGA implementation made deterministic crank-angle-resolved execution feasible, while forcing the models and estimators to remain computationally compact.</figcaption>
</figure>

## Modular controller architecture

The thesis proposed a modular controller design coordinated by a finite-state machine. The supervisory logic selected the active control mode in real time: normal predictive control when pilot combustion was observable and the main injection remained adjustable, misfire-compensation logic when a pilot misfire was detected, and a fallback mode when the cycle was no longer controllable. The architecture itself, and how it was calibrated and extended module by module, is described in [real-time combustion control implementation](/writing/real-time-combustion-control-implementation/).

<div class="comparison-table" role="region" aria-label="Controller design elements and implementation concerns">
	<table>
		<thead>
			<tr>
				<th scope="col">Element</th>
				<th scope="col">Role in control</th>
				<th scope="col">Implementation concern</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Virtual sensing</th>
				<td>Estimates hidden combustion states</td>
				<td>Must be early and robust</td>
			</tr>
			<tr>
				<th scope="row">Predictive model</th>
				<td>Forecasts remaining cycle response</td>
				<td>Must tolerate uncertainty</td>
			</tr>
			<tr>
				<th scope="row">Online adaptation</th>
				<td>Updates model behavior during operation</td>
				<td>Must avoid over-parameterization</td>
			</tr>
			<tr>
				<th scope="row">FPGA implementation</th>
				<td>Enables deterministic real-time execution</td>
				<td>Must fit resource constraints</td>
			</tr>
			<tr>
				<th scope="row">Supervisory logic</th>
				<td>Selects active control mode</td>
				<td>Must respect observability and controllability</td>
			</tr>
		</tbody>
	</table>
</div>

## Efficiency benefits

Predictive in-cycle control also supported efficiency optimization.

By reducing cyclic dispersion, the controller allowed the engine to operate closer to efficiency-optimal combustion phasing while still respecting constraints such as maximum cylinder pressure, pressure-rise rate, exhaust temperature, and noise-related limits.

The thesis showed that this control precision could be converted into measurable indicated-efficiency gains, both through direct in-cycle optimization and through stochastic set-point optimization. The numbers, and the method that produced them, are covered in [stochastic set-point optimization for efficiency](/writing/stochastic-set-point-optimization-efficiency/).

The mechanism is important. The efficiency improvement did not come only from changing the nominal set-point. It came from improving control precision, reducing variability, and making it possible to operate closer to the best feasible point without violating constraints.

## What this work shows

The central lesson is that predictive in-cycle combustion control turns combustion regulation into a real-time estimation, prediction, and actuation problem.

The controller must observe combustion while it is still developing. It must estimate hidden states from pressure data. It must predict how the rest of the cycle will respond. It must adapt the model when operating conditions or fuel properties change. And it must execute the correction within strict timing and hardware constraints.

The thesis developed predictive closed-loop controllers that used this structure to regulate combustion within the same engine cycle. The controllers reduced cycle-to-cycle variation, compensated pilot-combustion disturbances, improved transient tracking, maintained robustness under changing fuel and operating conditions, and supported efficiency optimization.

## The takeaway

Predictive in-cycle combustion control is about acting before the combustion error becomes final.

In pilot-main diesel combustion, the pilot event contains early information about the current cycle. If that information is converted into a reliable state estimate, and if a predictive model can estimate the effect on main combustion, the controller can modify the remaining injection strategy before the cycle is over.

That is the contribution of this part of the thesis: it showed how predictive models, virtual sensing, online adaptation, and real-time FPGA implementation can work together to make same-cycle combustion regulation possible.

In practical terms, the work turns delayed correction into real-time intervention. The engine does not only learn from the previous cycle. It observes the current one, predicts where it is going, and changes course while there is still time.

## Part of the series: In-Cycle Combustion Control

1. [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/) (the overview)
2. [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/)
3. [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/)
4. Predictive In-Cycle Combustion Control (this article)
5. [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/)
6. [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/)

## Source articles

This article is based on my PhD thesis and the following thesis papers:

- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Predictive In-Cycle Closed-Loop Combustion Control with Pilot-Main Injections," *IFAC-PapersOnLine*, 53(2):14000-14007, 2020.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Multi-Cylinder Adaptation of In-Cycle Predictive Combustion Models," *SAE Technical Paper* 2020-01-2087, 2020.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "In-Cycle Closed-Loop Combustion Control for Pilot Misfire Compensation," *SAE International Journal of Advances and Current Practices in Mobility*, 3(1):299-311, 2021.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, PhD thesis, Lund University, 2021.

<section class="article-cta" aria-labelledby="article-next-title">
	<h2 id="article-next-title">Need help designing real-time combustion control or model-based diagnostics?</h2>
	<p>I work on predictive combustion control, virtual sensing, embedded decision logic, model adaptation, and FPGA-oriented control implementation for advanced powertrain systems.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about combustion control</a></li>
		<li><a href="/research/">Explore related research</a></li>
		<li><a href="/work/">View related work context</a></li>
	</ul>
</section>
