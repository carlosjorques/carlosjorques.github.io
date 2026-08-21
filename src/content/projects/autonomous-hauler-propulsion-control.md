---
title: Propulsion Control Software for Autonomous Electric Haulers
company: Volvo Construction Equipment
context: Autonomous Heavy-Duty Machinery
description: Developed and integrated traction-control functionality for the TA15 autonomous electric hauler, coordinating dual-motor propulsion and validating predictable speed behaviour from software-in-the-loop through vehicle field testing.
tags: [Traction control, Torque allocation]
image: ../../assets/projects/autonomous-hauler-propulsion.webp
imageAlt: Autonomous electric haulers operating in a quarry
objective: "An autonomous hauler has to keep moving predictably while terrain, load, grip, and propulsion demand change underneath it. This work focused on making dual-motor electric propulsion behave as one controllable system: translating speed demand into coordinated torque, monitoring the behaviour of the propulsion path, and validating the result in harsh off-road conditions."
heroTitle: Making autonomous electric-hauler propulsion predictable in harsh terrain
overviewTitle: Coordinating traction and torque so an autonomous hauler can keep moving with confidence
overviewDescription: The project connected traction-control strategy, dual-motor torque allocation, diagnostics, embedded software integration, and vehicle evidence for Volvo CE's TA15 autonomous electric hauler. The validation path moved from unit tests and SIL/HIL to field testing, where speed-tracking error remained within 5%.
overviewFocus: Traction control, dual-motor propulsion, and autonomous vehicle behaviour
overviewScope: Control strategy, torque allocation, diagnostics, integration, and validation
roleScopeTitle: Owning the control path from propulsion intent to vehicle behaviour
constraintsTitle: Controlling two motors across changing terrain, load, and grip
processTitle: Building confidence from software tests to off-road vehicle evidence
deliverablesTitle: Delivering integrated traction-control functions for an autonomous hauler
outcomesTitle: Field evidence of predictable autonomous propulsion
reflectionTitle: Making autonomy dependable at the point where software meets the ground
role: Senior Development Engineer consultant
roleScope: Owned the development and integration of propulsion-control functionality for the autonomous hauler programme. The scope covered speed-control behaviour, torque allocation between the two electric motors, diagnostic monitoring, software integration, and the validation evidence needed to move from controlled tests toward vehicle operation.
contribution: Developed and integrated real-time control logic that translated vehicle speed demand into coordinated propulsion torque. Led unit-test development and contributed to the SIL/HIL and vehicle-validation path, using test evidence and vehicle data to assess tracking behaviour, integration quality, and the response of the propulsion system in off-road operation.
collaborators: Cross-functional work with autonomy, embedded software, electronics, controls, testing, and vehicle-integration teams in the Volvo CE development environment.
toolsAndMethods: [Traction control, Torque allocation, Speed control, Diagnostic monitoring, Unit testing, SIL, HIL, Requirements engineering, Vehicle validation, Data analysis]
constraints: The control functions had to operate within a real-time embedded software environment while coordinating two propulsion motors and responding to changing terrain, vehicle load, traction conditions, and autonomous speed demands. Validation also had to account for the gap between repeatable software tests and variable off-road vehicle behaviour.
risks: The main risks were inconsistent torque sharing, speed oscillation or tracking loss, wheel-slip-related behaviour, invalid or delayed signals, and degraded propulsion behaviour that could reduce the autonomy system's ability to follow its intended path safely and predictably.
process: Started by translating propulsion and vehicle-behaviour requirements into testable control and integration expectations. Developed the control logic and unit tests, exercised the functions through SIL/HIL, then used vehicle integration and field testing to compare commanded and measured speed behaviour. Field data was used to identify remaining deviations and guide integration and validation decisions.
decisions: Treated torque allocation and traction behaviour as part of one propulsion-control problem rather than as isolated motor functions. Used staged validation to expose software and interface issues before vehicle testing, and kept diagnostic monitoring and test evidence close to the control implementation so that degraded or unexpected behaviour could be investigated rather than judged only from the final speed trace.
deliverables: Delivered integrated traction-control and speed-control functionality for the TA15 autonomous electric hauler, including dual-motor torque-allocation logic, diagnostic monitoring, unit-test coverage, SIL/HIL validation, integration support, and vehicle field-test evidence.
metrics:
  - label: Vehicle platform
    value: Volvo CE TA15 autonomous electric hauler
  - label: Propulsion architecture
    value: Dual-motor electric drive
  - label: Field evidence
    value: Speed-tracking error within 5%
  - label: Validation path
    value: Unit tests · SIL/HIL · vehicle testing
reflection: "The work reinforced a practical rule for autonomous machines: autonomy is only as dependable as the low-level control loops that turn its intent into force at the ground. Predictable propulsion requires control logic, diagnostics, software interfaces, and vehicle evidence to be developed as one system."
---

This project shows how control intelligence becomes useful on a real machine: a high-level autonomous demand must become coordinated motor torque, stable traction behaviour, and evidence that the vehicle performs predictably outside the lab.
