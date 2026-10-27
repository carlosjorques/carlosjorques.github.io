---
title: "Combustion control that corrects a diesel engine within each cycle"
seoTitle: "In-cycle combustion control for Scania"
description: "Carlos Jorques built in-cycle combustion control for a Scania diesel engine. On the engine, it halved cycle-to-cycle variation and detected 96% of misfires."
context: "Heavy-duty diesel engines"
eyebrow: "Scania · Lund University · Heavy-duty diesel engines · 2016–2021"
intro: "I designed and tested software that measures combustion inside a running Scania truck engine and **corrects the fuel injection before the cycle ends**, so the engine can burn renewable fuels efficiently within its limits."
facts:
  - label: "Role"
    value: "**Industrial PhD Researcher**"
  - label: "Delivery"
    value: "Employed by Scania and enrolled at Lund University (2016–2021), with co-funding from the Swedish Energy Agency"
  - label: "Team"
    value: "Two supervisors (Scania and Lund), the test-cell technicians I coordinated, other PhD students, and eight students I mentored"
  - label: "Skills"
    value: "Virtual sensing · diagnostics and fault detection · predictive control · stochastic optimisation · FPGA real-time implementation · MATLAB/Simulink · LabVIEW · engine test-cell experiments"
updated: 2026-10-27
metrics:
  - value: "50%"
    label: "less cycle-to-cycle variation in the controlled combustion values"
  - value: "96%"
    label: "of pilot misfires detected before the main injection"
  - value: "up to +1.8%"
    label: "indicated efficiency at low load, against open loop"
  - value: "15 · 4"
    label: "published articles · granted patents"
metricsNote: "Research results on a six-cylinder 12.7 L Scania D13 engine with diesel, HVO and RME; the pressure sensor is not in production engines. The efficiency gain comes from a set-point optimisation built on the reduction in variation, within the limit on the pressure-rise rate. Indicated efficiency is the share of fuel energy that the gas delivers to the piston, and the gain is absolute."
glance:
  - label: "The need"
    text: "Renewable diesel fuels ignite differently from fossil diesel, so engines calibrated in advance keep wide safety margins, and those margins cost fuel in every cycle."
  - label: "My role"
    text: "**I defined the system architecture and led the research** from the problem definition to the engine tests. I was lead author on 14 of the 15 articles and presented each one at an international conference, where one talk received an **SAE award for best oral presentation**."
  - label: "Key work"
    text: "Software that estimates the combustion from the cylinder pressure and corrects the injection of the same cycle within microseconds, on an FPGA. A fast estimate that feeds a correction within a hard deadline is the same problem in power electronics and robotics."
  - label: "Result"
    text: "**Half the variation between cycles** on three fuels and **up to +1.8% indicated efficiency** at low load. **Scania still uses parts of the models**, the misfire handling and a virtual pressure sensor built partly on this work."
schema:
  keywords: "virtual sensing, diagnostics, fault detection, predictive control, stochastic optimisation, FPGA, real-time control, state machines, MATLAB/Simulink, LabVIEW, heavy-duty diesel engines, renewable fuels"
  about:
    - name: "Closed-loop combustion control"
    - name: "Virtual sensing"
    - name: "Field-programmable gate array"
      sameAs: "https://en.wikipedia.org/wiki/Field-programmable_gate_array"
  mentions:
    - { type: "Organization", name: "Scania", sameAs: "https://www.scania.com/" }
    - { type: "CollegeOrUniversity", name: "Lund University", sameAs: "https://www.lu.se/" }
    - { type: "ScholarlyArticle", name: "Indicated efficiency optimization by in-cycle closed-loop combustion control of diesel engines", sameAs: "https://doi.org/10.1016/j.conengprac.2022.105097" }
    - { type: "Thesis", name: "Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections", url: "https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf" }
---

## Every cycle and fuel burns differently

Trucks have to cut CO₂ now, and renewable fuels such as HVO (hydrotreated vegetable oil) and RME (rapeseed biodiesel) do it without new infrastructure. However, a diesel engine runs open loop: it injects what its calibration maps say and never checks the result. Hence, the maps keep safety margins that hold for any fuel, production tolerance, level of ageing and random cycle, and those margins cost fuel in every cycle.

Closing the loop lets the engine react to what actually burns, and the faster it reacts, the tighter the margins can be. Scania wanted to know whether a pressure sensor could show the pilot combustion in time for the main injection of the same cycle to correct it, and whether the gain would justify a sensor in every cylinder. That question started my PhD.

## University research shaped by Scania's expertise

**I owned the research end to end**, from the questions to the real-time code, tests and articles, whilst Scania's engine developers kept it close to production constraints. My areas were:

- **Architecture:** the full system and its in-cycle control.
- **Virtual sensing and diagnostics:** estimators for quantities no production sensor measures, such as the pilot fuel burnt, and misfire detectors.
- **Control and real-time implementation:** predictive controllers with online model adaptation, coded on an FPGA, and the hardware a product would need.
- **Experiments:** test plans and runs in the Lund University test cell, coordinating the technicians for every engine change.
- **People:** mentoring six master's thesis students and two summer workers.

## In-cycle control that makes combustion repeatable and efficient

A diesel injection often comes in two parts. A small *pilot injection* of a few milligrams ignites first and prepares the cylinder, and the *main injection* follows a few milliseconds later and gives most of the work. The control reads the pilot combustion from the cylinder pressure and adjusts the main injection of the same cycle. It runs as two nested loops (Figure 1): the outer one corrects from cycle to cycle, and the inner one within the cycle.

<figure>
  <img src="/images/blog/predictive-in-cycle-control/thesis-cl-structure.svg" alt="Control architecture: strategy coordination and a cycle-to-cycle controller set the reference for an in-cycle loop, where an observer, a controller manager and an in-cycle controller correct the injection of the same combustion." loading="lazy" />
  <figcaption>Figure 1. The control architecture. The in-cycle loop (dotted box) sits inside the cycle-to-cycle loop and corrects the injection before the combustion ends.</figcaption>
</figure>

At 1200 rpm the pressure is sampled every 27 microseconds, and filtering, estimation, diagnosis and control all have to fit between two samples. I defined the system architecture across three levels by time scale: a PC for the operator, a real-time processor at 100 Hz for the outer loop, and an FPGA (a chip whose logic runs in parallel with fixed timing) for the inner loop. That timing led to four decisions:

- **In-cycle control on an FPGA:** correcting the next cycle is simpler, but it cannot react to a pilot that misfires now. On the engine, in-cycle control halved the average error of the cycle-to-cycle controller. The cost is a tight resource budget on the chip. When the six-cylinder version ran out of logic, I redesigned the code into modules that the cylinders share in turn, which saved 40% of the logic slices, and I specified the larger FPGA a product would need. ([Real-time implementation](/writing/real-time-combustion-control-implementation/))
- **Probabilistic misfire detection:** a fixed pressure threshold works at one operating point and fails at the next. I modelled misfire as a probability that depends on the operating conditions and the fuel, at the cost of a statistical calibration per detector. Detection reached 96% before the main injection, close to the 98% the physics allows. ([Fault detection](/writing/stochastic-fault-detection-diagnostic-decision-logic/) · [virtual sensing](/writing/virtual-sensing-in-cycle-combustion-diagnostics/))
- **Predictive control:** my first controller pushed efficiency directly and gained +0.42% indicated efficiency, but the non-linear combustion limited it. I replaced it with four controllers that track predicted combustion timing, pilot mass and load, with models that adapt online, at the cost of the modelling and adaptation logic. ([Predictive control](/writing/predictive-in-cycle-combustion-control/))
- **A modular supervisor:** three state machines linked by events swap each prediction for its measurement the moment it exists. New controllers plug in without touching the rest, and it gave the smallest spread of the three designs I compared.

I built the models in MATLAB/Simulink and the real-time code in LabVIEW on a Xilinx Virtex-5 FPGA. The models were calibrated for diesel only, so HVO and RME tested the adaptation. The engine load with the first in-cycle controller is plotted in Figure 2 against open loop, with the pilot fuel disturbed on purpose.

<figure>
  <img src="/images/work/phd-fig2-in-cycle-vs-open-loop.svg" alt="Two plots over 1600 engine cycles, closed loop on the left and open loop on the right. Top: the engine load around 10 bar stays within plus or minus 0.36 bar in closed loop and 0.47 bar in open loop. Bottom: the pilot fuel jumps between about minus 13 and plus 7 mg; in closed loop the main injection changes by up to 16 mg each cycle to compensate, in open loop it stays near zero." loading="lazy" />
  <figcaption>Figure 2. The first in-cycle controller on the engine, at 10 bar load and 1200 rpm, with the pilot fuel disturbed on purpose. Left: closed loop; right: open loop. Top: engine load; bottom: pilot fuel error and main-injection correction per cycle.</figcaption>
</figure>

In closed loop, 95% of the cycles stay within ±0.36 bar of the target load, against ±0.47 bar in open loop. The reason is visible in the lower plots: the main injection changes by up to 16 mg to compensate each pilot error within the same cycle, whereas in open loop it does not react.

Lower variation also lets the set-point move closer to the limits. A stochastic optimisation of the set-point, built on the variation measured on the engine, **raised the indicated efficiency by up to +1.8%** at low load against open loop, within the limit on the pressure-rise rate. ([Set-point optimisation](/writing/stochastic-set-point-optimization-efficiency/))

## Models and methods Scania uses beyond the research

Production engines do not carry a pressure sensor in every cylinder, so in-cycle control is not in trucks today. Still, **parts of my models are used in calibration and optimisation**, a virtual pressure sensor for safety was developed partly from this research, and the way misfire is handled today is partly based on it. Scania also got a hardware specification for in-cycle control and **four granted patents**.

The predictive models have had the widest use. A model that predicts what the process will do next, and adapts online when it drifts, is the idea I now use in the [predictive thermal control for Scania's electric trucks](/work/electric-truck-thermal-management/); only the time scale changed, from microseconds to minutes. The articles are cited by research at [TU Eindhoven](https://doi.org/10.1016/j.ifacol.2023.10.1011), [Oak Ridge National Laboratory](https://doi.org/10.1177/14680874241226580) and [TU Wien](https://doi.org/10.4271/2026-01-5028).

## What the PhD taught me about leading engineering work

The PhD moved me from solving the problem in front of me to filling gaps in what is known, and taught me to organise the work by myself. These are the lessons I pass on to new PhD students and young engineers:

- **Plan the work around the desired outcome:** I was advised to start drafting each article before the experiments were finished. A draft forces the author to state the problem, the hypothesis and how to confirm it, so each test campaign has a clear goal. I still ask my team to organise research projects this way.
- **Start new ideas from a known gap:** new solutions rarely come from one bright idea. They come from knowing the literature well enough to see which problems it has not solved. In my team, every new idea starts by naming the gap it fills.
- **Share early, learn faster:** as an industrial PhD student, I had Scania's engine experts next to me, and the greatest benefit came from sharing results early and hearing what was useful to them. I still ask for feedback early, and I encourage my team to do the same.
- **Give people room to grow:** my supervisors often pointed out a direction and left the answer to me, which taught me to think further. In my teams, that means clear goals, the support each person needs and space to propose their own solutions.

More detail is in the [article series on in-cycle combustion control](/writing/controlling-combustion-while-it-happens/), the [open-access thesis](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf) and the [journal summary](https://doi.org/10.1016/j.conengprac.2022.105097).

*All results on this page are public in the thesis and articles. Scania's later use is described in general terms, and the patents are mentioned by count only.*
