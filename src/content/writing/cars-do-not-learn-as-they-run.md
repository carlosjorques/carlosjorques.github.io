---
title: "Cars Do Not Learn as They Run"
description: A technical article on why production vehicles execute validated AI models rather than retraining safety-relevant functions on the road, and where automotive AI adoption is actually succeeding.
publishDate: 2026-07-07
readingTime: 14 min read
category: Physical Systems Engineering
tags:
  - Artificial intelligence
  - Vehicle control
  - Machine learning
  - Safety validation
  - Software-defined vehicles
featured: true
draft: false
---

The most seductive image in automotive AI is the car that gets smarter with every mile. It learns your commute, it learns the pothole on your street, it learns from every near miss, and tomorrow it drives better than today. The image sells software-defined vehicles, and there is a kernel of truth inside it.

But taken literally, the image is false, and it is worth being precise about why. No production vehicle today retrains its own safety-relevant models as it drives. The learning happens, and it happens at remarkable speed, but it happens somewhere else: in the fleet, in the cloud, in the development organization. The individual car executes frozen software, and both the engineering and the regulation are built around keeping it that way.

This article explains that architecture, the narrow exceptions to it, the certification wall that stands behind it, and where AI adoption in automotive is genuinely succeeding in the meantime. It closes with why the industry's caution is not timidity but earned experience.

## The thesis in 60 seconds

1. Production vehicles do not perform on-board learning of safety-relevant functions. The loop is: fleet collects, cloud trains, validation gates, OTA deploys. The car is a sensor and an executor, not a student.
2. The exceptions are real but bounded: parameter personalization inside pre-validated limits, and hardware provisioned for local learning that in practice serves personalization, not self-modification of safety logic.
3. Regulation effectively forbids the alternative. UNECE R156 requires every approved software state to be identifiable and protected against modification, and the new AI safety standard ISO/PAS 8800 structures the entire lifecycle around offline training with field monitoring, not field learning.
4. Behind the regulation sits a deeper problem: neural networks violate the core assumptions of automotive safety engineering, complete specification, deterministic verification, traceable decomposition. Standards are adapting, but complete verification of a learned function is not currently achievable, and everyone writing the standards says so.
5. Meanwhile, the highest-return AI adoption in automotive is not on the vehicle at all. It is in development: calibration, test generation, scenario simulation, and code assistance, where mistakes are caught by the V-model instead of the guardrail.

## The learning loop runs through the cloud, not the car

Start with the company most associated with "cars that learn." Tesla's improvement machinery is genuinely impressive, and none of it happens on your car. Trigger classifiers deployed across the fleet flag interesting scenarios; shadow mode runs candidate software without control authority and [logs disagreements between the model and the human driver](https://codecompass00.substack.com/p/tesla-data-engine-trigger-classifiers); flagged clips flow to central infrastructure for auto-labeling and curation; models are retrained centrally, validated, and pushed back over the air. The vehicle's network only ever infers. The learning loop is real, and it closes through the data center.

The rest of the industry describes the same lifecycle when it speaks in engineering rather than marketing terms. CARIAD, Volkswagen's software arm, lays out its machine learning safety approach as [prepare data, train model, deploy model](https://cariad.technology/de/en/news/stories/safety-integrity-machine-learning-automotive.html), with systematic hunting for "white spots" in data coverage before deployment. There is no in-field learning step anywhere in the description, because there is no in-field learning.

Why not? Setting aside regulation for a moment, the technical case against on-vehicle learning is strong on its own. Continual learning on streaming data suffers from catastrophic forgetting: updating a network on new experience [degrades previously learned behavior, and imbalanced real-world data makes it worse](https://onlinelibrary.wiley.com/doi/10.1111/mice.13503). The proposed academic remedies remain research-stage. And even if the learning were stable, the harder problem is validation: a model that changed itself on Tuesday is a model whose Tuesday behavior was never tested. One recently granted patent family is telling here, covering [automatic onboard validation of a newly trained vehicle machine learning model](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12468964): the industry knows that if on-board learning ever comes, on-board revalidation is the actual invention required.

## The bounded exceptions

Three genuine exceptions exist, and their boundaries are instructive.

The first is parameter adaptation inside validated limits, which is older than the AI conversation. Adaptive transmissions and self-tuning cruise control have adjusted parameters around a fixed control structure for decades. The modern ML version is Hyundai's SCC-ML, machine-learning-based smart cruise control that [learns an individual driver's following distance, acceleration habits, and responsiveness across more than 10,000 distinguishable patterns](https://www.hyundainews.com/en-us/releases/2887), and is, in Hyundai's own words, programmed specifically to avoid learning unsafe driving patterns. The system personalizes within a cage. The cage was validated; the personality inside it moves.

The second is hardware provisioned for local learning. NIO's Adam supercomputer dedicates one of its four NVIDIA Orin SoCs to [local training capabilities, fleet learning support, and personalizing the driving experience](https://blogs.nvidia.com/blog/nio-selects-nvidia-intelligent-electric-vehicles/). Note what this is and is not: silicon headroom for adaptation and personalization, not a production system rewriting its own perception stack on the highway.

The third is federated learning, and it is the most interesting because it is in production, just not for the reason most people expect. NVIDIA operates a [cross-border federated learning system for training AV models between the United States and China](https://developer.nvidia.com/blog/federated-learning-in-autonomous-vehicles-using-cross-border-training/), running stably for over a year, with about a dozen models trained. The motivation is not vehicles teaching themselves; it is data sovereignty law. China's PIPL and Europe's GDPR make raw driving data hard to move across borders, so the gradients travel instead. The cars still learn nothing locally. The training is distributed; the deployment is still frozen and gated.

The pattern across all three exceptions: adaptation is permitted where its envelope was validated in advance, and learning happens where validation machinery exists. Nothing self-modifies in the open.

## The regulation says no, in writing

Suppose an OEM wanted to ship a safety-relevant model that retrains itself in the field. The type approval framework, the legal machinery that permits a vehicle onto the road, is built in a way that makes this close to a contradiction in terms.

UNECE R156, the software update regulation that has been [mandatory for all new vehicles produced in the EU and other contracting markets since July 2024](https://www.vehicle-certification-agency.gov.uk/connected-and-automated-vehicles/cyber-security-and-software-updating/), requires every type-approved software configuration to carry an identifier, the RxSWIN, that [must be protected against unauthorized modification, with software changes requiring an extension of the type approval](https://www.msg.group/en/publications/software-identification-using-rxswin-for-homologation). The approved software state must remain identifiable and unchanged. A model that rewrites its own weights overnight is, from the regulator's perspective, an unapproved software change performed continuously.

The AI-specific standards reinforce rather than relax this. ISO/PAS 8800, published in December 2024 as the automotive industry's first dedicated AI safety standard, defines [an AI safety lifecycle from requirements through design, verification, validation, maintenance, and field monitoring](https://www.tuv.com/world/en/iso-pas-8800.html), extending ISO 26262 and SOTIF into learned functions, with explicit requirements on training data quality and post-deployment monitoring. Monitoring, not learning: the standard's answer to the field is to watch the model, detect drift and anomalies, and route corrections through the development lifecycle. SOTIF itself, ISO 21448, is built on validating a fixed system against scenario coverage; its logic quietly presumes the deployed function does not change between validation and operation.

Even the newest and most AI-friendly regulation keeps this shape. The UN type-approval framework for automated driving systems adopted in September 2025 is, in the words of one company that lobbied for it, [explicitly technology-agnostic and compatible with end-to-end learned architectures](https://wayve.ai/thinking/a-global-regulatory-breakthrough-for-assisted-and-automated-driving/), demonstrating safety through an outcome-based safety case. But it governs how learned systems are approved, not whether they may keep learning after approval. The EU AI Act, for its part, [carves motor vehicles out of direct application and folds AI requirements into the existing type-approval regime](https://www.taylorwessing.com/en/interface/2024/ai-act-sector-focus/eu-ai-act-and-the-automotive-industry), which means the RxSWIN logic above remains the operative constraint.

Put simply: nothing in current regulation permits a self-modifying safety-relevant model in the field, and several things prohibit it in effect. The car that learns as it runs is not waiting on better algorithms. It is waiting on a different theory of certification.

## The certification wall

The regulatory position is not bureaucratic conservatism. It reflects a genuine, unsolved mismatch between how automotive safety engineering works and what a neural network is.

The foundational analysis is Salay, Queiroz, and Czarnecki's [assessment of ISO 26262 against machine learning](https://arxiv.org/abs/1709.02435), which identifies the core violations: a learned function has no complete specification, since the training set is necessarily an incomplete sample of the world; it carries an inherent, persistent error rate rather than discrete fixable bugs; its knowledge is encoded non-transparently, resisting the inspection and review the standard mandates; and training is unstable, in that retraining on the same data can yield a different model. The standard's verification techniques largely assume imperative code written from traceable requirements. A tensor of weights is none of those things. Notably, IEC 61508, the parent functional safety standard, has [long recommended against artificial intelligence for higher-integrity safety functions](https://arxiv.org/pdf/1910.06715) for exactly these reasons.

The statistics of validation are no kinder. RAND's much-cited analysis showed that demonstrating autonomous vehicle safety by road testing alone would require [hundreds of millions to hundreds of billions of miles, corresponding to decades or centuries of fleet operation](https://www.rand.org/pubs/research_reports/RR1478.html). Phil Koopman, the field's most persistent safety voice, locates the residual problem in the heavy tail: an edge case is [a situation for which the computer driver has inadequate training data, and there are more of them than the industry can enumerate in the foreseeable future](https://philkoopman.substack.com/p/whats-the-deal-with-edge-cases-and). His UL 4600 standard responds by requiring a structured safety case rather than prescribed techniques, precisely because prescribed techniques for ML assurance do not yet exist.

Down at the ECU level, the obstacles get concrete. Safety-critical control software must demonstrate worst-case execution time, while neural accelerators are [optimized for average-case throughput, with shared-memory interference that resists formal timing analysis](https://arxiv.org/pdf/2511.11682). At highway speed, a 10 millisecond overrun is roughly a quarter meter of braking distance. Learned perception is [demonstrably fragile to physically realizable adversarial inputs, stickers on a stop sign](https://bair.berkeley.edu/blog/2017/12/30/yolo-attack/), and to the ordinary distribution shift of sensor aging and weather.

The industry's working answer to all of this is architectural, and it is a familiar one to any control engineer: never let the learned component be the last line of defense. Runtime assurance patterns of the [Simplex family pair a high-performance ML controller with a monitor and a verified fallback controller](https://arxiv.org/pdf/2110.03506) that takes authority when safety margins are threatened. The doer may be neural; the checker is classical. ISO/PAS 8800's field monitoring requirements, TÜV Rheinland's blunt concession that [complete verification of AI systems is not possible](https://www.tuv.com/world/en/iso-pas-8800.html), and Mercedes' redundancy-first Level 3 architecture from Part 1 are all the same idea wearing different clothes: bound the learned function with things you can prove.

## Where AI adoption is actually winning: the development process

While on-vehicle AI inches through the certification gate, AI in the development process is walking through an open door, because a mistake made there is caught by the V-model rather than by a guardrail.

The calibration story from Part 1 scales into real numbers. ETAS reports that combining machine-learning-based engine models with automated test execution achieved an [estimated 71 percent effort reduction in an in-vehicle emissions calibration task](https://www.etas.com/en/downloadcenter/39802.php); Gaussian-process virtual engines now stand in for test benches in calibration loops. McKinsey's automotive R&D research reports [generative AI pilots delivering up to 40 percent time savings in coding tasks and 20 to 30 percent in testing and homologation work](https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/automotive-r-and-d-transformation-optimizing-gen-ais-potential-value), and a German tier-one supplier achieving a [70 percent productivity gain, including human review time, generating test vectors for full branch and MC/DC coverage](https://www.mckinsey.com/features/mckinsey-center-for-future-mobility/our-insights/from-engines-to-algorithms-gen-ai-in-automotive-software-development). Woven by Toyota built a MISRA Copilot with Microsoft whose proof of concept [automatically resolved about half of MISRA violations](https://woven.toyota/en/news/agentic-ai-for-a-zero-accident-future/), framed carefully as remediation assistance with human review retained. Scenario-based validation, arguably the most automotive-native AI tooling of all, is commercially established: constrained-random scenario generation with coverage metrics, the Foretellix model, is now [integrated into industrial ADAS validation toolchains](https://www.autonomousvehicleinternational.com/news/adas/avl-partners-with-foretellix-to-advance-ad-and-adas-verification.html). Learned surrogate models compress crash simulations that took [15-plus hours on HPC clusters into seconds on a single GPU](https://docs.nvidia.com/physicsnemo/25.11/physicsnemo/examples/structural_mechanics/crash/README.html).

One discipline holds all of this together, and it deserves stating plainly for anyone tempted to shortcut it: generated artifacts do not inherit trust from their generator. Comparative studies show LLM-generated code carries [systematic MISRA compliance gaps](https://arxiv.org/pdf/2506.23535), and the research groups making LLM codegen work for automotive do it by [wrapping generation in static verification and test-driven refinement loops](https://arxiv.org/html/2506.04038). The V-model does not shrink because the code was written faster. What changes is where engineering hours go: less typing, more specifying and verifying. Readers of this series will recognize the theme, this is the learning loop again, with AI compressing its inner iterations.

## Why the caution is earned

If the constraints above feel heavy, the recent history explains them.

In February 2023, Tesla recalled [362,758 vehicles because FSD Beta could behave unsafely at intersections](https://www.npr.org/2023/02/16/1157521492/tesla-full-self-driving-recall-fsd); in December 2023, after a multi-year federal investigation, it recalled [over two million vehicles, its largest recall ever, for inadequate driver-engagement controls in Autopilot](https://www.consumerreports.org/cars/car-recalls-defects/tesla-recalls-cars-due-to-autopilot-concerns-a6186663858/), and NHTSA subsequently opened a further probe into whether the fix worked. In October 2024, the agency opened an investigation into [FSD behavior in low-visibility conditions covering roughly 2.4 million vehicles](https://static.nhtsa.gov/odi/inv/2024/INOA-PE24031-23232.pdf), following crashes including a pedestrian fatality. The Cruise incident of October 2023, in which a robotaxi struck and then dragged a pedestrian who had been thrown into its path, ended with [suspended permits, a full fleet recall, and a criminal penalty for filing a false report](https://techcrunch.com/2023/11/08/cruise-recalls-entire-fleet-after-robotaxi-ran-over-dragged-pedestrian/), and ultimately with GM [ending Cruise's robotaxi funding after more than 10 billion dollars invested](https://fortune.com/2024/12/10/general-motors-stop-funding-cruise-robotaxi-business/). Ford and VW had already drawn their conclusion in 2022, shutting down Argo AI, with Ford taking a [2.7 billion dollar impairment and redirecting investment toward driver assistance](https://techcrunch.com/2022/10/26/ford-takes-2-7b-hit-on-argo-shutdown-shifts-its-bet-to-driver-assist-tech/).

None of this says automotive AI failed. It says the cost of a wrong model in a two-ton vehicle is measured in lives, permits, and billions, and every safety engineer's instinct to bound, monitor, and gate learned behavior has been repeatedly vindicated by events.

## Conclusion: the learning is real, the learner is the organization

So, can vehicles learn as they run? The honest answer has a satisfying shape to it. The individual vehicle does not learn; it executes validated software and adapts only inside pre-approved envelopes. The fleet, however, learns continuously, through trigger-based data collection, cloud-side retraining, and over-the-air deployment, all gated by the validation machinery that regulation and standards demand. The learning loop exists. It just runs through the organization, not through the car.

Which returns this series to its recurring claim. If the loop runs through the organization, then the binding constraint on automotive AI is not model architecture or silicon; both are advancing on their own momentum. It is how fast an organization can move data from the road to a curated training set, a retrained model through a credible safety case, and a validated update back onto the fleet. The companies pulling ahead in vehicle AI are not the ones with the cleverest networks. They are the ones with the shortest, most disciplined loop, and with the humility to keep a classical controller watching over everything the network does.

The car that learns as it runs may come eventually, and ISO/PAS 8800's field-monitoring lifecycle is a first bridge toward it. But it will arrive the way everything arrives in this industry: not when the algorithm is ready, but when the safety case is.

*Part of the series: Software-Defined Physical Systems. Read [Part 1: AI Enters the Control Loop](/writing/ai-enters-the-control-loop/) first if you have not.*

## Sources and further reading

**The learning loop and its exceptions**

- CodeCompass, [Tesla's data engine: trigger classifiers and shadow mode](https://codecompass00.substack.com/p/tesla-data-engine-trigger-classifiers)
- CARIAD, [Safety and integrity of machine learning in automotive](https://cariad.technology/de/en/news/stories/safety-integrity-machine-learning-automotive.html)
- Wiley CACAIE, [Continual learning and catastrophic forgetting in driving models](https://onlinelibrary.wiley.com/doi/10.1111/mice.13503) (2025)
- Hyundai, [SCC-ML machine learning based smart cruise control](https://www.hyundainews.com/en-us/releases/2887) (October 2019)
- NVIDIA, [NIO Adam and local training provisions](https://blogs.nvidia.com/blog/nio-selects-nvidia-intelligent-electric-vehicles/); [Cross-border federated learning for AV development](https://developer.nvidia.com/blog/federated-learning-in-autonomous-vehicles-using-cross-border-training/)

**Regulation and standards**

- UK Vehicle Certification Agency, [UNECE R155 and R156 overview](https://www.vehicle-certification-agency.gov.uk/connected-and-automated-vehicles/cyber-security-and-software-updating/); msg group, [Software identification using RxSWIN](https://www.msg.group/en/publications/software-identification-using-rxswin-for-homologation)
- ISO, [ISO/PAS 8800:2024 Road vehicles, Safety and artificial intelligence](https://www.iso.org/standard/83303.html); TÜV Rheinland, [ISO/PAS 8800 explainer](https://www.tuv.com/world/en/iso-pas-8800.html); UL Solutions, [How ISO/PAS 8800 addresses AI safety](https://www.ul.com/sis/blog/safety-related-systems-road-vehicles-artificial-intelligence-are-addressed-isopas-88002024)
- Wayve, [The 2025 UNECE ADS type-approval framework](https://wayve.ai/thinking/a-global-regulatory-breakthrough-for-assisted-and-automated-driving/); Taylor Wessing, [The EU AI Act and the automotive industry](https://www.taylorwessing.com/en/interface/2024/ai-act-sector-focus/eu-ai-act-and-the-automotive-industry)

**The certification problem**

- Salay, Queiroz, Czarnecki, [An analysis of ISO 26262: using machine learning safely in automotive software](https://arxiv.org/abs/1709.02435)
- Kalra, Paddock (RAND), [Driving to Safety: how many miles would it take?](https://www.rand.org/pubs/research_reports/RR1478.html) (2016)
- Phil Koopman, [What's the deal with edge cases and autonomous vehicles?](https://philkoopman.substack.com/p/whats-the-deal-with-edge-cases-and) (June 2026); [UL 4600 resources](https://users.ece.cmu.edu/~koopman/ul4600/index.html)
- BAIR, [Physical adversarial examples against deep neural networks](https://bair.berkeley.edu/blog/2017/12/30/yolo-attack/) (2017)
- [Runtime assurance for safety-critical systems (Simplex architectures)](https://arxiv.org/pdf/2110.03506)

**AI in development, and the record**

- ETAS, [ML-based calibration effort reduction](https://www.etas.com/en/downloadcenter/39802.php); McKinsey, [Automotive R&D transformation: optimizing gen AI's potential value](https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/automotive-r-and-d-transformation-optimizing-gen-ais-potential-value) and [From engines to algorithms](https://www.mckinsey.com/features/mckinsey-center-for-future-mobility/our-insights/from-engines-to-algorithms-gen-ai-in-automotive-software-development)
- Woven by Toyota, [Agentic AI for a zero-accident future (MISRA Copilot)](https://woven.toyota/en/news/agentic-ai-for-a-zero-accident-future/)
- TUM/CeCaS, [LLMs for software development and verification in safety-critical systems](https://arxiv.org/html/2506.04038); [LLM code generation vs MISRA C++ compliance](https://arxiv.org/pdf/2506.23535)
- NPR, [Tesla FSD Beta recall of 362,758 vehicles](https://www.npr.org/2023/02/16/1157521492/tesla-full-self-driving-recall-fsd) (February 2023); Consumer Reports, [Tesla's two-million-vehicle Autopilot recall](https://www.consumerreports.org/cars/car-recalls-defects/tesla-recalls-cars-due-to-autopilot-concerns-a6186663858/) (December 2023); NHTSA, [PE24031 opening resume](https://static.nhtsa.gov/odi/inv/2024/INOA-PE24031-23232.pdf) (October 2024)
- TechCrunch, [Cruise recalls entire fleet](https://techcrunch.com/2023/11/08/cruise-recalls-entire-fleet-after-robotaxi-ran-over-dragged-pedestrian/) (November 2023); Fortune, [GM stops funding Cruise robotaxi business](https://fortune.com/2024/12/10/general-motors-stop-funding-cruise-robotaxi-business/) (December 2024); TechCrunch, [Ford's Argo AI shutdown](https://techcrunch.com/2022/10/26/ford-takes-2-7b-hit-on-argo-shutdown-shifts-its-bet-to-driver-assist-tech/) (October 2022)
