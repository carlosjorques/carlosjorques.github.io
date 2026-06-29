---
title: Stochastic Fault Detection and Diagnostic Decision Logic
subtitle: Diagnosing combustion faults when the boundary is uncertain
description: How probabilistic diagnostic logic, adaptive thresholds, and sensor fusion improve real-time combustion fault detection under changing operating conditions.
publishDate: 2026-06-25
readingTime: 18 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion diagnostics
  - Stochastic detection
  - Misfire diagnosis
  - Adaptive thresholds
  - Sensor fusion
  - Diagnostic logic
featured: true
draft: false
heroImage:
  src: /images/blog/stochastic-fault-detection/hero-diagnostic-logic.svg
  alt: Combustion diagnostic visualization with pressure trace and probabilistic fault boundary
---

<!-- TODO: Replace placeholder hero image with a custom diagnostic decision illustration or thesis-derived figure if reuse is permitted. -->

<section class="article-callout" aria-labelledby="key-ideas-title">
	<h2 id="key-ideas-title">Key ideas</h2>
	<ul>
		<li>Combustion fault detection is a decision problem under uncertainty.</li>
		<li>Fixed thresholds can lose robustness when operating conditions change.</li>
		<li>Stochastic detectors estimate the probability of misfire from pressure-derived indicators.</li>
		<li>Adaptive thresholds improve robustness against drift, noise, and calibration mismatch.</li>
		<li>Sensor fusion can combine multiple diagnostic indicators when no single signal is sufficient.</li>
	</ul>
</section>

Combustion faults are not always clean, repeatable, or easy to classify. In a real engine, the difference between normal combustion and abnormal combustion can be blurred by noise, operating-condition changes, fuel variation, injector dispersion, and natural cycle-to-cycle variability.

That makes diagnostic logic difficult. A detector cannot simply ask whether a signal is high or low in an absolute sense. The same signal magnitude may indicate normal combustion at one operating point and a fault at another. A fixed threshold that works well during one test may become too sensitive, too conservative, or entirely misleading when the engine speed, injection timing, rail pressure, EGR rate, or fuel changes.

My PhD thesis, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, investigated this problem in the context of pilot-main diesel combustion. One part of the work focused on stochastic fault detection and diagnostic decision logic: methods for detecting abnormal combustion-system behavior using probability, sensor-derived indicators, adaptive thresholds, and sensor fusion.

The immediate target was pilot misfire diagnosis. The broader question was how to design a diagnostic decision system that remains robust when the combustion process itself is stochastic.

## Why deterministic fault detection is not enough

A simple diagnostic detector usually compares a measured quantity with a threshold. If the signal crosses the threshold, the system declares a fault. If it does not, the system declares normal operation.

For combustion diagnostics, this logic is attractive because it is simple, fast, and easy to implement. In the thesis, deterministic threshold-based detection was used as an important baseline. The detector compared pressure-derived combustion indicators with a calibrated threshold and classified each cycle as either pilot combustion or pilot misfire.

But the limitation is clear: the threshold is only as good as the conditions under which it was calibrated.

Pilot combustion is sensitive to operating conditions. Short pilot injections, early pilot timing, short pilot-main separation, increased pressure-signal noise, fuel changes, and low signal-to-noise ratio can all reduce the separability between normal pilot combustion and pilot misfire. In the transition region between reliable pilot combustion and frequent pilot misfire, the diagnostic boundary becomes especially uncertain.

This means that a combustion diagnostic system must handle uncertainty explicitly. It must not only decide whether a fault occurred. It must also account for the probability that the decision is wrong.

## Pilot misfire as a diagnostic problem

In pilot-main diesel combustion, the pilot injection is used to prepare the following main combustion event. A successful pilot combustion event can reduce ignition delay, shape the heat release profile, and influence combustion noise, efficiency, and emissions. A weak or missing pilot event can therefore disturb the main combustion.

For in-cycle control, pilot misfire diagnosis has a strict timing requirement. The detector must identify the misfire before the main start of injection if the controller is to compensate within the same cycle. A diagnosis that arrives after the main combustion is already underway may still be useful for monitoring, but it is too late for in-cycle corrective action.

This diagnostic timing problem connects directly to [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/): the controller needs early, control-relevant information, not only post-cycle analysis.

The thesis used in-cylinder pressure as the primary measurement for this task. From the pressure trace, several diagnostic indicators were evaluated:

- heat release rate,
- accumulated heat release,
- pressure rise over the estimated motoring pressure trace,
- and combinations of these indicators through sensor fusion.

Each indicator carries different information. Heat release rate is closely related to combustion activity, but it requires processing and can be sensitive to noise. Accumulated heat release can be more robust, but it may require more of the pilot combustion event to have occurred. Pressure rise over motoring pressure is simpler to compute because it avoids some of the processing required for heat release analysis.

The diagnostic challenge was to turn these indicators into a reliable decision before the main injection.

<section aria-labelledby="diagnostic-cycle-title">
	<h2 id="diagnostic-cycle-title">Diagnostic logic in one cycle</h2>
	<ol class="process-list">
		<li>
			<strong>Measure</strong>
			<span>Capture pressure-derived combustion indicators early in the cycle.</span>
		</li>
		<li>
			<strong>Estimate</strong>
			<span>Calculate probability of misfire or distance from the adaptive threshold.</span>
		</li>
		<li>
			<strong>Decide</strong>
			<span>Classify the cycle as pilot combustion or pilot misfire.</span>
		</li>
		<li>
			<strong>Act</strong>
			<span>Trigger compensation or update the diagnostic state for future cycles.</span>
		</li>
	</ol>
</section>

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a custom diagnostic decision flow or thesis-derived figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-fault-detection/diagnostic-decision-flow.svg" alt="Flow diagram of stochastic combustion fault detection and diagnostic decision logic" loading="lazy" />
	<figcaption>Pressure-derived indicators have to be converted into a diagnostic decision early enough to support compensation in the same cycle.</figcaption>
</figure>

## From thresholds to probability

The thesis investigated two main approaches to pilot misfire detection.

The first was deterministic detection. In this case, a diagnostic indicator is compared with a threshold. The decision rule is direct: one side of the threshold means combustion, and the other side means misfire.

The second was stochastic detection. Instead of asking only whether a signal crossed a threshold, the stochastic detector estimates the probability of misfire given the measured indicator. The diagnostic decision becomes:

> Declare misfire if the probability of misfire is greater than the probability of normal combustion.

This shift is important. It reframes combustion fault detection as a probabilistic classification problem. The detector does not treat the diagnostic boundary as a fixed line. It treats it as a decision under uncertainty.

The stochastic method used probability models for the relevant pressure-derived indicators. The posterior probability of misfire was modeled as a function of measured heat release, accumulated heat release, or pressure rise. Bayesian logic was then used to combine prior information about expected misfire behavior with the likelihood of the observed measurement.

This allowed the diagnostic threshold to vary with operating conditions instead of remaining fixed.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with custom probability distributions or a thesis-derived diagnostic boundary figure if reuse is permitted. -->
	<img src="/images/blog/stochastic-fault-detection/probability-threshold.svg" alt="Probability distributions for normal combustion and misfire with adaptive diagnostic threshold" loading="lazy" />
	<figcaption>When normal combustion and misfire distributions overlap, the diagnostic boundary becomes a probabilistic decision rather than a fixed signal value.</figcaption>
</figure>

## Adaptive thresholds

A fixed threshold can perform well when the engine operates close to the calibration condition. But combustion diagnostics must remain useful when conditions drift. The thesis therefore investigated online threshold adaptation.

The adaptive-threshold method updated the diagnostic threshold when the detector made an incorrect classification. The update used the distance between the measured indicator and the threshold as information about diagnostic robustness.

If the signal was close to the threshold, the diagnosis was uncertain. If the signal was far from the threshold, the diagnosis was more robust. The adaptation law used this distance to avoid making large threshold updates when the measurement was noisy or ambiguous.

This is a practical idea. In a real diagnostic system, every wrong decision should not cause an aggressive recalibration. Some errors happen because the signal is inherently uncertain. The threshold should adapt, but it should adapt cautiously when the evidence is weak.

The thesis showed that adaptive methods could significantly improve pilot misfire detection performance. The best adaptive threshold and stochastic methods achieved detection performance up to about 96% correct classification in real time.

## Sensor fusion for diagnostic logic

No single pressure-derived indicator is perfect.

Heat release rate may detect combustion activity early, but it is sensitive to pressure-processing errors and signal noise. Accumulated heat release can be more stable, but it may require more time. Pressure rise over motoring pressure is computationally simpler, but it may contain less combustion-specific information.

The thesis therefore investigated sensor fusion: combining multiple diagnostic indicators into one decision. In the stochastic detector, each indicator contributed a probability of misfire or normal combustion. The combined decision used weighted probabilities, where the weights could be adapted according to the past reliability of each indicator.

The idea was to prioritize indicators that were currently giving robust diagnostic information. If one indicator became unreliable under a certain operating condition, the fusion logic could reduce its influence. If another indicator became more reliable, its contribution could increase.

This is especially relevant for combustion systems because the quality of each signal changes with operating condition. A diagnostic indicator that works well at one pilot timing or rail pressure may become less useful when the pilot-main separation changes or when the pressure signal becomes noisier.

In the thesis, sensor fusion of adapted stochastic models provided an additional improvement in detection performance. However, the work also showed an important engineering trade-off: sensor fusion adds complexity, and its benefits must justify the additional calibration and implementation effort.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with a custom sensor-fusion illustration or thesis-derived diagnostic architecture if reuse is permitted. -->
	<img src="/images/blog/stochastic-fault-detection/sensor-fusion.svg" alt="Sensor fusion diagram combining pressure-derived combustion indicators for misfire diagnosis" loading="lazy" />
	<figcaption>Fusion logic can reduce reliance on a single indicator when signal quality shifts with operating condition.</figcaption>
</figure>

## Robustness under changing operating conditions

A major part of the research was not only to develop diagnostic methods, but to evaluate how robust they were when the operating conditions changed.

The pilot misfire detectors were tested across sweeps of pilot injection on-time, start of injection, rail pressure, engine speed, and EGR ratio. To further evaluate robustness, models calibrated for diesel were tested using HVO fuel. This created a deliberate mismatch between calibration and test conditions.

The results showed that operating conditions strongly affect pilot misfire observability. The theoretical maximum observability was about 98.83% correct detection when all indicators were combined. Individual indicators were slightly lower, around 98%. The most difficult region was the transition between pilot combustion and pilot misfire, where the diagnostic signal approached the noise level.

Early pilot injection reduced observability because the pilot combustion efficiency decreased. Short pilot-main separation also reduced observability because pilot combustion could overlap with the main injection. Higher engine speed reduced observability because pressure oscillations and measurement noise increased.

These results are important because they define the physical limit of diagnosis. Even a very good classifier cannot reliably detect a fault if the available measurement does not contain enough information to distinguish the cases.

<figure class="article-figure">
	<!-- TODO: Replace placeholder image with an operating-condition robustness map or thesis-derived performance summary if reuse is permitted. -->
	<img src="/images/blog/stochastic-fault-detection/robustness-map.svg" alt="Operating-condition robustness map for combustion fault detection performance" loading="lazy" />
	<figcaption>Robustness changes with timing, pressure, speed, EGR, fuel, and the physical observability of pilot combustion.</figcaption>
</figure>

## What the results showed

The baseline constant-threshold detector reached a maximum detection performance of about 92% when accumulated heat release was used as the diagnostic indicator. Heat release rate gave about 88%, and pressure rise gave about 82%.

Non-adaptive stochastic detectors improved on the constant-threshold approach in some cases, but their robustness depended strongly on the accuracy of the probability models and the match between calibration and operating conditions.

The adaptive methods were more robust. Both adaptive thresholds and adaptive stochastic detectors reached detection performance up to about 96%. The adapted stochastic models improved detection by about seven percentage points on average compared with constant-threshold detectors. Sensor fusion of the adapted stochastic models added a smaller but still measurable improvement of about half a percentage point on average.

The sensitivity analysis showed another important result. Non-adaptive detectors were highly sensitive to measurement errors. For example, an offset in heat release magnitude could reduce detection performance significantly. Adaptive detectors reduced this sensitivity because they could compensate for systematic measurement errors over several cycles.

The conclusion was not that the most complex detector is always best. The thesis found that an adaptive threshold based on heat release magnitude can provide a strong compromise between early detection, detection performance, and implementation simplicity. More complex adapted stochastic detectors with sensor fusion can be justified when maximum diagnostic performance is required.

<section class="metric-grid" aria-label="Selected quantitative results from the stochastic fault detection research">
	<div class="metric-card">
		<strong>Up to 92%</strong>
		<span>Constant threshold with accumulated heat release</span>
	</div>
	<div class="metric-card">
		<strong>About 88%</strong>
		<span>Heat release rate baseline</span>
	</div>
	<div class="metric-card">
		<strong>About 82%</strong>
		<span>Pressure rise baseline</span>
	</div>
	<div class="metric-card">
		<strong>Up to 96%</strong>
		<span>Adaptive detection</span>
	</div>
	<div class="metric-card">
		<strong>About 98.83%</strong>
		<span>Observability limit</span>
	</div>
	<div class="metric-card">
		<strong>About +7 pp</strong>
		<span>Adaptive stochastic improvement</span>
	</div>
	<div class="metric-card">
		<strong>About +0.5 pp</strong>
		<span>Sensor fusion improvement</span>
	</div>
</section>

## Diagnostic decision logic as part of control

The diagnostic methods were developed for more than fault reporting. They were designed to support in-cycle combustion control.

This changes the meaning of fault detection. In a conventional diagnostic system, detecting a misfire might be enough to log a fault, alert a supervisory system, or adapt a future operating strategy. In an in-cycle controller, the diagnostic decision must arrive early enough to change the current cycle.

The thesis used online pilot misfire diagnosis as feedback for compensation. When pilot misfire was detected, the controller could adjust the remaining injection strategy, including the use of a second pilot injection. This allowed the system to reduce the impact of the misfire on main combustion phasing and load.

In this context, diagnostic logic becomes part of the control architecture. It is not only an observer. It is a decision-making layer that determines whether the controller should trust the current combustion event, compensate for an abnormal event, or operate under constraints when observability is insufficient.

## The engineering trade-off

Stochastic fault detection offers a powerful framework, but it introduces design choices.

A deterministic threshold is simple, transparent, and computationally efficient. It is attractive for real-time implementation, especially on constrained hardware. But it may require careful calibration and may lose robustness when conditions change.

A stochastic detector represents uncertainty more explicitly. It can account for prior misfire probability, measurement likelihood, and operating-condition-dependent signal distributions. But it requires probability models, parameter calibration, and careful validation.

An adaptive detector improves robustness by learning from diagnostic errors online. But adaptation must be tuned carefully. Too little adaptation may not compensate drift. Too much adaptation may respond to noise and degrade performance.

Sensor fusion can improve the use of available information. But it adds complexity, especially when the reliability of each signal changes with operating conditions.

The thesis showed that diagnostic decision logic must balance all of these factors: accuracy, detection timing, robustness, calibration effort, computational complexity, and control usefulness.

<h2 id="comparison-title">Method comparison</h2>

<div class="comparison-table" role="region" aria-labelledby="comparison-title" tabindex="0">
	<table>
		<thead>
			<tr>
				<th scope="col">Method</th>
				<th scope="col">Strength</th>
				<th scope="col">Limitation</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Fixed threshold</th>
				<td>Simple, fast, transparent</td>
				<td>Sensitive to calibration and operating condition</td>
			</tr>
			<tr>
				<th scope="row">Stochastic detector</th>
				<td>Handles uncertainty explicitly</td>
				<td>Requires probability models</td>
			</tr>
			<tr>
				<th scope="row">Adaptive threshold</th>
				<td>Robust compromise</td>
				<td>Needs careful adaptation tuning</td>
			</tr>
			<tr>
				<th scope="row">Sensor fusion</th>
				<td>Combines complementary indicators</td>
				<td>Adds calibration and implementation complexity</td>
			</tr>
		</tbody>
	</table>
</div>

## What this work shows

The central lesson is that combustion fault detection is not only a signal-threshold problem. It is a decision problem under uncertainty.

In pilot-main diesel combustion, the boundary between normal pilot combustion and pilot misfire can shift with operating conditions and fuel properties. The diagnostic signal can be weak, noisy, or delayed. A robust detector therefore needs to account for probability, observability, and adaptation.

The research developed and evaluated diagnostic decision methods that combined pressure-derived indicators, deterministic thresholds, stochastic probability models, adaptive logic, and sensor fusion. These methods were tested under changing operating conditions and fuel mismatch to evaluate robustness.

The results showed that adaptive diagnostic logic can detect pilot misfire in real time with high accuracy, while also providing information early enough for in-cycle control.

## The takeaway

Stochastic fault detection for combustion systems is about making reliable decisions when the evidence is uncertain.

A combustion fault is not always obvious from a single signal. The engine may be operating near a transition region, the pressure trace may be noisy, the pilot combustion may be weak, or the fuel and operating conditions may differ from calibration. In those cases, the diagnostic system must reason probabilistically.

The contribution of this part of the thesis was to show how diagnostic logic can move beyond fixed thresholds. By combining stochastic detection, adaptive thresholds, pressure-derived indicators, and sensor fusion, the controller can diagnose abnormal combustion behavior more robustly and early enough to support corrective action.

In practical terms, this work helps turn combustion diagnostics from passive fault recognition into active decision support for real-time control.

<section class="article-cta" aria-labelledby="combustion-diagnostics-cta-title">
	<h2 id="combustion-diagnostics-cta-title">Need help turning diagnostic logic into a real-time control system?</h2>
	<p>I work on combustion control, model-based diagnostics, virtual sensing, and embedded decision logic for advanced powertrain systems.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about combustion diagnostics</a></li>
		<li><a href="/research/">Explore related research</a></li>
	</ul>
</section>
