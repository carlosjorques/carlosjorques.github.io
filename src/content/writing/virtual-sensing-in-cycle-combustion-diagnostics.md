---
title: Virtual Sensing for In-Cycle Combustion Diagnostics
subtitle: Seeing combustion early enough to control it
description: How model-based virtual sensors estimate hidden combustion states early enough to support in-cycle closed-loop combustion control.
publishDate: 2026-06-25
updatedDate: 2026-07-07
readingTime: 12 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion control
  - Virtual sensing
  - Diesel engines
  - In-cycle diagnostics
  - Model-based estimation
featured: true
draft: true
heroImage:
  src: /images/blog/virtual-sensing/thesis-pilot-mass-estimation.svg
  alt: Thesis plot comparing actual injected pilot mass with in-cycle pilot mass estimation
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

Modern combustion engines are no longer controlled only from one cycle to the next. In advanced diesel combustion systems, control can happen within the same engine cycle. That sounds like a small timing distinction, but it changes the entire problem. Combustion evolves over only a few crank-angle degrees, and by the time a conventional cycle-to-cycle controller observes the result, the opportunity to influence that combustion event has passed. In-cycle control asks a harder question: can the engine observe combustion while it is still developing, and adjust a later injection before the cycle is over?

This article is part of the series on my PhD research introduced in [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/). Here I cover the first link in that chain: making combustion observable inside the cycle, through virtual sensors that estimate important combustion quantities from available measurements, especially in-cylinder pressure. Without that observability, nothing else in the series is possible.

## Why virtual sensing is needed

In-cylinder pressure is one of the most informative measurements in combustion research. From it, heat release, start of combustion, combustion phasing, indicated work, and pressure-related constraints can be estimated. These quantities are fundamental for understanding efficiency, emissions, stability, and hardware limits.

Direct sensing is not enough by itself, though, because in-cycle control imposes strict timing constraints: the controller must know what is happening before the next relevant actuator event, such as the main injection. This is especially demanding in pilot-main combustion. The thesis showed that the pilot burnt mass has a significant influence on the following main combustion: variations in the pilot event can shift the main start of combustion, alter the heat release profile, and affect both efficiency and emissions. If those variations can be estimated before the main start of injection, the main injection can be adjusted in the same cycle to compensate.

That is the role of the virtual sensor. It is not a replacement for physics. It is a structured way of combining measured signals, combustion models, uncertainty descriptions, and real-time computation to estimate a quantity that cannot be directly measured with sufficient timing or reliability.

<figure class="article-figure">
	<img src="/images/blog/predictive-in-cycle-control/thesis-cl-structure.svg" alt="Closed-loop architecture for in-cycle combustion control with in-cycle blocks highlighted" loading="lazy" />
	<figcaption>Thesis architecture for in-cycle combustion control. The observer converts pressure feedback into control-relevant estimates before the remaining injection command is finalized.</figcaption>
</figure>

## The in-cycle control architecture

The thesis followed a closed-loop architecture built around fast in-cylinder pressure measurements, synchronized with crank angle and processed in real time on FPGA hardware. The estimation layer was crucial: it supplied the feedback used by the in-cycle regulators, which meant the diagnostic algorithms had to convert pressure-derived information into combustion states quickly enough to be useful.

The work focused on compression-ignition engines with pilot-main injection, running conventional diesel and high-cetane biodiesel fuels. The actuator was a common-rail solenoid injector, where the fuel quantity was determined by rail pressure and injector energizing time.

## What the virtual sensors estimated

The thesis developed and evaluated five virtual sensing and diagnostic methods.

The first was cylinder volume estimation. During operation, thermal, pressure, and inertial forces deform components around the combustion chamber, so the actual volume deviates from the ideal geometric trace. The thesis proposed a cylinder volume deviation model that improved the accuracy of heat release estimation, and with it the basis for later diagnostic and control calculations.

The second was heat capacity ratio estimation. For pressure prediction during the cycle, estimating the current heat capacity ratio in-cycle proved more effective than relying only on tabulated gas-property polynomials, although it required an initial crank-angle interval to form the first estimate.

The third was start-of-combustion detection. A fast online detection method was developed using prior knowledge from predictive ignition-delay models and measurement-noise models, reaching real-time accuracy within approximately +/-0.3 crank-angle degrees.

The fourth was pilot misfire detection. A failed or weak pilot combustion event can strongly disturb the following main combustion. The thesis investigated deterministic and stochastic detection methods; the decision logic behind them is the subject of [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/). The proposed methods detected up to 96% of pilot misfires correctly in real time, with pilot-combustion observability limiting correct detection to about 98% of misfire cycles.

The fifth, and most central for the topic of virtual sensing, was pilot mass estimation.

<section class="metric-grid" aria-label="Selected quantitative results from the virtual sensing research">
	<div class="metric-card">
		<strong>+/-0.3 CAD</strong>
		<span>SOC detection, real time (vs post-cycle analysis only)</span>
	</div>
	<div class="metric-card">
		<strong>Up to 96%</strong>
		<span>Pilot misfires detected in-cycle (98% observable)</span>
	</div>
	<div class="metric-card">
		<strong>+/-0.5 mg/stroke</strong>
		<span>Pilot mass estimate, before main injection</span>
	</div>
	<div class="metric-card">
		<strong>+/-1.32 to +/-0.54 mg</strong>
		<span>Initial pilot mass uncertainty, without vs with Bayesian estimator</span>
	</div>
	<div class="metric-card">
		<strong>+/-0.8 to +/-0.2 bar</strong>
		<span>IMEP variation, open loop vs in-cycle control</span>
	</div>
	<div class="metric-card">
		<strong>Up to +1.8 pp</strong>
		<span>Low-load indicated efficiency gain</span>
	</div>
</section>

## Estimating pilot fuel mass before the main injection

The actual injected pilot mass varies from cycle to cycle. Fuel properties, rail-pressure oscillations, and injector uncertainties disturb the delivered fuel amount, and no physical sensor reports the injected mass directly. For in-cycle compensation, the engine must estimate the pilot mass before the main start of injection.

The pilot mass virtual sensor used two main information sources.

The first was ignition delay. The ignition-delay model was extended to include pilot mass, so that by inverting it, the pilot mass could be estimated from the observed timing between the pilot start of injection and the detected start of combustion. This estimate could be formed early, even before the full heat release event was complete.

The second was the heat release rate. The pilot heat release was modeled as a premixed combustion process using a simplified dynamic model suitable for FPGA implementation, representing the transition from injection to vaporization to premixed combustion, with rate constants parameterized by the pilot ignition delay.

The thesis showed that the most significant information for inferring pilot mass is available around the peak of the heat release. The timing difference against a conventional approach is the whole point:

| Approach | When the estimate is available | Accuracy |
| --- | --- | --- |
| Post-cycle heat release analysis | After pilot combustion is complete, little time left to act | Refined estimate, approx. +/-0.45 mg/stroke |
| In-cycle virtual sensor | Around the pilot heat release peak, before the main injection | Approx. +/-0.5 mg/stroke |

The controller gives up almost nothing in accuracy, and gains the time to act within the same cycle.

<figure class="article-figure">
	<img src="/images/blog/virtual-sensing/thesis-pilot-heat-release.svg" alt="Pilot heat release trace used to analyze early combustion information" loading="lazy" />
	<figcaption>The useful control window is narrow: the estimate has to form after early pilot-combustion evidence appears and before the next relevant injection command.</figcaption>
</figure>

## Handling short pilot injections and misfire

Short pilot injections are difficult to estimate. The signal-to-noise ratio in both rail pressure and heat release becomes low, and combustion efficiency becomes more uncertain. In this region, estimation based only on heat release or nominal injector maps can become unreliable.

The thesis therefore introduced a Bayesian estimation approach based on pilot misfire ratio. The motivation was empirical: the pilot misfire ratio carried more information about the actual pilot mass than the nominal injector command did.

| Estimation basis | Correlation with actual pilot mass | Initial estimate uncertainty |
| --- | --- | --- |
| Nominal injection on-time | 0.6957 | +/-1.32 mg/stroke |
| Pilot misfire ratio (Bayesian estimator) | 0.8979 | +/-0.54 mg/stroke |

That is a 60% reduction in initial uncertainty, obtained not from a better sensor but from combustion behavior, probability, and prior information, exactly where direct physical inference was weakest.

## From diagnostics to control

The virtual sensors were designed to feed in-cycle closed-loop combustion controllers. Fed by these estimates, [predictive in-cycle control](/writing/predictive-in-cycle-combustion-control/) roughly halved the stochastic cyclic variation of the key combustion metrics compared with open-loop operation, and detected pilot misfires were compensated with a second pilot injection within the same cycle, removing the timing and load errors they would otherwise cause. The full numbers belong to that article.

The benefits were strongest at lower loads, where intake-condition variation and pilot-combustion variability were larger. At higher loads, combustion was naturally more robust, so the improvement from in-cycle control was smaller.

<figure class="article-figure">
	<img src="/images/blog/virtual-sensing/thesis-pilot-mass-sweep.svg" alt="Pilot mass estimation accuracy across pilot injection durations" loading="lazy" />
	<figcaption>The thesis validated pilot-mass estimation over repeated cycles and injection-duration sweeps, showing where pressure-based observability is strong enough for in-cycle use.</figcaption>
</figure>

## Efficiency optimization

The thesis also connected in-cycle diagnostics to efficiency. Once in-cycle control had reduced cyclic dispersion, that reduced dispersion could be embedded into a constrained stochastic optimization of the combustion set-point: the engine could run closer to its optimal set-point while still respecting constraints. Indicated efficiency improved by up to +1.8 percentage points at low load; the methods and full results are covered in [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/).

## Real-time implementation matters

A recurring theme in the thesis is that an estimator is only useful for in-cycle control if it can run in real time. The control and estimation algorithms were implemented on FPGA hardware, which imposed strict limits on computational complexity, so the estimators had to be accurate enough, early enough, and computationally feasible. Online model adaptation could improve prediction accuracy but had to be calibrated carefully, which motivated a reduced multi-cylinder adaptation method that shared some parameters across cylinders. The simplified models, the arithmetic, the modular architecture, and the hardware budgets are the subject of [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/).

## The takeaway

Virtual sensing for in-cycle combustion diagnostics is about making hidden combustion information available at the moment when it still matters. In the thesis, virtual sensors estimated cylinder volume deviations, heat capacity ratio, start of combustion, pilot misfire, and pilot mass, and those estimates let the controller understand pilot combustion early enough to adjust the main injection or trigger compensation in the same cycle. A conventional controller only observes a weak, delayed, or missing pilot after the fact; an in-cycle virtual sensor diagnoses it while there is still time to act.

The approach has also been picked up in later research: [Barbier's thesis on pressure-based dual-fuel combustion control](https://doi.org/10.4995/thesis/10251/183274) builds on this virtual-sensing work, and [Vollberg and colleagues](https://doi.org/10.5194/jsss-11-1-2022) have pursued the production-oriented in-cylinder pressure sensors that would make it deployable at scale.

Where combustion control once meant correcting after the fact, this work lets the correction begin while the fuel is still burning. It gives the engine a way to see inside the cylinder, interpret what is happening, and respond before the cycle is over.

## Part of the series: In-Cycle Combustion Control

1. [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/) (the overview)
2. Virtual Sensing for In-Cycle Combustion Diagnostics (this article)
3. [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/)
4. [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/)
5. [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/)
6. [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/)

## Source articles

This article is based on my PhD thesis and the following thesis papers:

- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Cylinder Pressure-Based Virtual Sensor for In-Cycle Pilot Mass Estimation," *SAE International Journal of Engines*, 11(6):1167-1182, 2018.
- Ian West, Carlos Jorques Moreno, Ola Stenlaas, Oskar Jonsson, and Frank Haslestad, "Internal Combustion Engine Cylinder Volume Trace Deviation," *SAE International Journal of Engines*, 11(2):195-214, 2018.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Bayesian Method for Fuel Mass Estimation of Short Pilot Injections based on its Misfire Probability," *2020 American Control Conference (ACC)*, Denver, CO, USA, 2020, pp. 1507-1513.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, PhD thesis, Lund University, 2021. [Full thesis PDF, Lund University](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf).
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Indicated efficiency optimization by in-cycle closed-loop combustion control of diesel engines," *Control Engineering Practice*, 122, 2022. [doi.org/10.1016/j.conengprac.2022.105097](https://doi.org/10.1016/j.conengprac.2022.105097).
- Dennis Vollberg et al., "Smart in-cylinder pressure sensor for closed-loop combustion control," *Journal of Sensors and Sensor Systems*, 11, 2022. [doi.org/10.5194/jsss-11-1-2022](https://doi.org/10.5194/jsss-11-1-2022). Independent work on production-oriented pressure sensors.
- Alvaro Barbier, *In-Cylinder Pressure-Based Control of Premixed Dual-Fuel Combustion*, PhD thesis, Universitat Politecnica de Valencia, 2022. [doi.org/10.4995/thesis/10251/183274](https://doi.org/10.4995/thesis/10251/183274). Cites this virtual-sensing work.

<section class="article-cta" aria-labelledby="article-next-title">
	<h2 id="article-next-title">Continue from here</h2>
	<p>For related public context, explore the research and work pages, or get in touch about combustion control, virtual sensing, or model-based diagnostics.</p>
	<ul class="article-cta__links">
		<li><a href="/research/">Read more about the research context</a></li>
		<li><a href="/work/">Explore related work</a></li>
		<li><a href="/contact/">Contact me about model-based diagnostics</a></li>
	</ul>
</section>
