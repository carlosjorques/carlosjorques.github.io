---
title: "Software processes and a motor temperature model for MAHLE’s advanced engineering"
seoTitle: "MAHLE motor temperature model and A-SPICE"
description: "Carlos Jorques helped MAHLE adopt its first A-SPICE practices, led its e-bike software and co-developed a motor temperature model with under 2% error."
context: "Electric drives"
eyebrow: "MAHLE Electronics · Electric drives · 2022–2023"
intro: "I helped MAHLE Electronics' advanced engineering team consolidate how it develops software, so that its concepts reach the product departments ready for what vehicle makers demand. **As Scrum Master**, I ran the team’s sprints; I also **led the software planning of an e-bike motor-control project** and **co-developed a real-time model** that estimates the temperature inside an electric motor."
facts:
  - label: "Role"
    value: "Development Software Engineer · **Scrum Master · technical lead of the e-bike software**"
  - label: "Delivery"
    value: "Employed by MAHLE Electronics in Valencia, Spain"
  - label: "Team"
    value: "12 engineers in the sprints I ran and 6 in the e-bike project, within a department of 16 engineers across Spain and Germany"
  - label: "Skills"
    value: "A-SPICE · ISO 26262 · Scrum · virtual sensing and thermal modelling · MATLAB/Simulink with TargetLink · Classic AUTOSAR on AURIX · CAN and Vector tools (CANalyzer, CAPL) · DC/DC converter software"
updated: 2026-10-27
metrics:
  - value: "A-SPICE"
    label: "first steps to level 2 adopted: a requirements template and versioned baselines"
  - value: "< 2%"
    label: "motor temperature error against the winding temperature"
  - value: "0–6000 rpm"
    label: "speed range of the validation, on test data not used for calibration"
  - value: "0"
    label: "sensors added to the motor; the model runs in software next to the motor controller"
metricsNote: "Pre-development (concept stage) work. At A-SPICE level 2, each process is planned and monitored, and its work products are controlled. The model error is against thermocouples in the windings, at around 100 °C, with a 98% confidence interval."
glance:
  - label: "The need"
    text: "Vehicle makers assess how a supplier develops software (A-SPICE) and handles functional safety (ISO 26262). An electric motor can only use its full power if the drive knows its hottest temperature, which no production sensor measures."
  - label: "My role"
    text: "**Scrum Master, technical lead of the e-bike software** and analyst in the A-SPICE working group; co-developer of the motor temperature model."
  - label: "Key work"
    text: "A gap analysis of the software processes (SWE.1 to SWE.6), first steps towards A-SPICE level 2, one maintained version of the shared Classic AUTOSAR platform, and a layered thermal model that runs next to the motor controller. Battery cells and power converters need the same kind of virtual sensor."
  - label: "Result"
    text: "First steps towards A-SPICE level 2 adopted (a requirements template and versioned baselines), a roadmap for the e-bike software and **a motor temperature model with less than 2% error**, which allows for more usable power from the same motor."
schema:
  keywords: "A-SPICE, ISO 26262, Scrum, Classic AUTOSAR, AURIX, virtual sensing, thermal modelling, PMSM, MATLAB/Simulink, TargetLink, CAN, CANalyzer, CAPL, DC/DC converters"
  about:
    - name: "Automotive SPICE"
      sameAs: "https://en.wikipedia.org/wiki/Automotive_SPICE"
    - name: "Permanent magnet synchronous motor thermal modelling"
    - name: "Virtual sensing"
  mentions:
    - { type: "Organization", name: "MAHLE", sameAs: "https://www.mahle.com/" }
    - { type: "Thing", name: "AUTOSAR", sameAs: "https://en.wikipedia.org/wiki/AUTOSAR" }
    - { type: "Thing", name: "ISO 26262", sameAs: "https://en.wikipedia.org/wiki/ISO_26262" }
    - { type: "Thing", name: "Scrum", sameAs: "https://en.wikipedia.org/wiki/Scrum_(software_development)" }
---

## Vehicle makers assess how their suppliers develop software

MAHLE builds electric drives and power electronics for vehicle makers and e-bike brands, such as [e-motors](https://www.mahle.com/en/products-and-services/emobility/electric-drive-systems/), [inverters, on-board chargers and DC/DC converters](https://www.mahle.com/en/products-and-services/emobility/electronics/) and [e-bike drive systems](https://mahle-smartbike.com/). Before buying them, vehicle makers ask for an A-SPICE capability level, a measure of how mature the software development process is, and for compliance with ISO 26262, the functional-safety standard for road vehicles.

The advanced engineering department of MAHLE Electronics took early concepts through pre-development (the concept stage) and handed them over to the product departments. We were 8 engineers in Valencia and 8 in Germany. Most concepts ran on a shared in-house platform on an Infineon AURIX board with Classic AUTOSAR, the standard software architecture for automotive control units. However, many of the department's processes were still to be consolidated. A concept developed without traceable requirements and tests has to be rebuilt by the product department before release, which loses part of the time gained in pre-development.

## In a small team, each engineer covers several areas

Mine were:

- **Development processes:** in the working group preparing for A-SPICE level 2, I analysed the requirements against our practices, assessed the risk of each gap and built the roadmap for the first steps.
- **Scrum Master:** sprint planning and task breakdown for 12 engineers working on several projects at once.
- **E-bike motor control:** technical lead of the 6-person software team developing e-bike motor control on the shared platform. I drafted the roadmap, prioritised and estimated the tickets, and planned the integration from the first sprints, when integration problems are still cheap to fix.
- **Motor temperature model:** co-developed with a PhD student in Germany, who ran the test-bench experiments. My part was the model structure, the data analysis, the calibration and the evaluation.
- **DC/DC converter software:** the CAN layer and functions such as reporting the maximum available power, so that the vehicle limits its demand before the converter derates.

## A gap analysis set the first steps towards A-SPICE level 2

A-SPICE describes software development as a V: requirements and design down the left side, and the tests that check each of them up the right side. The working group analysed each process from SWE.1 (software requirements) to SWE.6 (software qualification testing), with the focus on the left side and unit verification, where an early concept takes its shape. We also analysed how ISO 26262 could be deployed alongside A-SPICE. Two decisions shaped our proposals:

- **Systematic work with room to explore:** advanced engineering changes direction often, and a full process for every concept would slow it down. We therefore started with small practices that make the work systematic, at the cost of a slower path to level 2.
- **One maintained version of the platform:** each project on the platform kept its own copy of the platform software, so a fix in one project never reached the others. We proposed one maintained version that each project configures, at the cost of testing every change for all the projects.

The proposed first steps, and the path of the motor temperature model through the same processes, are illustrated in Figure 1. The department adopted **a common requirements template and versioned baselines** as its first practices, so that a product department can take over a model such as this one without rebuilding it.

<figure>
  <img src="/images/work/mahle-fig1-aspice-first-steps.svg" alt="A-SPICE software processes drawn as a V: SWE.1 software requirements, SWE.2 architecture and SWE.3 detailed design on the left, SWE.4 unit verification, SWE.5 integration and SWE.6 qualification on the right. SWE.1 to SWE.4 are marked as the focus of the gap analysis. First steps: a common requirements template with IDs and traceability (adopted), Simulink guidelines and MISRA C checks, model-in-the-loop tests linked to each requirement, and all models and code in SVN with tagged baselines (adopted). The motor temperature model is mapped onto the same processes, from its outputs for derating to its integration on the platform." width="1000" height="495" loading="lazy" />
  <figcaption>Figure 1. The A-SPICE software processes (SWE.1 to SWE.6) as a V model. Orange boxes: focus of the gap analysis; orange text: first steps proposed, marked where adopted; blue text: the motor temperature model in each process.</figcaption>
</figure>

## Estimating the hottest motor temperature allows for more usable power

An electric motor can deliver much more than its nominal power for short periods, until heat stops it. The winding insulation ages fast above its temperature class, and the magnets can lose part of their magnetism when they get too hot. The hottest points sit inside the windings and the rotor, where production motors carry no sensor. Without an estimate, the drive keeps a wide safety margin, and part of the overload capability the customer has paid for is never used ([Kirchgässner et al., 2021](https://doi.org/10.1109/TPEL.2020.3045596)).

The estimate had to run on the motor control unit and follow fast load changes, which led to two decisions:

- **Lumped parameters:** each part of the motor is one mass with a temperature, connected to its neighbours by thermal resistances, as in an electrical circuit (Figure 2). A finite-element model is far too slow for a control unit. The cost is local detail and parameters calibrated on test-bench data.
- **Several layers per part:** I split the stator and the rotor into several layers, from the windings and magnets to the housing and the coolant. One node per part averages away the hot spot, whereas each extra layer adds parameters to calibrate.

<figure>
  <img src="/images/work/mahle-fig2-layered-thermal-network.svg" alt="Generic layered thermal network of a permanent-magnet motor: currents and speed feed a loss model that heats the magnets, stator teeth, windings and stator yoke; a chain of thermal resistances links rotor core, magnets, air gap, teeth, windings, end windings, yoke, housing and coolant; the magnets, windings and end windings are the estimated hot spots used for torque derating." width="1000" height="470" loading="lazy" />
  <figcaption>Figure 2. A generic layered thermal network of a permanent-magnet motor. Each box is a thermal mass with one temperature; the zigzags are thermal resistances. Orange: estimated hot spots; blue: measured inputs. Simplified from published networks; it does not show the structure or parameters of the MAHLE model.</figcaption>
</figure>

In Figure 2, the losses heat the windings, stator and magnets, and the heat flows through the chain of resistances to the housing and the coolant. The hot spots (orange) sit deepest in that chain, where only the test-bench motor had thermocouples.

I calibrated the parameters on one set of test-bench measurements and validated the model on new ones, against thermocouples in the stator and rotor windings, from 0 to 6000 rpm. **The estimation error stayed below 2% of the winding temperature**, with a 98% confidence interval. The model was generated as C code with dSPACE TargetLink and ran in real time on the platform next to the motor controller, so the virtual sensor adds no hardware. It was intended for torque derating close to the real limit, which gives a vehicle maker **more power from the same motor**, and MAHLE **the same power from a smaller motor**.

## What MAHLE taught me about the basics of a development team

The department adopted its first A-SPICE practices, and the motor model estimated the hottest temperature with less than 2% error. I have taken two habits from that work into every team I have led since:

- **Basics first:** versioning, tool licences and shared knowledge are easy to overlook when they work. Without one versioning scheme, a fix in one project can break another; with too few licences, engineers wait for a tool; and when the knowledge of a project sits with one engineer, the project stops whenever that engineer is away. Therefore, before a team plans its features, I check that these basics are in place.
- **Process change from the engineers' own work:** the sprint board reflected the work done only when the engineers who did it could shape their own tasks. In the same way, the department adopted the practices that engineers could use the next day. My process changes start from the work engineers already recognise as their own.

*This page uses only public information and my own description of the work; the figures are generic and show no MAHLE data. My work was in pre-development and is not claimed as part of a specific product.*
