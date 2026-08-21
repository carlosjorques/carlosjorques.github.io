---
title: Real-Time Combustion Control Implementation
subtitle: Turning combustion algorithms into hardware-executable control systems
description: How combustion observers, virtual sensors, diagnostic logic, and predictive controllers can be implemented under real-time FPGA hardware constraints for in-cycle combustion control.
publishDate: 2026-06-25
updatedDate: 2026-07-07
readingTime: 12 min read
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
  src: /images/blog/real-time-combustion-control/thesis-fpga-diagram.svg
  alt: Thesis diagram of the FPGA data acquisition and combustion-control architecture
---

<section class="article-callout" aria-labelledby="key-ideas-title">
	<h2 id="key-ideas-title">Key ideas</h2>
	<ul>
		<li>In-cycle combustion control is only useful if the algorithm executes before the control window closes.</li>
		<li>At 1200 RPM, a 0.2 crank-angle-degree sample arrives roughly every 27 microseconds. The per-sample pipeline must fit inside that budget.</li>
		<li>FPGA hardware enables deterministic, parallel, crank-angle-resolved execution that a sequential CPU cannot guarantee.</li>
		<li>Real-time implementation requires model simplification, fixed-point awareness, and resource budgeting.</li>
		<li>Modular controller architecture and finite-state coordination improve scalability and robustness.</li>
	</ul>
</section>

A combustion-control algorithm is only useful in-cycle if it can run before the control window closes.

That sounds obvious, but it changes the way the control problem must be designed. In-cycle combustion control does not operate on relaxed desktop-computing time. It operates on crank-angle-resolved engine time, where measurements, estimation, diagnostic decisions, model predictions, and actuator commands must be completed within a few crank-angle degrees.

This article is part of the series introduced in [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/), where I explain the motivation and full context of my PhD research on in-cycle closed-loop combustion control. This one is the capstone. It covers how the observers, virtual sensors, diagnostic logic, model adaptation, and predictive controllers from the other articles were made to run under hard real-time constraints on FPGA hardware.

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
	<img src="/images/blog/real-time-combustion-control/thesis-fpga-diagram.svg" alt="FPGA data acquisition and control architecture used in the combustion-control experiments" loading="lazy" />
	<figcaption>The control pipeline turns pressure measurements into a same-cycle injection decision only when every stage fits inside the available crank-angle window.</figcaption>
</figure>

## The 27-microsecond budget

The research focused on pilot-main diesel combustion, where the controller estimates the pilot combustion state and corrects the main injection within the same cycle. The control strategy itself, and why the pilot-main interaction creates this opportunity, is covered in [predictive in-cycle combustion control](/writing/predictive-in-cycle-combustion-control/). Here, what matters is the timing it imposes.

In-cylinder pressure was sampled every 0.2 crank-angle degrees. Timing in this system is not measured in milliseconds but in engine position, and at higher engine speeds the same number of crank-angle degrees corresponds to less physical time. At 1200 RPM, a 0.2 CAD interval is roughly 27 microseconds. That is the recurring per-sample budget, and everything the pipeline does per sample has to fit inside it:

<div class="comparison-table" role="region" aria-label="What must execute within the 27-microsecond per-sample window">
	<table>
		<thead>
			<tr>
				<th scope="col">Per-sample task</th>
				<th scope="col">What it consumes</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Pressure referencing and filtering</th>
				<td>Arithmetic on the incoming sample stream</td>
			</tr>
			<tr>
				<th scope="row">Crank-angle synchronization</th>
				<td>Deterministic event handling at engine position</td>
			</tr>
			<tr>
				<th scope="row">Heat-release and state estimation updates</th>
				<td>Multipliers, memory, fixed-point data paths</td>
			</tr>
			<tr>
				<th scope="row">Diagnostic decisions</th>
				<td>Threshold logic, probability evaluation</td>
			</tr>
			<tr>
				<th scope="row">Prediction and injection correction</th>
				<td>Model evaluation, controller computation</td>
			</tr>
			<tr>
				<th scope="row">Actuator command generation</th>
				<td>Output timing margin before the injection deadline</td>
			</tr>
		</tbody>
	</table>
</div>

Every one of these competes for the same real-time budget. A controller may be accurate but too slow. An estimator may be physically meaningful but too computationally expensive. A diagnostic method may perform well offline but require too many crank-angle samples before it can decide. For cycle-to-cycle control, some of these limitations can be tolerated because the controller has an entire cycle to update the next command. For in-cycle control, they cannot.

This means implementation constraints must influence the algorithm itself. The design question is not simply, "Which model is most accurate?" It is, "Which model is accurate enough, early enough, and simple enough to run in real time?" The thesis treated this as a hardware-constrained control-design problem.

<figure class="article-figure">
	<img src="/images/blog/real-time-combustion-control/thesis-state-machine-signals.svg" alt="Modular in-cycle closed-loop combustion control signals and finite-state-machine states over crank angle" loading="lazy" />
	<figcaption>In-cycle control has to form a useful state estimate after pilot-combustion evidence appears and before the remaining injection command deadline.</figcaption>
</figure>

## Why FPGA hardware was used

The control and estimation algorithms were implemented on FPGA hardware. The choice follows directly from the timing budget. A sequential processor shares one instruction stream across all tasks and inherits timing jitter from scheduling, interrupts, and memory access. An FPGA gives each module its own logic, running concurrently, with clock-cycle-deterministic timing:

<div class="comparison-table" role="region" aria-label="CPU sequential versus FPGA parallel execution properties">
	<table>
		<thead>
			<tr>
				<th scope="col">Property</th>
				<th scope="col">CPU (sequential)</th>
				<th scope="col">FPGA (parallel)</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Execution model</th>
				<td>One instruction stream shared by all tasks</td>
				<td>Dedicated logic per module, running concurrently</td>
			</tr>
			<tr>
				<th scope="row">Timing behavior</th>
				<td>Jitter from scheduling, interrupts, caches</td>
				<td>Deterministic, clock-cycle accurate</td>
			</tr>
			<tr>
				<th scope="row">Time base</th>
				<td>Wall-clock time, software timers</td>
				<td>Crank-angle events, position-triggered outputs</td>
			</tr>
			<tr>
				<th scope="row">Arithmetic</th>
				<td>Floating point comes cheap</td>
				<td>Fixed point, word lengths must be budgeted</td>
			</tr>
			<tr>
				<th scope="row">Adding functionality</th>
				<td>Longer execution time, later deadline risk</td>
				<td>More logic and multipliers, same latency</td>
			</tr>
		</tbody>
	</table>
</div>

The benefit came with constraints. FPGA resources are finite: memory, multipliers, logic elements, data-path width, and execution scheduling all matter. Algorithms that appear simple in floating-point simulation may become expensive when mapped to fixed-point or resource-limited hardware. The thesis therefore quantified hardware requirements and evaluated how design choices affected timing and resource usage.

## Signal processing under real-time constraints

In-cylinder pressure was the primary measurement. Before it can be used, the signal must be referenced, filtered, synchronized with crank angle, and combined with cylinder-volume information. Heat-release analysis then uses the pressure trace, volume trace, and thermodynamic assumptions to estimate combustion progress. In offline analysis this processing can be detailed and computationally intensive. In real-time control it must be simplified.

The thesis addressed this with implementation-oriented models. Cylinder volume estimation, for example, was improved with a model that accounts for thermal, pressure, and inertial deformation effects, while remaining simple enough for real-time execution. The same logic applied to heat capacity ratio estimation, start-of-combustion detection, pilot misfire detection, and pilot mass estimation.

These estimators form the virtual-sensing layer of the controller, and what each one estimates and how is covered in [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/). From the implementation side, each observer had to satisfy three requirements:

1. it had to use available sensor data,
2. it had to finish before its output was needed,
3. it had to fit within hardware resources.

A virtual sensor that works only after the cycle is complete may be useful for analysis, but it cannot support same-cycle control.

## Simplifying models without losing control value

Detailed combustion models describe physical processes more completely, but they are often too slow or too complex for in-cycle control. The controller does not need a perfect reconstruction of the combustion event. It needs the right information early enough to make a useful decision.

<div class="comparison-table" role="region" aria-label="Detailed offline model versus control-oriented model">
	<table>
		<thead>
			<tr>
				<th scope="col">Property</th>
				<th scope="col">Detailed offline model</th>
				<th scope="col">Control-oriented model</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Objective</th>
				<td>Physical fidelity</td>
				<td>Timely, actionable estimates</td>
			</tr>
			<tr>
				<th scope="row">Accuracy</th>
				<td>Reconstructs the full combustion event</td>
				<td>Accurate enough for the states the controller uses</td>
			</tr>
			<tr>
				<th scope="row">Computation</th>
				<td>Iterative, floating point, may use future samples</td>
				<td>Causal, fixed-point compatible, bounded per sample</td>
			</tr>
			<tr>
				<th scope="row">Availability</th>
				<td>After the cycle is complete</td>
				<td>Inside the crank-angle control window</td>
			</tr>
			<tr>
				<th scope="row">Hardware cost</th>
				<td>Not a design constraint</td>
				<td>Budgeted multipliers, memory, data-path width</td>
			</tr>
		</tbody>
	</table>
</div>

Pilot mass estimation is a concrete example. The thesis used a simplified dynamic model of the progression from injection to vaporization to premixed combustion, with rate constants parameterized by ignition delay. This reduced computational complexity while preserving the information needed for control. In embedded combustion control, the best model is not necessarily the most detailed one. It is the model that gives the controller enough information at the correct time with acceptable uncertainty and feasible hardware cost.

## Diagnostic logic in hardware

The thesis also implemented diagnostic decision logic for pilot misfire detection, so the controller could compensate with the remaining injection when the pilot failed to combust. The detection methods themselves, from deterministic thresholds to stochastic detection and sensor fusion, are covered in [stochastic fault detection and diagnostic decision logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/).

The implementation lesson is about cost. A simple threshold is computationally efficient and transparent. A stochastic detector represents uncertainty explicitly but requires probability models and additional computation. Sensor fusion improves robustness but adds calibration and implementation complexity. The most accurate detector is not always the best embedded detector if its additional complexity does not justify the marginal performance gain.

## Predictive control execution

The predictive controller used early combustion information to adjust the remaining injection command within the same cycle. The control strategy and the prediction models behind it are the subject of [predictive in-cycle combustion control](/writing/predictive-in-cycle-combustion-control/).

What this article adds is the execution side: the controller had to wait for enough pressure-derived information to estimate the pilot combustion state, but not so long that the main injection command became impossible to change. That sequence had to be synchronized with crank angle, and FPGA execution provided the deterministic timing that made it reliable at the required resolution.

## Online adaptation and implementation complexity

The thesis investigated online model adaptation to maintain prediction accuracy under changing operating conditions and fuel properties. Adaptation improves robustness, but each adapted parameter costs memory, update logic, calibration effort, and validation. If too many parameters are adapted independently, the controller becomes difficult to tune and may introduce undesirable transients.

To address this, the thesis proposed reduced multi-cylinder adaptation. Some model parameters were adapted per cylinder, while others were shared across cylinders. This reduced complexity while maintaining useful prediction performance. The goal is not to adapt every possible parameter. It is to adapt the parameters that provide the greatest robustness benefit for the lowest hardware and calibration cost.

## Modular controller architecture

One implementation outcome of the thesis was a modular controller structure coordinated by a finite-state machine.

The control system included measurement processing, virtual sensing, model-based prediction, adaptation, controller selection, actuator-output generation, and supervisory strategy coordination. The finite-state machine synchronized these modules and selected the active control mode depending on the current combustion and control state.

This was important because in-cycle control is conditional. The system must know whether pilot combustion is observable, whether the main injection is still controllable, whether a misfire has been detected, and whether compensation should be applied. If in-cycle control is not feasible, the system must avoid issuing corrections based on insufficient information or unavailable actuator authority.

The modular architecture also improved scalability and calibration. Individual functions could be developed and tested separately, then integrated into a coordinated control system.

<figure class="article-figure">
	<img src="/images/blog/real-time-combustion-control/thesis-closed-loop-diagram.svg" alt="Modular closed-loop feedback structure supervised by actuator, sensor, and controller finite-state machines" loading="lazy" />
	<figcaption>The finite-state machine coordinates measurement processing, virtual sensing, diagnostics, prediction, adaptation, control selection, and actuator output.</figcaption>
</figure>

## Quantifying hardware requirements

Real-time feasibility must be measured, not assumed. For FPGA deployment, this means quantifying timing, resource usage, numerical representation, and module scheduling on the actual target, in this case Xilinx Virtex-5 hardware. The questions are concrete:

* How much computation is required per 0.2 CAD sample?
* Which operations dominate FPGA resource usage?
* Can the algorithm be represented with fixed-point arithmetic?
* Which computations can be reused across cylinders?
* What timing margin remains before the actuator command must be issued?

By quantifying these constraints, the thesis connected control design with embedded implementation. The result was not only a controller that worked experimentally, but a clearer understanding of what limits real-time deployment.

<figure class="article-figure">
	<img src="/images/blog/real-time-combustion-control/thesis-hardware-requirements.svg" alt="FPGA hardware resource requirements for in-cycle closed-loop combustion control modules" loading="lazy" />
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

The implementation was validated under changing operating and fuel conditions. This matters because embedded combustion control cannot depend on a single carefully tuned operating point. Engine speed, load, injection timing, rail pressure, EGR ratio, temperature, and fuel properties all change the combustion response and the timing available for control.

The experiments showed that the modular design, online adaptation, and real-time estimation structure improved tracking performance and reduced transients across conditions and fuels. The implementation was not only fast enough, but robust enough to support practical combustion-control experiments.

## The takeaway

Real-time combustion control implementation is about making advanced combustion algorithms executable at the speed of the engine.

An offline estimator can use future samples, high-precision arithmetic, and complex computation. An in-cycle controller must act with incomplete information, deterministic timing, and finite hardware resources, inside a per-sample window of about 27 microseconds at 1200 RPM. FPGA implementation makes this possible, but only if the algorithms are simplified, synchronized, and structured for embedded execution from the beginning.

That is the contribution of this part of the thesis: it showed how combustion observers, virtual sensors, diagnostic methods, predictive controllers, and adaptation logic can be implemented as a real-time hardware-constrained control system. In practical terms, this is what turns combustion-control research into something that can intervene during the combustion cycle itself, rather than remaining a set of algorithms that only work offline. Related articles cover [stochastic set-point optimization for efficiency](/writing/stochastic-set-point-optimization-efficiency/) and the wider [combustion control research](/research/) context.

<figure class="article-figure">
	<img src="/images/blog/real-time-combustion-control/thesis-propagation-delay.svg" alt="Propagation delay of combustion-control modules implemented on Xilinx Virtex-5 FPGA hardware" loading="lazy" />
	<figcaption>Offline analysis can wait for complete data. In-cycle implementation has to decide with partial information, deterministic timing, and finite hardware resources.</figcaption>
</figure>

## Part of the series: In-Cycle Combustion Control

1. [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/) (the overview)
2. [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/)
3. [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/)
4. [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/)
5. [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/)
6. Real-Time Combustion Control Implementation (this article)

## Source articles

This article is based on my PhD thesis and the following thesis papers:

- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Modular Design and Integration of In-Cycle Closed-Loop Combustion Controllers for a Wide-Range of Operating Conditions," accepted for publication in *2021 American Control Conference (ACC)*, New Orleans, LA, USA, 2021.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Quantification of FPGA Requirements for Closed-Loop Combustion Control Implementation," submitted to *ICE2021, International Conference on Engines and Vehicles*, Capri, Italy, 2021.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Predictive In-Cycle Closed-Loop Combustion Control with Pilot-Main Injections," *IFAC-PapersOnLine*, 53(2):14000-14007, 2020.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, PhD thesis, Lund University, 2021. [Open-access PDF](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf).
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Cylinder pressure based virtual sensor for in-cycle pilot mass estimation," *Control Engineering Practice*, 122, 2022. [doi:10.1016/j.conengprac.2022.105097](https://doi.org/10.1016/j.conengprac.2022.105097).
- Dennis Vollberg et al., "Smart in-cylinder pressure sensor for closed-loop combustion control," *Journal of Sensors and Sensor Systems*, 11:1-13, 2022. [doi:10.5194/jsss-11-1-2022](https://doi.org/10.5194/jsss-11-1-2022). A view of the sensor hardware ecosystem moving toward production closed-loop combustion control.

<section class="article-cta" aria-labelledby="article-next-title">
	<h2 id="article-next-title">Need help turning control algorithms into real-time embedded systems?</h2>
	<p>I work on combustion control implementation, FPGA-oriented signal processing, virtual sensing, embedded diagnostics, predictive control, and hardware-constrained real-time decision logic.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about embedded control</a></li>
		<li><a href="/research/">Explore related research</a></li>
	</ul>
</section>
