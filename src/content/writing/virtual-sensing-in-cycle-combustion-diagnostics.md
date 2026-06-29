---
title: Virtual Sensing for In-Cycle Combustion Diagnostics
subtitle: Seeing combustion early enough to control it
description: How model-based virtual sensors estimate hidden combustion states early enough to support in-cycle closed-loop combustion control.
publishDate: 2026-06-25
readingTime: 14 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion control
  - Virtual sensing
  - Diesel engines
  - In-cycle diagnostics
  - Model-based estimation
featured: true
draft: false
heroImage:
  src: /images/blog/virtual-sensing/hero-combustion-diagnostics.svg
  alt: Stylized combustion chamber with pressure signal overlay representing virtual sensing for combustion diagnostics
---

<section class="article-callout" aria-labelledby="key-ideas-title">
	<h2 id="key-ideas-title">Key ideas</h2>
	<ul>
		<li>In-cycle control requires combustion information before the cycle is complete.</li>
		<li>Virtual sensors estimate hidden combustion states from available measurements.</li>
		<li>Pilot combustion strongly influences the following main combustion event.</li>
		<li>Real-time implementation requires simplified, computationally feasible models.</li>
		<li>Better observability enables reduced variation and improved efficiency.</li>
	</ul>
</section>

Modern combustion engines are no longer controlled only from one cycle to the next. In advanced diesel combustion systems, control can happen within the same engine cycle.

That sounds like a small timing distinction, but it changes the entire problem. Combustion evolves over only a few crank-angle degrees. By the time a conventional cycle-to-cycle controller observes the result, the opportunity to influence that same combustion event has already passed. In-cycle control asks a harder question: can the engine observe combustion while it is still developing, diagnose what is happening, and adjust a later injection before the cycle is over?

My PhD thesis, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, investigated this question for pilot-main diesel combustion. A central part of the work was the development of virtual sensors: model-based diagnostic methods that estimate important combustion quantities from available measurements, especially in-cylinder pressure.

The purpose was not merely to measure combustion more accurately. The purpose was to make combustion observable early enough to control it.

## Why virtual sensing is needed

In-cylinder pressure is one of the most informative measurements in combustion research. From it, heat release, start of combustion, combustion phasing, indicated work, and pressure-related constraints can be estimated. These quantities are fundamental for understanding efficiency, emissions, stability, and hardware limits.

However, direct sensing is not enough by itself. In-cycle control imposes strict timing constraints. The controller must know what is happening before the next relevant actuator event, such as the main injection. This is especially difficult in pilot-main combustion, where the pilot injection affects the main combustion timing and heat release shape.

The thesis showed that the pilot burnt mass has a significant influence on the following main combustion. Variations in the pilot combustion can shift the main start of combustion, alter the heat release profile, and affect both efficiency and emissions. If those pilot-combustion variations can be estimated before the main start of injection, the main injection can be adjusted in the same cycle to compensate.

That is the role of the virtual sensor.

A virtual sensor is not a replacement for physics. It is a structured way of combining measured signals, combustion models, uncertainty descriptions, and real-time computation to estimate a quantity that cannot be directly measured with sufficient timing or reliability.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a thesis-derived figure or custom illustration. -->
	<img src="/images/blog/virtual-sensing/in-cycle-control-architecture.svg" alt="Block diagram of in-cycle combustion control using virtual sensing" loading="lazy" />
	<figcaption>Cylinder pressure is converted into a combustion-state estimate quickly enough to influence the remaining injection strategy in the same engine cycle.</figcaption>
</figure>

## The in-cycle control architecture

The thesis followed a closed-loop architecture for in-cycle combustion control. The system used fast in-cylinder pressure measurements, synchronized with crank angle, to monitor combustion evolution. The measured pressure was processed in real time on FPGA hardware, enabling computation at the time scale required for in-cycle actuation.

The overall architecture contained several connected elements: measurement, estimation, model-based prediction, adaptation, control, actuator command, and strategy coordination.

The estimation layer was crucial. It supplied the feedback information used by the in-cycle regulators. In practice, this meant that diagnostic algorithms had to convert pressure-derived information into combustion states quickly enough to be useful.

The thesis focused on compression-ignition engines with pilot-main injection. The fuels investigated were conventional diesel and high-cetane biodiesel fuels. The actuator was a common-rail solenoid injector, where the fuel quantity was determined by rail pressure and injector energizing time.

## What the virtual sensors estimated

The thesis developed and evaluated several virtual sensing and diagnostic methods for in-cycle combustion control.

The first was cylinder volume estimation. During engine operation, the combustion chamber does not perfectly follow the ideal geometric volume. Thermal forces, pressure forces, and inertial forces deform components around the combustion chamber. These deviations affect heat release analysis. The thesis proposed a cylinder volume deviation model to improve the accuracy of heat release estimation, which then improved the basis for later diagnostic and control calculations.

The second was heat capacity ratio estimation. For pressure prediction during the cycle, the thesis found that estimating the current heat capacity ratio in-cycle could be more effective than relying only on tabulated gas-property polynomials. This estimate supported more accurate pressure prediction, although it required an initial crank-angle interval to form the first estimate.

The third was start-of-combustion detection. A fast online detection method was developed using prior knowledge from predictive ignition-delay models and measurement-noise models. The thesis reported real-time start-of-combustion detection accuracy within approximately +/-0.3 crank-angle degrees.

The fourth was pilot misfire detection. Pilot misfire is particularly important because a failed or weak pilot combustion event can strongly disturb the following main combustion. The thesis investigated deterministic and stochastic detection methods. The proposed methods could detect up to 96% of pilot misfires correctly in real time, with pilot-combustion observability limiting correct detection to about 98% of misfire cycles.

The fifth, and most central for the topic of virtual sensing, was pilot mass estimation.

<section class="metric-grid" aria-label="Selected quantitative results from the virtual sensing research">
	<div class="metric-card">
		<strong>+/-0.3 CAD</strong>
		<span>SOC detection accuracy</span>
	</div>
	<div class="metric-card">
		<strong>Up to 96%</strong>
		<span>Pilot misfire detection</span>
	</div>
	<div class="metric-card">
		<strong>+/-0.5 mg/stroke</strong>
		<span>Pilot mass estimate</span>
	</div>
	<div class="metric-card">
		<strong>60%</strong>
		<span>Initial uncertainty reduction</span>
	</div>
	<div class="metric-card">
		<strong>+/-0.8 to +/-0.2 bar</strong>
		<span>IMEP variation reduction</span>
	</div>
	<div class="metric-card">
		<strong>Up to +1.8 pp</strong>
		<span>Low-load efficiency gain</span>
	</div>
</section>

## Estimating pilot fuel mass before the main injection

The actual injected pilot mass varies from cycle to cycle. Fuel properties, rail-pressure oscillations, and injector uncertainties disturb the delivered fuel amount. For in-cycle compensation, the engine must estimate the pilot mass before the main start of injection.

A simple approach would be to wait until the pilot combustion is complete and then estimate fuel mass from accumulated heat release. That can work, but it leaves less time to adjust the main injection. The thesis therefore investigated a faster method based on pilot ignition delay and combustion rate.

The pilot mass virtual sensor used two main information sources.

The first was ignition delay. The ignition-delay model was extended to include pilot mass. By inverting this model, the pilot mass could be estimated from the observed timing between the pilot start of injection and the detected start of combustion. This estimate could be formed early, even before the full heat release event was complete.

The second was the heat release rate. The pilot heat release was modeled as a premixed combustion process using a simplified dynamic model suitable for FPGA implementation. The model represented the transition from injection to vaporization to premixed combustion, with rate constants parameterized using the pilot ignition delay.

The thesis showed that the most significant information for inferring pilot mass is available around the peak of the heat release. At that point, the pilot mass virtual sensor could estimate the pilot mass with an accuracy of about +/-0.5 mg per stroke. As more information became available later in the cycle, the estimate could be refined to approximately +/-0.45 mg per stroke.

This is the key diagnostic insight: the controller does not need to wait for a complete post-cycle analysis. It can extract enough information during the cycle to support actuation.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a thesis-derived heat-release trace or custom technical illustration. -->
	<img src="/images/blog/virtual-sensing/heat-release-control-window.svg" alt="Annotated heat release trace showing the control window between pilot combustion and main injection" loading="lazy" />
	<figcaption>The useful control window is narrow: the estimate has to form after early pilot-combustion evidence appears and before the next relevant injection command.</figcaption>
</figure>

## Handling short pilot injections and misfire

Short pilot injections are difficult to estimate. The signal-to-noise ratio in both rail pressure and heat release becomes low, and combustion efficiency becomes more uncertain. In this region, estimation based only on heat release or nominal injector maps can become unreliable.

The thesis therefore introduced a Bayesian estimation approach based on pilot misfire ratio. The motivation was empirical: the pilot misfire ratio correlated more strongly with actual pilot mass than the nominal injector on-time did. The thesis reported a correlation of 0.8979 between pilot misfire ratio and pilot mass, compared with 0.6957 between nominal injection on-time and pilot mass.

Using the pilot misfire ratio, the Bayesian estimator reduced the uncertainty of the initial pilot mass estimate by 60%, from +/-1.32 mg per stroke to +/-0.54 mg per stroke.

This is a good example of virtual sensing as more than signal processing. The estimator used combustion behavior, probability, and prior information to improve the estimate where direct physical inference was weakest.

## From diagnostics to control

The virtual sensors were not developed as isolated observers. They were designed to feed in-cycle closed-loop combustion controllers.

The thesis showed that predictive in-cycle control could reduce stochastic cyclic variations in important combustion metrics. Compared with open-loop operation, the in-cycle controller reduced pilot start-of-combustion variation from about +/-1 crank-angle degree to +/-0.4 crank-angle degrees. Burnt pilot mass variation was reduced from about +/-1.5 mg to +/-0.6 mg. Main start-of-combustion variation was reduced from about +/-0.4 to +/-0.3 crank-angle degrees, and engine load variation, measured by IMEP, was reduced from about +/-0.8 bar to +/-0.2 bar.

The benefits were strongest at lower loads, where intake-condition variation and pilot-combustion variability were larger. At higher loads, combustion was naturally more robust, so the improvement from in-cycle control was smaller.

The thesis also investigated pilot misfire compensation. When pilot misfire was detected in-cycle, the controller could compensate using a second pilot injection. With this strategy, the main start-of-combustion error was reduced from +1.5 +/- 0.6 crank-angle degrees to 0 +/- 0.4 crank-angle degrees. The load error was reduced from -0.5 +/- 0.4 bar IMEP to 0 +/- 0.2 bar IMEP.

This demonstrates the practical value of virtual sensing. The diagnostic estimate becomes actionable: detect the combustion fault early, then alter the remaining injection strategy before the cycle is complete.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a thesis-derived result plot or custom before/after illustration. -->
	<img src="/images/blog/virtual-sensing/variation-reduction.svg" alt="Before and after illustration of reduced cyclic combustion variation with in-cycle control" loading="lazy" />
	<figcaption>Reducing cyclic variation makes the combustion process more predictable, which creates room to optimize the operating point under real constraints.</figcaption>
</figure>

## Efficiency optimization

The thesis also connected in-cycle diagnostics to efficiency optimization.

A direct in-cycle optimization method was developed to maximize indicated efficiency under operational uncertainty. Experimentally, this method increased indicated efficiency by +0.42 percentage points. Its effectiveness was limited by the linearization used in the controller.

An indirect method then used the reduction in cyclic variation to optimize the combustion set-point under constraints such as maximum pressure, maximum pressure rise rate, exhaust temperature, hardware limits, and emissions-related limits. By embedding the reduced dispersion achieved through in-cycle control into the stochastic optimization, closed-loop control of CA50 increased indicated efficiency by +0.6 percentage points at medium load and up to +1.8 percentage points at low load.

The link is important: virtual sensing improves observability, observability enables in-cycle control, and in-cycle control reduces variability. Once variability is reduced, the engine can be operated closer to its optimal set-point while still respecting constraints.

## Real-time implementation matters

A recurring theme in the thesis is that an estimator is only useful for in-cycle control if it can run in real time.

The control and estimation algorithms were implemented on FPGA hardware. This imposed strict limits on computational complexity. For that reason, the thesis emphasized simplified models, online adaptation, modular controller design, and careful quantification of hardware requirements.

This matters because many combustion models are accurate but too slow or too complex for in-cycle use. The thesis approached virtual sensing as a control implementation problem, not only a modeling problem. The estimators had to be accurate enough, early enough, and computationally feasible.

The thesis also showed that online model adaptation can improve prediction accuracy, but it must be calibrated carefully. Over-parameterization can introduce transients or even destabilize the system. A reduced multi-cylinder adaptation method was therefore investigated, where some parameters were adapted per cylinder and others were shared across cylinders. This reduced implementation complexity while improving robustness.

## What this work shows

The central lesson is that in-cycle combustion diagnostics require more than measuring pressure. They require the conversion of pressure information into timely, control-relevant states.

In the thesis, virtual sensors provided that conversion. They estimated cylinder volume deviations, heat capacity ratio, start of combustion, pilot misfire, and pilot mass. These estimates allowed the controller to understand pilot combustion early enough to adjust the main injection or trigger compensation strategies in the same cycle.

The result was a combustion-control framework that could reduce cyclic variation, compensate pilot misfire, improve tracking performance, shorten transients, and support efficiency optimization.

## The takeaway

Virtual sensing for in-cycle combustion diagnostics is about making hidden combustion information available at the moment when it still matters.

In pilot-main diesel combustion, the pilot event shapes the main event. If the pilot combustion is weak, delayed, stronger than expected, or missing entirely, the main combustion will change. A conventional controller may only observe that after the fact. An in-cycle virtual sensor can diagnose it while there is still time to act.

That is the contribution of this part of the thesis: it showed how model-based virtual sensors, built from in-cylinder pressure measurements and real-time combustion models, can provide early diagnostic feedback for in-cycle closed-loop combustion control.

In practical terms, the work moves combustion control from post-cycle correction toward real-time intervention. It gives the engine a way to see inside the cylinder, interpret what is happening, and respond before the cycle is over.

<section class="article-cta" aria-labelledby="article-next-title">
	<h2 id="article-next-title">Continue from here</h2>
	<p>For related public context, explore the research and work pages, or get in touch about combustion control, virtual sensing, or model-based diagnostics.</p>
	<ul class="article-cta__links">
		<li><a href="/research/">Read more about the research context</a></li>
		<li><a href="/work/">Explore related work</a></li>
		<li><a href="/contact/">Contact me about model-based diagnostics</a></li>
	</ul>
</section>
