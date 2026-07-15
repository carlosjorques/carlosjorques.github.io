---
title: "AI Enters the Control Loop: Where Machine Learning Actually Runs in a Car"
description: A technical article on where machine learning is already used in vehicle control, from ADAS and battery management to powertrain virtual sensing and calibration.
publishDate: 2026-07-07
readingTime: 13 min read
category: Physical Systems Engineering
tags:
  - Artificial intelligence
  - Vehicle control
  - Machine learning
  - Software-defined vehicles
  - Embedded control
featured: true
draft: false
---

Ask where artificial intelligence lives in a modern car and most people will point at the driver assistance system. That answer is correct and badly incomplete. Machine learning is quietly working its way into places most drivers never think about: the model that estimates how much charge is left in the battery, the virtual sensor that infers emissions the hardware cannot measure directly, the shift strategy that anticipates the corner ahead. Meanwhile, in the most safety-critical loops, classical control still holds the actuators, and for good reasons.

This first article maps where machine learning actually runs in vehicle control today, domain by domain: ADAS, battery management, powertrain, and the ECU functions in between. It then turns to the theme that connects every one of those domains, the quality of the data these models are built on. The second article asks the harder questions: can a vehicle learn as it runs, and what limits the adoption of AI both during development and on the vehicle itself.

## The thesis in 60 seconds

1. AI adoption in vehicle control is a gradient, not a switch. Perception has been neural for a decade. Planning is becoming neural now. Actuation, the layer that physically moves the car, remains overwhelmingly classical, and every certified system keeps deterministic fallbacks around the learned parts.
2. The most consequential production deployments are not in the headlines. Battery state estimation, virtual emissions sensors, and learned calibration are where ML already earns its place in series production, usually hybridized with physical models rather than replacing them.
3. The silicon roadmap has already voted. Automotive microcontrollers from ST, NXP, Infineon, and Renesas now ship with neural processing units, which tells you the industry expects inference inside ordinary ECUs, not just in the central computer.
4. Every one of these applications lives or dies on data quality. A state-of-charge model trained on clean laboratory cycles degrades on real roads. A perception network is only as good as the rare scenarios in its training set. In automotive AI, the data pipeline is the product.
5. What does not happen, despite the marketing, is the car learning by itself as it drives. That question, and the certification wall behind it, is the subject of Part 2.

## A gradient, not a switch: from perception to actuation

It helps to place any automotive AI claim on a simple axis: how close does the learned component sit to the actuator?

At the far end, perception went neural years ago and nobody argues about it anymore. The genuinely new development is machine learning moving into planning and control. Tesla's FSD v12 is the clearest data point: the release notes state that the city-streets driving stack became [a single end-to-end neural network trained on millions of video clips, replacing over 300,000 lines of explicit C++ code](https://www.notateslaapp.com/software-updates/version/2024.3.20/release-notes). Whatever one thinks of the approach, that is a production system in which learned components propose the vehicle's trajectory.

The rest of the industry is following with more hedging. Wayve, the UK end-to-end driving company, signed [definitive agreements with Nissan in December 2025](https://wayve.ai/press/nissan-wayve-sign-definitive-agreements/) to integrate its learned driver into the next generation of ProPILOT, with the first mass-production model planned for Japan in fiscal 2027, notably paired with Nissan's own lidar-based ground-truth perception rather than cameras alone. Waymo published [EMMA, an end-to-end multimodal model built on Gemini](https://waymo.com/blog/2024/10/introducing-emma/), and was refreshingly explicit that it is research, not production: it cannot yet process long video histories, ignores lidar and radar, and is too slow for the car. NVIDIA's award-winning [Hydra-MDP planner](https://developer.nvidia.com/blog/end-to-end-driving-at-scale-with-hydra-mdp/) is trained by distilling from both human drivers and rule-based planners, a hybrid that quietly concedes the value of the classical layer.

And at the near end of the axis, where the system touches steering and brakes with legal consequences, the picture inverts. Mercedes-Benz's DRIVE PILOT, the first SAE Level 3 system certified for public freeways in the United States, builds its safety story not on model intelligence but on [redundant steering and braking actuators and a redundant on-board electrical system](https://www.automotive-fleet.com/10200516/drive-pilot-heralds-era-of-l3-driving-in-u-s), plus lidar, road-wetness sensing, and a tightly constrained operating envelope. The lesson generalizes: the closer to the actuator, the more the architecture relies on redundancy, determinism, and constraint, and the less it relies on learned behavior.

For a control engineer, this gradient is not a temporary embarrassment for AI. It is a sensible allocation of technologies to risk. It is also, as we will see in Part 2, exactly what current regulation and functional safety standards push toward.

## The battery is the beachhead

If you want to see machine learning earning its keep in series production control today, look at the battery, not the steering wheel.

Battery state estimation is a genuinely hard estimation problem: state of charge and state of health are not directly measurable, cell behavior is nonlinear in temperature and age, and errors have real consequences for range, longevity, and safety. The classical answer is an equivalent-circuit model wrapped in a Kalman filter. The modern production pattern is a hybrid: a neural network correcting or feeding a filter. Recent published work shows [CNN-LSTM networks combined with adaptive Kalman filters holding state-of-charge errors under 1.5 percent across a 0 to 50 degree range](https://www.mdpi.com/2227-9717/13/11/3559), and Kalman-network hybrids validated processor-in-the-loop [on automotive-class microcontrollers](https://www.sciencedirect.com/science/article/abs/pii/S2352152X26010790), confirming these models fit the compute budget of a real BMS.

The research pedigree here is strong. The Stanford, MIT, and Toyota Research collaboration showed in Nature Energy that ML on early-cycle voltage data could [predict battery cycle life within about 9 percent using only the first 100 cycles](https://www.nature.com/articles/s41560-019-0356-8), and the follow-up in Nature used closed-loop Bayesian optimization to find [long-life 10-minute fast-charging protocols in 16 days instead of an estimated 500-plus days of exhaustive testing](https://www.nature.com/articles/s41586-020-1994-5).

Industry has moved this from the lab to the fleet. Bosch's [Battery in the Cloud](https://www.bosch-mobility.com/en/solutions/software-and-services/battery-in-the-cloud/battery-in-the-cloud/) pairs the on-board BMS with cloud-side digital twins that combine physical battery models with AI over fleet telemetry, claiming up to 20 percent less battery aging through optimized operating strategies. CATL went a step closer to the actuator: its Shenxing PLUS pack, announced in 2024, uses what the company describes as [an AI polarization model that predicts and controls the charging current in real time](https://www.catl.com/en/news/6239.html), machine learning inside the charging control path of a production LFP battery.

Note the architecture that recurs across all of these: heavy models run in the cloud over fleet data, light models run on the vehicle, and physics stays in the loop. Nobody serious is replacing the battery model with a black box. They are teaching the model the residuals the physics cannot capture.

## Powertrain control: virtual sensors and learned calibration

The powertrain has the longest quiet history of neural networks in production, and it is worth telling honestly because it illustrates both the promise and the discipline required.

The classic application is the virtual sensor: a model that infers a quantity the hardware cannot measure, or cannot measure cheaply. Neural network estimation of engine-out NOx has a two-decade paper trail, from [SAE work on NN-based virtual NOx sensing for compression ignition engines](https://www.sae.org/publications/technical-papers/content/2011-24-0157/) to designs explicitly engineered so that [computational burden and memory usage fit within existing engine management systems](https://www.sciencedirect.com/science/article/abs/pii/S0967066117300060), including online adaptation for component aging and production spread. Ford researchers described deploying [neural-network classifiers of crankshaft acceleration patterns for misfire diagnosis](https://www.oreilly.com/content/adopting-ai-in-the-enterprise-ford-motor-company/) in mass-produced cars, one of the earliest large-scale industrial neural network applications, though practitioner accounts differ on how widely and how long the approach survived in the field.

The shift strategy is another production foothold. Hyundai and Kia announced their [ICT Connected Shift System](https://tech.hyundaimotorgroup.com/press-release/hyundai-and-kia-develop-worlds-first-ict-connected-shift-system/) in 2020: transmission control software that predicts the optimal shift pattern from navigation, camera, and radar inputs, reporting roughly 43 percent fewer shifts in corners during testing. Predictive intelligence in the strategy layer, while the shift execution itself remains conventional control.

Where the momentum is strongest, however, is not on the vehicle but in the calibration process behind it. Modern engine and motor calibration is a high-dimensional optimization over expensive experiments, which is precisely the problem Bayesian methods were built for. Recent academic work demonstrates [constrained Bayesian optimization automating combustion calibration](https://arxiv.org/abs/2503.20493) with convergence to near-optimal settings in around a minute of computation, and Bosch's research arm positions [reinforcement learning as a route to fully automating recurring controller calibration and tuning](https://www.bosch.com/research/bcai/reinforcement-learning-control-and-optimization/). We will return to development-time AI in Part 2, because it is the most mature adoption path of all.

One honest boundary line: reinforcement-learning energy management for hybrids, a huge academic literature, consistently beats rule-based strategies [in simulation studies](https://www.sciencedirect.com/science/article/pii/S2666546825000461). I could find no documented series-production deployment. The gap between those two sentences is the central subject of this series.

## The silicon has already voted

If you want to know where an industry believes it is going, ignore the keynotes and read the chip roadmaps, because silicon commits years before software ships.

The automotive microcontroller, the workhorse of ECU control, is growing neural processing units. ST announced the [Stellar P3E, which it claims is the first automotive MCU with an embedded neural processing unit](https://www.cnx-software.com/2026/02/13/stmicroelectronics-stellar-p3e-quad-core-arm-cortex-r52-automotive-mcu-features-neural-art-ai-accelerator/), four lockstep-capable Cortex-R52+ cores plus an INT8 accelerator, aimed at consolidating inverter and charging control with smart sensing and predictive maintenance, with mass production targeted for late 2026. NXP's [S32K5 zonal MCU family integrates its eIQ Neutron NPU](https://www.globenewswire.com/news-release/2025/03/11/3040299/0/en/New-S32K5-microcontroller-family-advances-zonal-SDV-architectures-and-extends-the-NXP-CoreRide-platform.html) alongside Cortex-M7 and R52 cores. Infineon's [AURIX TC4x pairs its lockstep TriCore cluster with a parallel processing unit marketed for AI up to ASIL D](https://www.infineon.com/products/microcontroller/32-bit-tricore/aurix-tc4x), and Renesas has added a data-flow coprocessor for ML workloads to its RH850 control line.

Keep the scale honest, though. These MCU-class accelerators deliver on the order of billions of operations per second within a few megabytes of memory. The SoCs running end-to-end driving stacks, such as [NVIDIA's DRIVE Thor at up to roughly 1,000 INT8 TOPS](https://nvidianews.nvidia.com/news/nvidia-unveils-drive-thor-centralized-car-computer-unifying-cluster-infotainment-automated-driving-and-parking-in-a-single-cost-saving-system), sit three orders of magnitude away. What fits on an ECU is a small, quantized network: TinyML practice compresses models with [8-bit quantization, pruning, and distillation to run in under a few hundred kilobytes](https://arxiv.org/pdf/2206.03266). That is enough for a virtual sensor, an anomaly detector, or a filter correction. It is not enough for a perception stack, and it never needs to be. The interesting engineering question on the MCU is not how big a model fits but whether a small model can be validated to the same standard as the code it replaces.

## Data quality is the product

Everything above, from the end-to-end driver to the humble virtual sensor, shares one dependency that outweighs architecture, compute, and algorithm choice: the data it was trained on. This is where automotive AI is won or lost, and the industry's most successful practitioners say so explicitly.

Andrew Ng's data-centric AI argument, that for many applications [the model is basically a solved problem and the leverage lies in systematically improving the data](https://www.forbes.com/sites/gilpress/2021/06/16/andrew-ng-launches-a-campaign-for-data-centric-ai/), lands nowhere harder than in vehicles. The volumes alone reshape engineering priorities: analyses of autonomous test fleets put raw sensor output at [multiple terabytes per vehicle per day, with estimates ranging from 11 to over 150 terabytes depending on sensor configuration and duty cycle](https://www.tuxera.com/blog/autonomous-and-adas-test-cars-produce-over-11-tb-of-data-per-day/). Nobody can label that, and nobody should try: the overwhelming majority of driving data is boring, and boring data teaches a model nothing new.

The competitive weapon is therefore curation, not collection. Tesla's data engine is the best-documented example: [hundreds of trigger classifiers deployed across the fleet](https://codecompass00.substack.com/p/tesla-data-engine-trigger-classifiers) hunt for specific scenarios, and shadow mode runs candidate software without vehicle control while logging every disagreement with the human driver. The fleet is not uploading its life; it is answering queries. Waymo's recent long-tail work makes the statistics explicit: to build a hard-scenario dataset, the company [mined 6.4 million miles of driving for scenario categories occurring less than 0.03 percent of the time](https://arxiv.org/pdf/2510.26125). The rare cases are the product; the common cases are overhead. And where the real world will not produce enough rarity on schedule, synthetic data steps in: NVIDIA's [Cosmos world foundation models](https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-world-foundation-model-platform-to-accelerate-physical-ai-development) exist precisely to multiply scenario variations, weather, lighting, geometry, that a physical fleet would take years to encounter.

The same discipline applies, with less glamour and equal force, in the control domains. Battery researchers have documented that deep-learning state-of-charge estimators [overfit the standard laboratory load profiles they are trained on and deteriorate significantly in unseen conditions](https://pmc.ncbi.nlm.nih.gov/articles/PMC11381739/), because field data reflects driving styles, climates, and aging trajectories that controlled lab cycles never cover. Engine calibration has known this for decades in its own vocabulary: models built from steady-state test-bench points [produce poor results in the transient operation that dominates real driving](https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/solutions/automotive/files/mac2007/10_steadystate.pdf). The ML community calls it distribution shift. Calibration engineers call it Tuesday.

The safety world has formalized the same idea. ISO 21448, the SOTIF standard, frames the problem as [shrinking the unknown-unsafe area](https://www.jamasoftware.com/requirements-management-guide/automotive-engineering/sotif/): scenarios your system handles badly and that you have not yet discovered. For a learned function, the unknown-unsafe area and the gaps in your training data are close to the same thing. Data quality, in other words, is not an ML hygiene topic. It is a safety topic.

## Where this leaves us

Machine learning in vehicle control in 2026 is neither hype nor fringe. It is a working technology with a clear settlement pattern: neural where the world is too messy to specify, perception, prediction, estimation of the unmeasurable; classical where behavior must be guaranteed, actuation, fallback, and everything with an ASIL letter attached; and hybrid almost everywhere in between, with physics-based models and learned corrections sharing the loop. The silicon now shipping into ordinary ECUs says this settlement will spread deeper into the vehicle, one small validated model at a time.

But two questions remain open, and they are the ones that decide how far this goes. Can the vehicle improve its own models as it accumulates experience, or must every update route through the factory loop? And what happens when a learned function meets the certification machinery that automotive safety is built on? Those are the subject of [Part 2: Cars Do Not Learn as They Run](/writing/cars-do-not-learn-as-they-run/).

*Part of the series: Software-Defined Physical Systems.*

## Sources and further reading

**ADAS and end-to-end driving**

- Tesla, [FSD v12 release notes (2024.3.20)](https://www.notateslaapp.com/software-updates/version/2024.3.20/release-notes)
- Waymo, [Introducing EMMA: an end-to-end multimodal model for autonomous driving](https://waymo.com/blog/2024/10/introducing-emma/) (October 2024)
- Wayve, [Nissan and Wayve sign definitive agreements](https://wayve.ai/press/nissan-wayve-sign-definitive-agreements/) (December 2025)
- NVIDIA, [End-to-end driving at scale with Hydra-MDP](https://developer.nvidia.com/blog/end-to-end-driving-at-scale-with-hydra-mdp/) (June 2024)
- Automotive Fleet, [DRIVE PILOT heralds era of L3 driving in the U.S.](https://www.automotive-fleet.com/10200516/drive-pilot-heralds-era-of-l3-driving-in-u-s) (June 2023)

**Battery management**

- Bosch Mobility, [Battery in the Cloud](https://www.bosch-mobility.com/en/solutions/software-and-services/battery-in-the-cloud/battery-in-the-cloud/)
- CATL, [Shenxing PLUS announcement](https://www.catl.com/en/news/6239.html) (April 2024)
- Severson et al., [Data-driven prediction of battery cycle life before capacity degradation](https://www.nature.com/articles/s41560-019-0356-8), Nature Energy (2019)
- Attia et al., [Closed-loop optimization of fast-charging protocols for batteries with machine learning](https://www.nature.com/articles/s41586-020-1994-5), Nature (2020)
- [Deep-learning SOC estimation and its generalization limits](https://pmc.ncbi.nlm.nih.gov/articles/PMC11381739/), review (2024)

**Powertrain and embedded ML**

- SAE 2011-24-0157, [Neural network based models for virtual NOx sensing of compression ignition engines](https://www.sae.org/publications/technical-papers/content/2011-24-0157/)
- Hyundai Motor Group, [ICT Connected Shift System](https://tech.hyundaimotorgroup.com/press-release/hyundai-and-kia-develop-worlds-first-ict-connected-shift-system/) (February 2020)
- Vlaswinkel et al., [Automated and risk-aware engine control calibration using constrained Bayesian optimization](https://arxiv.org/abs/2503.20493) (2025)
- Bosch Research, [Reinforcement learning, control, and optimization](https://www.bosch.com/research/bcai/reinforcement-learning-control-and-optimization/)
- NXP, [S32K5 announcement](https://www.globenewswire.com/news-release/2025/03/11/3040299/0/en/New-S32K5-microcontroller-family-advances-zonal-SDV-architectures-and-extends-the-NXP-CoreRide-platform.html) (March 2025); Infineon, [AURIX TC4x](https://www.infineon.com/products/microcontroller/32-bit-tricore/aurix-tc4x); CNX Software, [ST Stellar P3E](https://www.cnx-software.com/2026/02/13/stmicroelectronics-stellar-p3e-quad-core-arm-cortex-r52-automotive-mcu-features-neural-art-ai-accelerator/) (February 2026)

**Data quality**

- Forbes, [Andrew Ng launches a campaign for data-centric AI](https://www.forbes.com/sites/gilpress/2021/06/16/andrew-ng-launches-a-campaign-for-data-centric-ai/) (June 2021)
- Tuxera, [Autonomous and ADAS test cars produce over 11 TB of data per day](https://www.tuxera.com/blog/autonomous-and-adas-test-cars-produce-over-11-tb-of-data-per-day/)
- CodeCompass, [Tesla's data engine: trigger classifiers and shadow mode](https://codecompass00.substack.com/p/tesla-data-engine-trigger-classifiers)
- Waymo et al., [Long-tail scenario mining for end-to-end driving](https://arxiv.org/pdf/2510.26125) (2025)
- NVIDIA, [Cosmos world foundation model platform](https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-world-foundation-model-platform-to-accelerate-physical-ai-development) (January 2025)
- MathWorks/SAE, [Steady-state versus transient data in model-based calibration](https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/solutions/automotive/files/mac2007/10_steadystate.pdf)
- Jama Software, [SOTIF (ISO 21448) guide](https://www.jamasoftware.com/requirements-management-guide/automotive-engineering/sotif/)
