---
title: Battery and Thermal Control Software for Production Electric Trucks
company: Scania
context: Electrified Trucks
description: Developed production-oriented embedded software for battery, charging, auxiliary, and power-electronics thermal management in heavy-duty electric trucks, within an ISO 26262 ASIL-B and A-SPICE-aligned environment.
tags: [Adaptive AUTOSAR, ISO 26262 ASIL-B]
image: ../../assets/projects/electric-truck-thermal-bms.webp
imageAlt: Electric truck connected to a charger in snowy test conditions
objective: "Electric-truck thermal management is a cross-system control problem: batteries, power electronics, charging, cabin climate, and auxiliary actuators must stay within physical limits while the vehicle remains usable. The work translated those strategies into production-oriented embedded software and validation evidence."
heroTitle: Making thermal behaviour dependable in an electric truck
overviewTitle: Coordinating thermal behaviour across a production electric truck
overviewDescription: The work connected battery, charging, auxiliary, and power-electronics functions through model-based embedded control. It linked system intent to real-time software, diagnostics, calibration, and evidence from simulation through vehicle testing.
overviewFocus: Battery, charging, and thermal coordination
overviewScope: Control architecture, embedded software, diagnostics, and validation
role: Led control architecture and integration
roleScope: Led control-software architecture and integration for battery and thermal-management functions, translating model-based strategies into real-time embedded implementation. Ownership covered controller structure, diagnostics, calibration maturity, ECU integration, supplier interfaces, and validation planning.
contribution: Developed control and diagnosis concepts for passive and active cooling across batteries, electric motors, power electronics, cabin climate, fans, heat pumps, valves, pumps, compressors, and chargers. Also contributed to estimation-oriented battery functions related to state of charge, state of power, and state of health.
collaborators: Cross-functional work with software, systems, controls, electronics, testing, calibration, vehicle, supplier, and wider R&D teams across the truck programme.
toolsAndMethods: [Model-based development, Embedded C/C++, Adaptive AUTOSAR, MIL/SIL/HIL, Calibration, Vehicle validation]
constraints: Software had to respect thermal limits, sensor and actuator behavior, real-time timing, charging conditions, vehicle duty cycles, and safety-related requirements. Evidence needed to remain traceable from model behavior and generated software through bench, wind-tunnel, test-track, and on-road validation.
risks: The main risks were model-to-vehicle mismatch, limited fault observability, integration issues across supplier interfaces, and unsafe or inefficient fallback behavior under degraded conditions.
process: Started with system intent and functional requirements, developed and calibrated model-based control logic, integrated real-time software, and iterated across MIL, SIL, HIL, bench, wind-tunnel, test-track, and on-road testing. Data logging, experiments, analysis, debugging, issue tracking, and calibration-maturity reviews connected each stage.
decisions: Modularized the architecture around thermal strategies, supervision, actuator coordination, diagnostics, and fallback behavior. Model-based development and continuous integration were used to surface logic and integration issues before HIL and vehicle testing.
deliverables: Production-oriented C++ and model-based software; controller architecture and integration artifacts; diagnostic and fallback behavior; calibration and data-analysis support; ECU-ready software; and validation evidence across simulation, bench, and vehicle environments. The work also supported functional-safety analysis and patent-application activity.
metrics:
  - label: Production context
    value: Heavy-duty EV
  - label: Safety context
    value: ISO 26262 ASIL-B
  - label: Validation path
    value: MIL / SIL / HIL to vehicle
  - label: Control scope
    value: Battery, charging, and thermal systems
reflection: "This work demonstrates system-level control leadership: connecting physical limits and uncertain sensor evidence to software architecture, diagnostics, validation, and delivery."
---

This project connects embedded control architecture to the physical realities of electrified heavy-duty transport: thermal limits, energy use, charging behavior, sensor evidence, actuator coordination, and the need for predictable behavior in a production vehicle.
