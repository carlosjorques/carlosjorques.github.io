---
title: Real-Time Combustion Control and Virtual Sensing Methods
company: Lund University / Scania
context: Heavy-Duty Engine Control Research
description: Developed and experimentally validated real-time diagnostics, virtual sensing, and closed-loop combustion control for a heavy-duty diesel engine running on changing fuels. The research combined model-based algorithms with FPGA implementation and produced 15+ publications and five patent records.
tags: [Diagnostics, Virtual sensing]
image: ../../assets/projects/heavy-duty-engine-diagnostics.webp
imageAlt: Heavy-duty engine test bench with sensors and measurement cables
objective: "Open-loop engine maps assume that the fuel, sensors, and combustion response will behave as expected. This research investigated how a heavy-duty engine could measure combustion inside each cycle, detect uncertainty and misfire, and adjust control decisions in real time so it could operate closer to efficient limits across changing fuels and operating conditions."
heroTitle: Making combustion control measurable, adaptive, and real-time
overviewTitle: A running-engine research platform for sensing, deciding, and acting inside the combustion cycle
overviewDescription: The industrial PhD connected combustion modeling, pressure-based virtual sensing, stochastic diagnostics, predictive control, and deterministic FPGA implementation. The work was demonstrated on a running six-cylinder, 12.7 L Scania D13 engine rather than remaining a simulation-only study.
overviewFocus: Real-time combustion control, diagnostics, and virtual sensing
overviewScope: Modeling, estimation, FPGA implementation, and test-bench validation
roleScopeTitle: Pushing combustion control from simulation into a running heavy-duty engine
constraintsTitle: Making in-cycle sensing and control deterministic at microsecond scale
processTitle: Turning combustion measurements into adaptive control decisions
deliverablesTitle: Delivering validated methods for alternative-fuel combustion control
outcomesTitle: Evidence that advanced control can survive real engine variability
reflectionTitle: A research foundation for production-oriented control intelligence
role: Industrial PhD researcher
roleScope: Led the research from problem definition and model development through algorithm design, real-time implementation, experimental planning, data analysis, and interpretation. The work sat at the boundary between control theory, embedded computation, engine behavior, and evidence from a physical test bench.
contribution: Developed virtual sensors for pilot fuel-mass estimation and heat-release evaluation; probabilistic and adaptive methods for pilot-misfire detection; predictive and stochastic closed-loop controllers for pilot-main injection; and modular controller structures that could operate across a range of conditions. The methods were implemented and evaluated using pressure feedback, crank-angle information, MATLAB/Simulink, LabVIEW, and FPGA-based real-time execution.
collaborators: Industrial research with Scania and Lund University, supported by the Swedish Energy Agency, working with engine-control, combustion, measurement, and laboratory teams. The work also involved conference presentation, peer-reviewed publication, patent activity, and thesis-student collaboration.
toolsAndMethods: [Model-based control, Virtual sensing, Stochastic diagnostics, FPGA real-time implementation, MATLAB/Simulink, LabVIEW, Engine test-bench validation]
constraints: At 1200 rpm, a 0.2-degree crank-angle sampling window is approximately 27 microseconds. Pressure processing, heat-release calculation, estimation, diagnostic decisions, and control updates therefore had to meet deterministic timing while using hardware resources carefully. The experiments also had to account for cyclic variation, cylinder-to-cylinder differences, nonlinear combustion behavior, sensor uncertainty, and fuel changes including diesel, RME biodiesel, and HVO.
risks: The main risks were model mismatch, weak observability during partial or pilot misfire, fixed thresholds that failed across operating conditions, nonlinear behavior that limited simple controllers, and algorithms that were valuable in theory but too costly or slow for real-time hardware.
process: Started with engine and combustion modeling, then developed estimation and diagnostic methods from measured cylinder-pressure signals. Validated the methods in simulation and offline analysis before integrating them into FPGA-based real-time control. Experiments on the Scania D13 test bench were used to compare operating points, fuel types, controller structures, detection strategies, and stochastic set-points, with results feeding back into model adaptation and implementation choices.
decisions: Used feedback and virtual sensing to replace assumptions that could not remain reliable under fuel variation and combustion uncertainty. Chose probabilistic and adaptive diagnostic methods over single fixed thresholds, and used modular state-machine-oriented controller structures so estimation, detection, set-point selection, and actuation could be evaluated independently. FPGA implementation was treated as part of the control design, not as a final translation step.
deliverables: Delivered experimentally validated methods for in-cycle pilot-mass estimation, pilot-misfire detection, predictive closed-loop combustion control, stochastic set-point optimization, model adaptation, and FPGA resource evaluation. Results included a doctoral thesis, 15+ publications, five patent records, conference contributions, and a research platform that connected advanced algorithms to deterministic embedded execution on a physical heavy-duty engine.
metrics:
  - label: Experimental platform
    value: 6-cylinder, 12.7 L Scania D13
  - label: Real-time constraint
    value: 27 μs crank-angle window
  - label: Diagnostic evidence
    value: Up to 96% misfire classification
  - label: Research record
    value: 15+ publications · 5 patents
reflection: "The research established a foundation that still matters in production controls: a model is useful only when its uncertainty is visible, a diagnostic is useful only when it can support a decision, and an advanced controller is useful only when it can execute deterministically on real hardware."
---

This project translates advanced combustion research into an industrial control story: sensing physical behavior, reasoning under uncertainty, meeting real-time hardware limits, and validating the result on a running heavy-duty engine.
