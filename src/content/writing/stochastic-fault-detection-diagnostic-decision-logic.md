---
title: Stochastic Fault Detection and Diagnostic Decision Logic
subtitle: Diagnosing combustion faults when the boundary is uncertain
description: How probabilistic diagnostic logic, adaptive thresholds, and sensor fusion improve real-time combustion fault detection under changing operating conditions.
publishDate: 2026-06-25
updatedDate: 2026-07-07
readingTime: 12 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion diagnostics
  - Stochastic detection
  - Misfire diagnosis
  - Adaptive thresholds
  - Sensor fusion
  - Diagnostic logic
featured: true
draft: true
heroImage:
  src: /images/blog/stochastic-fault-detection/thesis-detection-performance.svg
  alt: Thesis plot summarizing pilot misfire detection performance under changing conditions
---

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

Combustion faults are not always clean, repeatable, or easy to classify. In a real engine, the difference between normal combustion and abnormal combustion can be blurred by noise, operating-condition changes, fuel variation, injector dispersion, and natural cycle-to-cycle variability. A detector cannot simply ask whether a signal is high or low in an absolute sense, because the same signal magnitude may indicate normal combustion at one operating point and a fault at another.

This article is part of the series introduced in [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/), where the motivation and full context of my PhD research live. Its role in the chain is the decision layer: turning uncertain combustion measurements into reliable real-time decisions, using probability, sensor-derived indicators, adaptive thresholds, and sensor fusion.

The immediate target was pilot misfire diagnosis. The broader question was how to design a diagnostic decision system that remains robust when the combustion process itself is stochastic.

## Why deterministic fault detection is not enough

A simple diagnostic detector compares a measured quantity with a threshold. If the signal crosses the threshold, the system declares a fault. If it does not, the system declares normal operation.

For combustion diagnostics, this logic is attractive because it is simple, fast, and easy to implement. In the thesis, deterministic threshold-based detection was used as an important baseline. The detector compared pressure-derived combustion indicators with a calibrated threshold and classified each cycle as either pilot combustion or pilot misfire.

But the threshold is only as good as the conditions under which it was calibrated. Pilot combustion is sensitive to operating conditions. Short pilot injections, early pilot timing, short pilot-main separation, increased pressure-signal noise, fuel changes, and low signal-to-noise ratio can all reduce the separability between normal pilot combustion and pilot misfire. A threshold that works well during one test may become too sensitive, too conservative, or entirely misleading when engine speed, injection timing, rail pressure, EGR rate, or fuel changes. In the transition region between reliable pilot combustion and frequent pilot misfire, the diagnostic boundary becomes especially uncertain.

This means that a combustion diagnostic system must handle uncertainty explicitly. It must not only decide whether a fault occurred. It must also account for the probability that the decision is wrong.

## Pilot misfire as a diagnostic problem

In pilot-main diesel combustion, the pilot injection prepares the following main combustion event. A successful pilot combustion event can reduce ignition delay, shape the heat release profile, and influence combustion noise, efficiency, and emissions. A weak or missing pilot event can therefore disturb the main combustion.

For in-cycle control, pilot misfire diagnosis has a strict timing requirement. The detector must identify the misfire before the main start of injection if the controller is to [compensate within the same cycle](/writing/predictive-in-cycle-combustion-control/). A diagnosis that arrives after the main combustion is already underway may still be useful for monitoring, but it is too late for in-cycle corrective action. This connects directly to [virtual sensing for in-cycle combustion diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/): the controller needs early, control-relevant information, not only post-cycle analysis.

The thesis used in-cylinder pressure as the primary measurement. From the pressure trace, several diagnostic indicators were evaluated:

- heat release rate,
- accumulated heat release,
- pressure rise over the estimated motoring pressure trace,
- and combinations of these indicators through sensor fusion.

The diagnostic challenge was to turn these indicators into a reliable decision before the main injection.

## Diagnostic logic in one cycle

<section>
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
	<img src="/images/blog/stochastic-fault-detection/thesis-misfire-estimation-algorithm.svg" alt="Algorithm diagram for estimating pilot mass from pilot misfire probability" loading="lazy" />
	<figcaption>The thesis used diagnostic decisions as inputs to estimation and control logic, not only as post-cycle fault labels.</figcaption>
</figure>

## From thresholds to probability

The thesis investigated two main approaches to pilot misfire detection.

The first was deterministic detection: a diagnostic indicator is compared with a threshold, and one side means combustion, the other misfire.

The second was stochastic detection. Instead of asking only whether a signal crossed a threshold, the stochastic detector estimates the probability of misfire given the measured indicator. The diagnostic decision becomes:

> Declare misfire if the probability of misfire is greater than the probability of normal combustion.

This shift is important. It reframes combustion fault detection as a probabilistic classification problem. The detector does not treat the diagnostic boundary as a fixed line. It treats it as a decision under uncertainty.

The stochastic method used probability models for the relevant pressure-derived indicators. The posterior probability of misfire was modeled as a function of measured heat release, accumulated heat release, or pressure rise. Bayesian logic was then used to combine prior information about expected misfire behavior with the likelihood of the observed measurement. This allowed the diagnostic threshold to vary with operating conditions instead of remaining fixed.

<figure class="article-figure">
	<img src="/images/blog/stochastic-fault-detection/thesis-binary-symmetric-channel.svg" alt="Binary symmetric channel model for pilot misfire detector accuracy" loading="lazy" />
	<figcaption>When diagnosis is uncertain, detector accuracy becomes part of the estimation problem. The thesis modeled misfire detection as a probabilistic channel.</figcaption>
</figure>

## Adaptive thresholds under changing conditions

The thesis also investigated online threshold adaptation. The adaptive-threshold method updated the diagnostic threshold when the detector made an incorrect classification, using the distance between the measured indicator and the threshold as information about diagnostic robustness. If the signal was close to the threshold, the diagnosis was uncertain. If it was far from the threshold, the diagnosis was more robust. The adaptation law used this distance to avoid making large threshold updates when the measurement was noisy or ambiguous.

This is a practical idea. In a real diagnostic system, every wrong decision should not cause an aggressive recalibration. Some errors happen because the signal is inherently uncertain. The threshold should adapt, but it should adapt cautiously when the evidence is weak.

Robustness was evaluated deliberately, not assumed. The pilot misfire detectors were tested across sweeps of pilot injection on-time, start of injection, rail pressure, engine speed, and EGR ratio. To push further, models calibrated for diesel were tested using HVO fuel, creating an intentional mismatch between calibration and test conditions.

The results showed that operating conditions strongly affect pilot misfire observability. The theoretical maximum was about 98.83% correct detection when all indicators were combined, with individual indicators slightly lower at around 98%. The most difficult region was the transition between pilot combustion and pilot misfire, where the diagnostic signal approached the noise level. Early pilot injection, short pilot-main separation, and higher engine speed all reduced observability.

These results define the physical limit of diagnosis. Even a very good classifier cannot reliably detect a fault if the available measurement does not contain enough information to distinguish the cases.

<figure class="article-figure">
	<img src="/images/blog/stochastic-fault-detection/thesis-pilot-misfire-probability.svg" alt="Pilot misfire probability as a function of pilot injection conditions" loading="lazy" />
	<figcaption>Robustness changes with timing, pressure, speed, EGR, fuel, and the physical observability of pilot combustion.</figcaption>
</figure>

## Sensor fusion for diagnostic logic

No single pressure-derived indicator is perfect. Heat release rate may detect combustion activity early, but it is sensitive to pressure-processing errors and signal noise. Accumulated heat release can be more stable, but it may require more time. Pressure rise over motoring pressure is computationally simpler, but it may contain less combustion-specific information.

The thesis therefore investigated sensor fusion: combining multiple diagnostic indicators into one decision. In the stochastic detector, each indicator contributed a probability of misfire or normal combustion. The combined decision used weighted probabilities, where the weights could be adapted according to the past reliability of each indicator. If one indicator became unreliable under a certain operating condition, the fusion logic could reduce its influence. If another became more reliable, its contribution could increase.

<figure class="article-figure">
	<img src="/images/blog/stochastic-fault-detection/thesis-detection-performance.svg" alt="Pilot misfire detection performance for different detection methods" loading="lazy" />
	<figcaption>Comparing detector families made the implementation trade-off explicit: higher diagnostic performance has to justify extra calibration and computational complexity.</figcaption>
</figure>

## Method comparison

The methods are best read side by side. Each step up the ladder buys detection performance and robustness, and each step costs calibration and implementation effort. A deterministic threshold is attractive for [real-time implementation](/writing/real-time-combustion-control-implementation/) on constrained hardware; the more complex detectors have to earn their place.

<div class="comparison-table" role="region" tabindex="0">
	<table>
		<thead>
			<tr>
				<th scope="col">Method</th>
				<th scope="col">Detection performance</th>
				<th scope="col">Robustness</th>
				<th scope="col">Where it fails</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Fixed threshold</th>
				<td>Up to about 92% with accumulated heat release; about 88% with heat release rate; about 82% with pressure rise</td>
				<td>Good near the calibration condition; simple, fast, transparent</td>
				<td>Degrades when operating conditions drift; highly sensitive to measurement errors such as heat release offsets</td>
			</tr>
			<tr>
				<th scope="row">Non-adaptive stochastic detector</th>
				<td>Improved on the fixed threshold in some cases</td>
				<td>Handles uncertainty explicitly through probability models</td>
				<td>Depends strongly on model accuracy and the match between calibration and operating conditions</td>
			</tr>
			<tr>
				<th scope="row">Adaptive threshold and adaptive stochastic detectors</th>
				<td>Up to about 96%; adapted stochastic models gained about 7 percentage points on average over constant thresholds</td>
				<td>Compensates drift and systematic measurement errors over several cycles</td>
				<td>Adaptation must be tuned: too little fails to compensate drift, too much responds to noise</td>
			</tr>
			<tr>
				<th scope="row">Sensor fusion of adapted stochastic models</th>
				<td>A further gain of about half a percentage point on average, approaching the roughly 98% observability ceiling (98.83% with all indicators combined)</td>
				<td>Down-weights indicators that become unreliable at a given operating condition</td>
				<td>Adds calibration and implementation complexity that must justify the marginal gain</td>
			</tr>
		</tbody>
	</table>
</div>

The conclusion was not that the most complex detector is always best. An adaptive threshold based on heat release magnitude provides a strong compromise between early detection, detection performance, and implementation simplicity. Adapted stochastic detectors with sensor fusion are justified when maximum diagnostic performance is required.

## Diagnostic decision logic as part of control

The diagnostic methods were developed for more than fault reporting. In a conventional diagnostic system, detecting a misfire might be enough to log a fault, alert a supervisory system, or adapt a future operating strategy. Here, the diagnosis fed compensation directly: when pilot misfire was detected before the main injection, the controller could adjust the remaining injection strategy, including the use of a second pilot injection. How that [predictive controller responds within the same cycle](/writing/predictive-in-cycle-combustion-control/) is the subject of the next article in the series.

In this context, diagnostic logic becomes part of the control architecture. It is not only an observer. It is a decision-making layer that determines whether the controller should trust the current combustion event, compensate for an abnormal event, or operate under constraints when observability is insufficient.

## The takeaway

The central lesson is that combustion fault detection is not only a signal-threshold problem. It is a decision problem under uncertainty. In pilot-main diesel combustion, the boundary between normal pilot combustion and pilot misfire shifts with operating conditions and fuel properties, and the diagnostic signal can be weak, noisy, or delayed. A robust detector therefore needs to account for probability, observability, and adaptation.

The contribution of this part of the thesis was to show how diagnostic logic can move beyond fixed thresholds. By combining stochastic detection, adaptive thresholds, pressure-derived indicators, and sensor fusion, the controller can diagnose abnormal combustion robustly, in real time, and early enough to support corrective action. The misfire-detection method has since been cited in later engine-control research, including [cylinder pressure-based feedback control of marine diesel engines](https://doi.org/10.1016/j.energy.2024.131570) and [injected-mass feedback control for multiple injections](https://doi.org/10.1016/j.fuel.2022.126670).

The practical effect is that combustion diagnostics stops being a passive fault log and becomes an active decision layer inside real-time control.

## Part of the series: In-Cycle Combustion Control

1. [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/) (the overview)
2. [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/)
3. Stochastic Fault Detection and Diagnostic Decision Logic (this article)
4. [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/)
5. [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/)
6. [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/)

## Source articles

This article is based on my PhD thesis and the following thesis papers:

- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Cylinder Pressure Based Method for In-Cycle Pilot Misfire Detection," *SAE International Journal of Advances and Current Practices in Mobility*, 2(2):488-502, 2020.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "Bayesian Method for Fuel Mass Estimation of Short Pilot Injections based on its Misfire Probability," *2020 American Control Conference (ACC)*, Denver, CO, USA, 2020, pp. 1507-1513.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "In-Cycle Closed-Loop Combustion Control for Pilot Misfire Compensation," *SAE International Journal of Advances and Current Practices in Mobility*, 3(1):299-311, 2021.
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, PhD thesis, Lund University, 2021. [Open-access PDF](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf)
- Carlos Jorques Moreno, Ola Stenlaas, and Per Tunestal, "In-cycle closed-loop combustion control with pilot misfire compensation," *Control Engineering Practice*, 122, 2022. [doi.org/10.1016/j.conengprac.2022.105097](https://doi.org/10.1016/j.conengprac.2022.105097)

Later work by other groups citing the misfire-detection research:

- Gu, J. et al., "Real-time prediction of fuel consumption and emissions based on deep autoencoding support vector regression for cylinder pressure-based feedback control of marine diesel engines," *Energy*, 2024. [doi.org/10.1016/j.energy.2024.131570](https://doi.org/10.1016/j.energy.2024.131570)
- Ferrari, A., Novara, C., and Vento, O., "A novel fuel injected mass feedback-control for single and multiple injections," *Fuel*, 2022. [doi.org/10.1016/j.fuel.2022.126670](https://doi.org/10.1016/j.fuel.2022.126670)

<section class="article-cta" aria-labelledby="combustion-diagnostics-cta-title">
	<h2 id="combustion-diagnostics-cta-title">Need help turning diagnostic logic into a real-time control system?</h2>
	<p>I work on combustion control, model-based diagnostics, virtual sensing, and embedded decision logic for advanced powertrain systems.</p>
	<ul class="article-cta__links">
		<li><a href="/contact/">Contact me about combustion diagnostics</a></li>
		<li><a href="/research/">Explore related research</a></li>
	</ul>
</section>
