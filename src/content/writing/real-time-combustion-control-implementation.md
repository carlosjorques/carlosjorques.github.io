---
title: Real-Time Combustion Control Implementation
subtitle: Turning combustion algorithms into hardware-executable control systems
description: How combustion observers, virtual sensors, diagnostic logic, and predictive controllers can be implemented under real-time FPGA hardware constraints for in-cycle combustion control.
publishDate: 2026-06-25
readingTime: 17 min read
category: Control Algorithms & Diagnostics
tags:
  - Real-time implementation
  - FPGA
  - Embedded control
  - Combustion control
  - Signal processing
  - Hardware-constrained systems
featured: true
draft: false
heroImage:
  src: /images/blog/real-time-combustion-control/hero-fpga-combustion-control.svg
  alt: Engine cylinder and FPGA visualization representing real-time combustion control implementation
---

<!-- TODO: Replace hero placeholder with custom FPGA/control-pipeline illustration or thesis-derived figure if reuse is permitted. -->

<section class="article-callout" aria-labelledby="key-ideas-title">
	<h2 id="key-ideas-title">Key ideas</h2>
	<ul>
		<li>In-cycle combustion control is only useful if the algorithm executes before the control window closes.</li>
		<li>FPGA hardware enables deterministic crank-angle-resolved execution.</li>
		<li>Virtual sensors and observers must be accurate enough, early enough, and computationally feasible.</li>
		<li>Real-time implementation requires model simplification, fixed-point awareness, and resource budgeting.</li>
		<li>Modular controller architecture and finite-state coordination improve scalability and robustness.</li>
	</ul>
</section>

A combustion-control algorithm is only useful in-cycle if it can run before the control window closes.

That sounds obvious, but it changes the way the control problem must be designed. In-cycle combustion control does not operate on relaxed desktop-computing time. It operates on crank-angle-resolved engine time, where measurements, estimation, diagnostic decisions, model predictions, and actuator commands must be completed within a few crank-angle degrees.

My [PhD thesis](/research/), *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, investigated this problem in the context of pilot-main diesel combustion. One part of the work focused on real-time combustion control implementation: how to implement combustion observers, virtual sensors, diagnostic logic, model adaptation, and predictive controllers under hardware constraints.

The goal was not only to develop control methods that worked in analysis or simulation. The goal was to implement in-cycle combustion-control methods for real-time execution on FPGA hardware and to quantify the timing, resource, and implementation constraints that determine whether embedded deployment is feasible.

## Real-time control pipeline

The implementation problem can be understood as a deterministic pipeline. Each stage has to complete early enough for the next one to remain useful:

<ol class="process-list">
	<li>Acquire in-cylinder pressure.</li>
	<li>Synchronize measurements with crank angle.</li>
	<li>Process the signal and estimate combustion states.</li>
	<li>Run diagnostic and predictive-control logic.</li>
	<li>Compute actuator correction.</li>
	<li>Issue the injection command before the control deadline.</li>
</ol>

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with custom FPGA/control-pipeline illustration or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/real-time-combustion-control/fpga-control-pipeline.svg" alt="FPGA control pipeline for real-time in-cycle combustion control" loading="lazy" />
	<figcaption>The control pipeline turns pressure measurements into a same-cycle injection decision only when every stage fits inside the available crank-angle window.</figcaption>
</figure>

## Why implementation is part of the control problem

Combustion control is often discussed in terms of models, estimators, and controller design. Those are essential, but for in-cycle control they are not enough.

A controller may be accurate but too slow. An estimator may be physically meaningful but too computationally expensive. A diagnostic method may perform well offline but require too many crank-angle samples before it can make a decision. A model may predict combustion accurately but use mathematical operations that are expensive or difficult to implement deterministically in embedded hardware.

For cycle-to-cycle control, some of these limitations can be tolerated. The controller has an entire engine cycle, or more, to process measurements and update the next command. For in-cycle control, the available time is much shorter. The controller must act before the remaining injection event occurs.

This means implementation constraints must influence the algorithm itself. The design question is not simply, "Which model is most accurate?" It is, "Which model is accurate enough, early enough, and simple enough to run in real time?"

## The in-cycle timing challenge

The research focused on pilot-main diesel combustion. In this combustion strategy, a small pilot injection occurs before the main injection. The pilot combustion affects the following main combustion event, influencing ignition delay, heat-release shape, combustion phasing, load, noise, efficiency, and emissions.

This interaction creates the opportunity for in-cycle control. If the controller can estimate what happened during the pilot combustion, it can modify the main injection in the same cycle.

But the timing requirement is severe.

The system must acquire in-cylinder pressure data, synchronize it with crank angle, process the signal, estimate combustion states, run diagnostic logic, predict the remaining combustion response, compute an injection correction, and send the actuator command before the main injection command must be finalized.

Every part of the algorithm consumes time and hardware resources. Signal filtering, heat-release computation, pressure prediction, start-of-combustion detection, pilot-mass estimation, misfire diagnosis, model adaptation, and controller execution all compete for the same real-time budget.

The thesis treated this as a hardware-constrained control-design problem.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with custom crank-angle timing diagram or approved thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/real-time-combustion-control/crank-angle-deadline.svg" alt="Crank-angle timing diagram showing real-time control deadline before main injection" loading="lazy" />
	<figcaption>In-cycle control has to form a useful state estimate after pilot-combustion evidence appears and before the remaining injection command deadline.</figcaption>
</figure>

## Why FPGA hardware was used

The control and estimation algorithms were implemented on FPGA hardware.

An FPGA is well suited for this type of problem because it can execute many operations in parallel with deterministic timing. That is valuable for crank-angle-resolved combustion control, where the system must process incoming pressure data and trigger outputs at precisely defined engine positions.

The FPGA implementation allowed measurements to be processed fast enough for pilot-main injection control. It also supported modular execution of observers, estimators, diagnostic logic, predictive models, and actuator-command generation.

However, the benefit came with constraints. FPGA resources are finite. Memory, multipliers, logic elements, data-path width, and execution scheduling all matter. Algorithms that appear simple in floating-point simulation may become expensive when mapped to fixed-point or resource-limited hardware.

The thesis therefore quantified hardware requirements and evaluated how design choices affected timing and resource usage.

<section class="metric-grid" aria-label="Implementation characteristics for real-time combustion control">
	<div class="metric-card">
		<strong>FPGA</strong>
		<span>Real-time execution platform</span>
	</div>
	<div class="metric-card">
		<strong>Crank angle</strong>
		<span>Control time base</span>
	</div>
	<div class="metric-card">
		<strong>Pressure</strong>
		<span>Primary measurement input</span>
	</div>
	<div class="metric-card">
		<strong>Observers</strong>
		<span>Virtual sensing and diagnostics</span>
	</div>
	<div class="metric-card">
		<strong>Budgeted</strong>
		<span>Timing, resources, and scheduling</span>
	</div>
	<div class="metric-card">
		<strong>FSM</strong>
		<span>Modular architecture coordination</span>
	</div>
	<div class="metric-card">
		<strong>Deadline</strong>
		<span>Injection command finalization</span>
	</div>
	<div class="metric-card">
		<strong>Robustness</strong>
		<span>Operating and fuel-condition changes</span>
	</div>
</section>

## Signal processing under real-time constraints

In-cylinder pressure was the primary measurement for combustion diagnostics and control. It contains rich information, but it must be processed carefully before it can be used.

The pressure signal must be referenced, filtered, synchronized with crank angle, and combined with cylinder-volume information. Heat-release analysis then uses the pressure trace, volume trace, and thermodynamic assumptions to estimate combustion progress.

In offline analysis, this processing can be detailed and computationally intensive. In real-time control, it must be simplified.

The thesis addressed this by developing implementation-oriented models and estimators. For example, cylinder volume estimation was improved using a model that accounts for thermal, pressure, and inertial deformation effects. This improved heat-release accuracy, but the model also needed to remain simple enough for real-time execution.

The same implementation logic applied to other estimators. Heat capacity ratio estimation, start-of-combustion detection, pilot misfire detection, and pilot mass estimation all had to be designed around the available computation time.

The practical result was a set of virtual sensors that were not only physically motivated, but also compatible with crank-angle-resolved implementation. A related article covers this layer in more detail: [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/).

## Simplifying models without losing control value

A recurring theme in the thesis was the trade-off between model fidelity and implementation feasibility.

Detailed combustion models can describe physical processes more completely, but they are often too slow or too complex for in-cycle control. The controller does not need a perfect reconstruction of the combustion event. It needs the right information early enough to make a useful decision.

For pilot mass estimation, the thesis used simplified dynamic models suitable for FPGA implementation. The model represented the progression from injection to vaporization to premixed combustion, with rate constants parameterized using ignition delay. This reduced computational complexity while preserving the information needed for control.

This is an important implementation principle: in embedded combustion control, the best model is not necessarily the most detailed model. It is the model that gives the controller enough information at the correct time with acceptable uncertainty and feasible hardware cost.

## Virtual sensors as embedded observers

The virtual sensors developed in the thesis were designed to provide feedback information to the in-cycle controller. They estimated quantities that were not directly measurable with sufficient timing or reliability.

These included cylinder volume deviation, heat capacity ratio, start of combustion, pilot misfire, and pilot fuel mass.

Each observer had a real-time role. Cylinder volume estimation improved the heat-release basis used by later estimators. Heat capacity ratio estimation improved pressure prediction. Start-of-combustion detection provided timing information. Pilot misfire detection identified abnormal pilot combustion. Pilot mass estimation quantified the pilot combustion state before the main injection.

For embedded implementation, each observer had to satisfy three requirements:

1. it had to use available sensor data,
2. it had to finish before its output was needed,
3. it had to fit within hardware resources.

This is why the thesis treated virtual sensing and implementation together. A virtual sensor that works only after the cycle is complete may be useful for analysis, but it cannot support same-cycle control.

## Diagnostic logic in hardware

The thesis also implemented diagnostic decision logic for pilot misfire detection.

Pilot misfire diagnosis is a useful example because the decision must be both fast and robust. The system must decide whether the pilot event combusted before the main injection. If a misfire is detected early enough, the controller can compensate by modifying the remaining injection strategy.

The diagnostic methods included deterministic thresholds, stochastic detection, adaptive thresholds, and sensor fusion of pressure-derived indicators. These methods were evaluated not only for detection performance, but also for their suitability in real-time control. The diagnostic design is discussed separately in [stochastic fault detection and diagnostic decision logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/).

A simple threshold is attractive because it is computationally efficient and transparent. A stochastic detector can represent uncertainty more explicitly, but it requires probability models and additional computation. Sensor fusion can improve robustness, but it adds calibration and implementation complexity.

The thesis showed that implementation constraints are part of diagnostic design. The most accurate detector is not always the best embedded detector if its additional complexity does not justify the marginal performance gain.

## Predictive control execution

The predictive controller used early combustion information to adjust the remaining injection command within the same cycle.

This required a deterministic execution sequence. The controller had to wait for enough pressure-derived information to estimate the pilot combustion state, but not so long that the main injection command became impossible to change. The predictive model then estimated how the main combustion would respond, and the controller computed an injection correction.

That sequence had to be synchronized with crank angle. Timing was not simply measured in milliseconds, but in engine position. At higher engine speeds, the same number of crank-angle degrees corresponds to less physical time, making the implementation problem harder.

This is one reason FPGA execution was important. It provided deterministic timing for the control pipeline and enabled the controller to operate at the required crank-angle resolution. The broader control strategy is covered in [predictive in-cycle combustion control](/writing/predictive-in-cycle-combustion-control/).

## Online adaptation and implementation complexity

The thesis investigated online model adaptation to maintain prediction accuracy under changing operating conditions and fuel properties.

Adaptation improves robustness, but it also increases implementation complexity. Additional parameters require additional memory, update logic, calibration effort, and validation. If too many parameters are adapted independently, the controller can become difficult to tune and may introduce undesirable transients.

To address this, the thesis proposed reduced multi-cylinder adaptation. Some model parameters were adapted per cylinder, while others were shared across cylinders. This reduced complexity while maintaining useful prediction performance.

This illustrates another embedded-control principle: adaptation should be designed with the implementation architecture in mind. The goal is not to adapt every possible parameter. The goal is to adapt the parameters that provide the greatest robustness benefit for the lowest hardware and calibration cost.

## Modular controller architecture

A major implementation outcome of the thesis was a modular controller structure coordinated by a finite-state machine.

The control system included measurement processing, virtual sensing, model-based prediction, adaptation, controller selection, actuator-output generation, and supervisory strategy coordination. The finite-state machine synchronized these modules and selected the active control mode depending on the current combustion and control state.

This was important because in-cycle control is conditional. The system must know whether pilot combustion is observable, whether the main injection is still controllable, whether a misfire has been detected, and whether compensation should be applied. If in-cycle control is not feasible, the system must avoid issuing corrections based on insufficient information or unavailable actuator authority.

The modular architecture improved scalability and calibration. It allowed individual functions to be developed and tested separately, then integrated into a coordinated control system.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with custom modular architecture illustration or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/real-time-combustion-control/modular-controller-architecture.svg" alt="Modular combustion-control architecture coordinated by a finite-state machine" loading="lazy" />
	<figcaption>The finite-state machine coordinates measurement processing, virtual sensing, diagnostics, prediction, adaptation, control selection, and actuator output.</figcaption>
</figure>

## Quantifying hardware requirements

The thesis emphasized that real-time feasibility must be measured, not assumed.

For FPGA deployment, this means quantifying timing, resource usage, numerical representation, and module scheduling. Algorithms must be evaluated in terms of whether they meet the required control deadlines and whether they fit within available hardware resources.

This includes questions such as:

* How much computation is required per crank-angle sample?
* Which operations dominate FPGA resource usage?
* Can the algorithm be represented with fixed-point arithmetic?
* How many modules can run in parallel?
* Which computations can be reused across cylinders?
* What timing margin remains before the actuator command must be issued?

By quantifying these constraints, the thesis connected control design with embedded implementation. The result was not only a controller that worked experimentally, but a clearer understanding of what limits real-time deployment.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with custom hardware-resource budget illustration or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/real-time-combustion-control/hardware-resource-budget.svg" alt="Hardware resource budget illustration for FPGA combustion-control implementation" loading="lazy" />
	<figcaption>Resource budgeting turns implementation feasibility into an engineering constraint: timing, memory, multipliers, data-path width, and scheduling all shape the algorithm.</figcaption>
</figure>

## Implementation design choices

<div class="comparison-table" role="region" aria-label="Implementation design choices and trade-offs for real-time combustion control">
	<table>
		<thead>
			<tr>
				<th scope="col">Design choice</th>
				<th scope="col">Why it matters</th>
				<th scope="col">Implementation trade-off</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">FPGA execution</th>
				<td>Deterministic parallel computation</td>
				<td>Limited resources and fixed-point constraints</td>
			</tr>
			<tr>
				<th scope="row">Simplified models</th>
				<td>Enables in-cycle execution</td>
				<td>Lower physical detail than offline models</td>
			</tr>
			<tr>
				<th scope="row">Virtual sensors</th>
				<td>Estimate hidden combustion states</td>
				<td>Must provide useful information early enough</td>
			</tr>
			<tr>
				<th scope="row">Adaptive models</th>
				<td>Improve robustness under changing conditions</td>
				<td>Add calibration and memory/update complexity</td>
			</tr>
			<tr>
				<th scope="row">Modular architecture</th>
				<td>Improves scalability and integration</td>
				<td>Requires supervisory coordination</td>
			</tr>
			<tr>
				<th scope="row">Finite-state logic</th>
				<td>Selects valid control modes</td>
				<td>Must handle observability and controllability limits</td>
			</tr>
		</tbody>
	</table>
</div>

## Robustness across operating conditions and fuels

The implementation was validated under changing operating conditions and fuel conditions.

This matters because embedded combustion control cannot depend on a single carefully tuned operating point. Engine speed, load, injection timing, rail pressure, EGR ratio, temperature, and fuel properties can all change the combustion response and the timing available for control.

The thesis showed that the modular controller design, online adaptation, and real-time estimation structure improved tracking performance and reduced transients across different operating conditions and fuels. This demonstrated that the implementation was not only fast enough, but also robust enough to support practical combustion-control experiments.

## From algorithm to deployable control system

One of the strongest messages from the implementation work is that combustion-control research must bridge the gap between offline algorithm development and embedded execution.

An offline estimator can use future samples, high-precision arithmetic, and complex computation. A real-time estimator cannot. An offline controller can be evaluated after the full cycle is known. An in-cycle controller must act with incomplete information. An offline model can be recalibrated manually. An embedded model must operate across changing conditions with limited resources.

The thesis addressed this gap by designing observers, virtual sensors, predictive controllers, diagnostic logic, and adaptation methods with real-time execution in mind.

The result was a combustion-control framework that could run on FPGA hardware, process pressure measurements at the required time scale, and issue control actions within the same engine cycle.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with custom offline-versus-real-time illustration or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/real-time-combustion-control/offline-vs-realtime.svg" alt="Comparison between offline combustion analysis and real-time embedded control execution" loading="lazy" />
	<figcaption>Offline analysis can wait for complete data. In-cycle implementation has to decide with partial information, deterministic timing, and finite hardware resources.</figcaption>
</figure>

## What this work shows

The central lesson is that real-time combustion control is not only a control-theory problem. It is an implementation problem.

The controller must estimate hidden combustion states, diagnose abnormal combustion behavior, predict the remaining cycle response, adapt to changing conditions, and issue actuator commands within strict timing and resource constraints.

The thesis implemented in-cycle combustion-control methods on FPGA hardware and quantified the timing, resource, and implementation constraints that shape embedded deployment. The work showed that virtual sensing, predictive control, diagnostic logic, and model adaptation can be made compatible with real-time execution when the algorithms are designed around hardware constraints from the beginning.

## The takeaway

Real-time combustion control implementation is about making advanced combustion algorithms executable at the speed of the engine.

In-cycle control cannot wait for complete post-cycle analysis. It requires observers and controllers that operate with partial information, deterministic timing, and limited hardware resources. FPGA implementation makes this possible, but only if the algorithms are simplified, synchronized, and structured for embedded execution.

That is the contribution of this part of the thesis: it showed how combustion observers, virtual sensors, diagnostic methods, predictive controllers, and adaptation logic can be implemented as a real-time hardware-constrained control system.

In practical terms, the work moves combustion-control research from algorithms that work offline toward controllers that can intervene during the combustion cycle itself. Related articles cover [stochastic set-point optimization for efficiency](/writing/stochastic-set-point-optimization-efficiency/) and the wider [combustion control research](/research/) context.

<section class="article-cta" aria-labelledby="article-next-title">
	<h2 id="article-next-title">Need help turning control algorithms into real-time embedded systems?</h2>
	<p>I work on combustion control implementation, FPGA-oriented signal processing, virtual sensing, embedded diagnostics, predictive control, and hardware-constrained real-time decision logic.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about embedded control</a></li>
		<li><a href="/research/">Explore related research</a></li>
	</ul>
</section>
