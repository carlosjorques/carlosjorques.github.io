---
title: Battery and Thermal Control Software for Production Electric Trucks
company: Scania
context: Electrified Trucks
description: Developed production embedded software for battery, charging, auxiliary, and power-electronics thermal management in heavy-duty electric trucks.
tags: [Adaptive AUTOSAR, ISO 26262 ASIL-B]
image: ../../assets/projects/electric-truck-thermal-bms.webp
imageAlt: Electric truck connected to a charger in snowy test conditions
objective: "Electric-truck thermal management is a cross-system control problem: batteries, power electronics, charging, cabin climate, and auxiliary actuators must stay within physical limits while the vehicle remains usable. The work translated those strategies into production-oriented embedded software and validation results."
heroTitle: Making thermal behavior production-ready in an electric truck
overviewDescription: The work connected battery, charging, auxiliary, and power-electronics functions through model-based embedded control. It linked system requirements to real-time software, diagnostics, calibration, and test data from simulation through vehicle testing.
role: Senior Developer Engineer
roleScope: Led control-software architecture and integration for battery and thermal-management functions, translating model-based strategies into real-time embedded implementation. Ownership covered controller structure, diagnostics, calibration maturity, ECU integration, supplier interfaces, and validation planning.
contribution: Developed control and diagnosis concepts for passive and active cooling across batteries, electric motors, power electronics, cabin climate, fans, heat pumps, valves, pumps, compressors, and chargers. Also contributed to estimation-oriented battery functions related to state of charge, state of power, and state of health.
collaborators: Cross-functional work with software, systems, controls, electronics, testing, calibration, vehicle, supplier, and wider R&D teams across the truck programme.
toolsAndMethods: [Model-based development, Embedded C/C++, Adaptive AUTOSAR, MIL/SIL/HIL, Calibration, Vehicle validation]
roleScopeTitle: Coordinating control architecture across product and supplier boundaries
constraintsTitle: Keeping thermal control within physical and safety limits
processTitle: Moving from system requirements to vehicle validation
deliverablesTitle: Implementing and validating thermal-control software
reflectionTitle: A production lesson from thermal control
constraints: As heavy-duty transport electrifies, coordinated thermal, charging, battery, power-electronics, cabin, and auxiliary control becomes central to keeping vehicles within operating limits and available for their duty cycles. The software had to respect thermal limits, sensor and actuator behavior, real-time timing, charging conditions, vehicle duty cycles, and safety-related requirements. Validation results needed to remain traceable from model behavior and generated software through bench, wind-tunnel, test-track, and on-road testing.
risks: The main risks were model-to-vehicle mismatch, limited fault observability, integration issues across supplier interfaces, and unsafe or inefficient fallback behavior under degraded conditions.
process: Started with system goals and functional requirements, developed and calibrated model-based control logic, integrated real-time software, and iterated across MIL, SIL, HIL, bench, wind-tunnel, test-track, and on-road testing. Data logging, experiments, analysis, debugging, issue tracking, and calibration-maturity reviews connected each stage.
decisions: Modularized the architecture around thermal strategies, supervision, actuator coordination, diagnostics, and fallback behavior. Model-based development and continuous integration were used to surface logic and integration issues before HIL and vehicle testing.
deliverables: Delivered production-oriented C++ and model-based software, controller architecture and integration artifacts, diagnostic and fallback behavior, calibration support, and ECU-ready validation results across simulation, bench, and vehicle environments. The work also supported functional-safety analysis and patent-application activity.
metrics:
  - label: Production context
    value: Heavy-duty EV
  - label: Functional Safety
    value: ISO 26262 ASIL-B
  - label: Validation path
    value: MIL / SIL / HIL to vehicle
  - label: Controlled systems
    value: Thermal management
reflection: "The engineering lesson was that thermal control becomes production-ready only when physical limits, uncertain sensor measurements, software architecture, diagnostics, validation, and supplier integration are treated as one delivery problem. This type of coordination supports usable charging behavior, controlled degraded operation, and vehicle-level software that can be tested and released with confidence."
---

This project connects embedded control architecture to the physical realities of electrified heavy-duty transport: thermal limits, energy use, charging behavior, sensor measurements, actuator coordination, and the need for predictable behavior in a production vehicle.
