---
title: "Controlling Combustion While It Happens"
subtitle: "An overview of my PhD research on in-cycle closed-loop combustion control"
description: The umbrella article for the in-cycle combustion control series. Why controlling a diesel engine within a single combustion cycle matters for efficiency and renewable fuels, how the research was built and validated, and a guide to the five articles that cover it in depth.
publishDate: 2026-07-07
readingTime: 12 min read
category: Control Algorithms & Diagnostics
tags:
  - Combustion control
  - Closed-loop control
  - Diesel engines
  - Virtual sensing
  - Renewable fuels
  - PhD research
featured: true
draft: true
---

A heavy-duty diesel engine at 1200 RPM completes a combustion cycle ten times per second. Inside each of those cycles, fuel is injected, ignites, burns, and pushes the piston, all within a few milliseconds. For a hundred years, the control philosophy for this process was simple: prepare everything in advance, let combustion happen, and look at the result afterwards.

My PhD research at Lund University asked a different question. What if the engine could watch its own combustion as it develops and correct the injection while the fuel is still burning?

That is what in-cycle closed-loop combustion control means, and it is the thread that connects the five technical articles on this site. This article is the overview: why the problem matters beyond the laboratory, how the work was built and validated, what it achieved, and where each deep dive fits. If you read only one article of the series, read this one. If you want the details, every section points to the article that carries them.

## Why this work was necessary

The honest starting point is that road freight has a physics problem.

Transport still gets about 95% of its energy from fossil fuels, and heavy trucks are the hardest part to change. Batteries that move a fully loaded long-haul truck remain limited by energy density, durability, and cost; one IEA scenario from the time of the thesis estimated that electrifying heavy trucking would require the equivalent of 33 Tesla Gigafactories of battery production by 2070. Hydrogen needs infrastructure that mostly does not exist yet. Meanwhile trucks keep moving the economy: road freight accounts for roughly 7% of global energy-related CO2 emissions, and diesel engines power more than 90% of it.

The realistic bridge for the next decades is renewable fuels in very efficient engines: biodiesel, HVO, and other drop-in fuels burned in diesel engines that waste as little of them as possible. But renewable fuels introduce a control problem. Their ignition properties vary far more than fossil diesel's. An engine calibrated in advance for one fuel behaves differently on another, and emissions regulations keep tightening toward real-driving conditions rather than laboratory cycles.

Pre-calibrated engines handle this variability the only way they can: with safety margins. The calibration retreats from the efficiency optimum so that the worst-case cycle stays safe and legal. Every one of those margins is paid for in fuel, every cycle, for the life of the engine.

The thesis states its mission in one sentence: to ease the transition toward efficient and clean internal combustion engine operation with biofuels. The mechanism is feedback. If the engine can measure what combustion is actually doing and correct it immediately, the margins can shrink, the fuel can vary, and the efficiency optimum becomes reachable in practice rather than only on the calibration bench.

## What "in-cycle" actually means

Most engine control operates from one cycle to the next: measure the cycle that just finished, adjust the next one. That is already closed-loop control, but the correction always arrives one combustion too late.

In-cycle control closes the loop inside the cycle. A piezoelectric pressure sensor in the cylinder head measures the pressure every 0.2 crank-angle degrees. From that trace, the controller computes in real time how combustion is developing: when the small pilot injection ignited, whether it ignited at all, and how much fuel actually burned. Based on that, it adjusts the main injection of the same cycle, which is still ahead. The engine corrects its own combustion mid-explosion.

The numbers explain why nobody did this casually. At 1200 RPM, a 0.2 degree sampling window lasts 27 microseconds. Every calculation, from pressure filtering through heat-release analysis to the control decision, has to finish inside that window, reliably, every time. A conventional CPU running code sequentially cannot guarantee it. The work therefore ran on FPGAs, chips whose logic executes in parallel with deterministic timing, programmed with integer arithmetic and every multiplication budgeted. Half of the research effort was not control theory. It was making control theory executable at combustion speed.

## How the work was developed and proven

This was not a simulation study. The test bench was a full 6-cylinder Scania D13 heavy-duty truck engine, 12.7 liters, in the engine laboratory of Lund University, instrumented with water-cooled cylinder pressure sensors and a crank encoder giving five pulses per degree. The project ran from 2016 to 2021, funded by the Swedish Energy Agency and Scania, and everything the thesis claims was demonstrated on that running engine, including on fuels ranging from standard Swedish diesel to rapeseed biodiesel (RME) and HVO.

The research builds up in layers, and the article series follows the same causal chain: observe, decide, control, optimize, deploy.

**Observe: [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/).** You cannot control what you cannot see, and no production sensor reports "how much pilot fuel burned" mid-cycle. The answer was virtual sensors: model-based estimators that compute hidden combustion states from the pressure trace fast enough to matter. The pilot mass estimate was accurate to about half a milligram per stroke, available before the main injection, and the start of combustion was detected within 0.3 crank-angle degrees.

**Decide: [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/).** Pilot injections are tiny, a few milligrams, and sometimes they silently fail to ignite. Detecting that failure is a decision under uncertainty, because no fixed threshold works across operating conditions. Probabilistic detectors and adaptive thresholds reached 96% correct classification, against a theoretical observability ceiling of about 98%, early enough to act within the same cycle.

**Control: [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/).** With observation and diagnosis in place, predictive models of the main combustion, adapted online and shared intelligently across the six cylinders, closed the loop. The controller roughly halved cycle-to-cycle variation: load variation dropped from ±0.8 to ±0.2 bar, and when a pilot misfire was detected, a compensating second pilot fired in the same cycle, eliminating what would otherwise be a full percentage point of lost indicated efficiency.

**Optimize: [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/).** Reduced variation is not the end goal; it is a currency. Tighter dispersion means the safety margins that protect against the worst-case cycle can shrink, so the operating set-point can move closer to the true optimum. Monte Carlo optimization over the actual cycle distributions converted the controller's precision into efficiency: gains up to 1.8 percentage points of indicated efficiency at low load, with pressure-rise and misfire-risk constraints treated as probabilities rather than hard walls.

**Deploy: [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/).** Finally, all of it had to run in those 27-microsecond windows. This article covers the unglamorous engineering that makes the rest real: model simplification without losing control value, fixed-point arithmetic, modular controller architecture coordinated by a state machine, and quantified FPGA resource budgets per module.

For readers who want the deepest layer, every article cites the underlying peer-reviewed publications, and the full list is at the end of this page.

## What it added up to

Three results summarize the thesis for a non-specialist.

First, the engine became observable mid-cycle. Quantities that were previously invisible in real time, like burnt pilot mass and incipient misfire, became available before the main injection, with quantified accuracy.

Second, the engine became correctable mid-cycle. Stochastic variation between cycles, which pre-calibrated engines simply tolerate, was roughly halved, and individual failing cycles were rescued as they happened.

Third, that precision was converted into efficiency. Depending on load, between 0.4 and 1.8 percentage points of indicated efficiency were recovered, with the largest gains exactly where diesel engines are least efficient and where urban driving spends its time: low load.

Percentage points of engine efficiency sound abstract, so it is worth translating. A modern heavy-duty diesel converts roughly 45% of fuel energy into work. Making that 46 to 47% with software and a pressure sensor, on fuels the engine was never hand-calibrated for, is fuel and CO2 saved across every kilometer of a truck's million-kilometer life. Applied at fleet scale, control software of this kind is one of the cheapest forms of decarbonization available, because it needs no new energy infrastructure. It makes the bridge years cleaner while batteries and hydrogen mature, and the same feedback philosophy carries directly into those futures: the methods developed here for combustion apply wherever a fast physical process must be sensed, trusted, and corrected in real time.

That, more than any single number, is the impact I hoped for from the work: showing that the gap between what an engine is calibrated to do and what it could do, cycle by cycle, is recoverable with feedback, models, and disciplined implementation.

## How the thesis is supported

Everything above rests on peer review and a public defense. The research produced fifteen publications in SAE, IFAC, and American Control Conference venues, each carrying one building block of the chain described here, and the efficiency-optimization work was later consolidated in a journal article in [Control Engineering Practice](https://doi.org/10.1016/j.conengprac.2022.105097) (2022). The thesis, ["Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections"](https://portal.research.lu.se/en/publications/design-and-optimization-of-in-cycle-closed-loop-combustion-contro/) (Lund University, 2021), was defended in May 2021 with Professor Ming Zheng of the University of Windsor as opponent, and the [full text is openly available as a PDF](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf). It remains the best single document for readers who want the mathematics, the experimental detail, and the honest discussion of limitations.

## Where the work has traveled since

A thesis is also measured by what other researchers do with it, and the citation trail shows the ideas moving into neighboring problems. Researchers at TU Eindhoven build on the efficiency-optimization work in their program toward ["self-learning engines"](https://doi.org/10.1016/j.ifacol.2023.10.1011) driven by cylinder-pressure feedback. A group at Oak Ridge National Laboratory cites it in work applying [reinforcement learning to dilute combustion control](https://doi.org/10.1177/14680874241226580). The methods have been picked up beyond trucks: in [cylinder-balancing control for marine diesel engines](https://doi.org/10.1016/j.conengprac.2024.106156), in [injected-mass feedback control research at Politecnico di Torino](https://doi.org/10.1016/j.fuel.2022.126670), and, closest to this work's original motivation, in a TU Wien study of [pressure-based combustion control for aviation engines running sustainable aviation fuels](https://doi.org/10.4271/2026-01-5028). The premise carries over unchanged: when fuel properties vary, feedback replaces margins.

The surrounding field has kept moving in the same direction. RWTH Aachen and FEV demonstrated [model-based closed-loop control for flex-fuel operation](https://doi.org/10.1016/j.apenergy.2023.121795) with renewable diesel blends, sensor manufacturers now publish [production-oriented smart cylinder-pressure sensors designed for closed-loop combustion control](https://doi.org/10.5194/jsss-11-1-2022), and the IEA's [renewable transport outlook](https://www.iea.org/reports/renewables-2025/renewable-transport) keeps revising biofuel demand upward, which keeps the original question alive: engines that can trust their own combustion measurements can run fuels the calibration bench never saw.

## Where to go next

If you are a general reader, the story above is the whole arc: engines can watch and correct their own combustion, and that makes them meaningfully cleaner on the fuels we need them to burn next.

If you are an engineer, start with [virtual sensing](/writing/virtual-sensing-in-cycle-combustion-diagnostics/) and follow the chain through [fault detection](/writing/stochastic-fault-detection-diagnostic-decision-logic/), [predictive control](/writing/predictive-in-cycle-combustion-control/), and [set-point optimization](/writing/stochastic-set-point-optimization-efficiency/), finishing with [the implementation article](/writing/real-time-combustion-control-implementation/). Each one stands alone, but read in that order they follow the same logic the research did: observe, decide, control, optimize, deploy.

If you are a researcher, go to the sources below.

## The article series

1. Controlling Combustion While It Happens (this overview)
2. [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/)
3. [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/)
4. [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/)
5. [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/)
6. [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/)

## The thesis and publications

Thesis: Carlos Jorques Moreno, *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*, PhD thesis, Lund University, 2021. ISBN 978-91-7895-827-6 (print), 978-91-7895-828-3 (PDF). [Record at the Lund University research portal](https://portal.research.lu.se/en/publications/design-and-optimization-of-in-cycle-closed-loop-combustion-contro/) | [Open-access full text (PDF)](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf)

Journal consolidation: Jorques Moreno, Stenlåås, Tunestål. [Indicated efficiency optimization by in-cycle closed-loop combustion control of diesel engines](https://doi.org/10.1016/j.conengprac.2022.105097). *Control Engineering Practice* 122, 2022.

Selected publications (with Ola Stenlåås and Per Tunestål unless noted):

1. Investigation of Small Pilot Combustion in a Heavy-Duty Diesel Engine. SAE International Journal of Engines 10(3), 2017.
2. Influence of Small Pilot on Main Injection in a Heavy-Duty Diesel Engine. SAE Technical Paper 2017-01-0708, 2017.
3. Cylinder Pressure-Based Virtual Sensor for In-Cycle Pilot Mass Estimation. SAE International Journal of Engines 11(6), 2018.
4. In-Cycle Closed-Loop Combustion Controllability with Pilot-Main Injections. Thiesel Conference, Valencia, 2018.
5. In-Cycle Closed-Loop Combustion Control with Pilot-Main Injections for Maximum Indicated Efficiency. IFAC-PapersOnLine 51(31), 2018.
6. West, Jorques Moreno, Stenlåås, Jönsson, Haslestad. Internal Combustion Engine Cylinder Volume Trace Deviation. SAE International Journal of Engines 11(2), 2018.
7. Cylinder Pressure Based Method for In-Cycle Pilot Misfire Detection. SAE International Journal of Advances and Current Practices in Mobility 2(2), 2020.
8. Bayesian Method for Fuel Mass Estimation of Short Pilot Injections Based on Its Misfire Probability. American Control Conference, Denver, 2020.
9. Predictive In-Cycle Closed-Loop Combustion Control with Pilot-Main Injections. IFAC-PapersOnLine 53(2), 2020.
10. Multi-Cylinder Adaptation of In-Cycle Predictive Combustion Models. SAE Technical Paper 2020-01-2087, 2020.
11. In-Cycle Closed-Loop Combustion Control for Pilot Misfire Compensation. SAE International Journal of Advances and Current Practices in Mobility 3(1), 2021.
12. Stochastic Set-Point Optimization for In-Cycle Closed-Loop Combustion Control Operation. SAE Technical Paper 2021-01-0531, 2021.
13. Modular Design and Integration of In-Cycle Closed-Loop Combustion Controllers for a Wide Range of Operating Conditions. American Control Conference, New Orleans, 2021.
14. Quantification of FPGA Requirements for Closed-Loop Combustion Control Implementation. ICE2021, Capri, SAE 2021-24-0024, 2021.
15. Indicated Efficiency Optimization by In-Cycle Closed-Loop Combustion Control of Diesel Engines. Published in Control Engineering Practice 122, 2022. [DOI: 10.1016/j.conengprac.2022.105097](https://doi.org/10.1016/j.conengprac.2022.105097)

## Work building on this research

- Vlaswinkel, M., Willems, F. [Cylinder Pressure Feedback Control for Ideal Thermodynamic Cycle Tracking: Towards Self-learning Engines](https://doi.org/10.1016/j.ifacol.2023.10.1011). IFAC-PapersOnLine 56(2), 2023.
- Maldonado, B. P., Kaul, B., Schuman, C. D. [Reinforcement learning applied to dilute combustion control for increased fuel efficiency](https://doi.org/10.1177/14680874241226580). International Journal of Engine Research, 2024.
- Ou, S., Yu, Y., Hu, N., et al. [Study of control strategy for cylinder-to-cylinder combustion homogeneity of marine medium-speed diesel engines](https://doi.org/10.1016/j.conengprac.2024.106156). Control Engineering Practice, 2024.
- Ferrari, A., Novara, C., Vento, O. [A novel fuel injected mass feedback-control for single and multiple injections in direct injection systems for CI engines](https://doi.org/10.1016/j.fuel.2022.126670). Fuel, 2022.
- Kleissner, F., Hofmann, P. [Potential of an In-Cylinder Pressure-Based Combustion Control for Compression Ignition Aviation Engines Operated with Sustainable Aviation Fuels](https://doi.org/10.4271/2026-01-5028). SAE Technical Paper 2026-01-5028, 2026.
- Barbier, A. [In-Cylinder Pressure-Based Control of Premixed Dual-Fuel Combustion](https://doi.org/10.4995/thesis/10251/183274). PhD thesis, Universitat Politècnica de València, 2022.

## Related current literature

- Srivastava, Schaub, Pischinger. [Model-based closed-loop control strategies for flex-fuel capability](https://doi.org/10.1016/j.apenergy.2023.121795). Applied Energy 350, 2023.
- Vollberg, Gibson, Schultes, Groh, Heinze. [Smart in-cylinder pressure sensor for closed-loop combustion control](https://doi.org/10.5194/jsss-11-1-2022). Journal of Sensors and Sensor Systems 11, 2022.
- Vlaswinkel, M., Willems, F. [Data-Based In-Cylinder Pressure Model with Cyclic Variations for Combustion Control](https://doi.org/10.3390/en17081881). Energies 17(8), 2024.
- Hunicz, J., et al. [Comparison of diesel and hydrotreated vegetable oil as the high-reactivity fuel in reactivity-controlled compression ignition](https://doi.org/10.1016/j.enconman.2024.119264). Energy Conversion and Management, 2024.
- IEA. [Renewables 2025: Renewable transport](https://www.iea.org/reports/renewables-2025/renewable-transport). International Energy Agency, 2025.
- IEA Bioenergy Task 39. [Update on drop-in biofuel and co-processing commercialization](https://www.ieabioenergy.com/wp-content/uploads/2024/09/IEA-Bioenergy-Task-39-drop-in-biofuels-and-co-processing-report-June-2024.pdf), 2024.
