---
title: Propulsion Control Software for Autonomous Electric Haulers
company: "Volvo Construction Equipment"
deliveryContext: "Client assignment: Volvo Construction Equipment · Delivered through ALTEN"
context: Autonomous Heavy-Duty Machinery
description: Developed and integrated traction-control functionality for the TA15 autonomous electric hauler, coordinating dual-motor propulsion and validating predictable speed behavior from software-in-the-loop through vehicle field testing.
tags: [Traction control, Torque allocation]
image: ../../assets/projects/autonomous-hauler-propulsion.webp
imageAlt: Autonomous electric haulers operating in a quarry
objective: "An autonomous hauler has to keep moving predictably while terrain, load, grip, and propulsion demand change underneath it. This work focused on making dual-motor electric propulsion behave as one controllable system: translating speed demand into coordinated torque, monitoring the behavior of the propulsion path, and validating the result in harsh off-road conditions."
heroTitle: Making autonomous electric-hauler propulsion predictable in harsh terrain
overviewDescription: The project connected traction-control strategy, dual-motor torque allocation, diagnostics, embedded software integration, and vehicle test results for Volvo CE's TA15 autonomous electric hauler. The validation path moved from unit tests and SIL/HIL to field testing.
roleScopeTitle: Owning the control path from propulsion demand to vehicle behavior
constraintsTitle: Controlling two motors across changing terrain, load, and grip
processTitle: Building confidence from software tests to off-road validation
deliverablesTitle: Delivering integrated traction-control functions for an autonomous hauler
reflectionTitle: Making autonomy predictable at the point where software meets the ground
role: Senior Development Engineer
roleScope: Owned the development and integration of propulsion-control functionality for the autonomous hauler programme. The scope covered speed-control behavior, torque allocation between the two electric motors, diagnostic monitoring, software integration, and the validation record needed to move from controlled tests toward vehicle operation.
contribution: Developed and integrated real-time control logic that translated vehicle speed demand into coordinated propulsion torque. Led unit-test development and contributed to the SIL/HIL and vehicle-validation path, using test results and vehicle data to assess tracking behavior, integration quality, and the response of the propulsion system in off-road operation.
collaborators: Cross-functional work with autonomy, embedded software, electronics, controls, testing, and vehicle-integration teams in the Volvo CE development environment.
toolsAndMethods: [Traction control, Torque allocation, Speed control, Diagnostic monitoring, Unit testing, SIL, HIL, Requirements engineering, Vehicle validation, Data analysis]
constraints: As material-handling equipment moves toward more autonomous and electrified operation, predictable low-level propulsion is a prerequisite for the autonomy system to move safely and productively through changing terrain, load, and grip. The control functions had to operate within a real-time embedded software environment while coordinating two propulsion motors and responding to changing terrain, vehicle load, traction conditions, and autonomous speed demands. Validation also had to account for the gap between repeatable software tests and variable off-road vehicle behavior.
risks: The main risks were inconsistent torque sharing, speed oscillation or tracking loss, wheel-slip-related behavior, invalid or delayed signals, and degraded propulsion behavior that could reduce the autonomy system's ability to follow its intended path safely and predictably.
process: Started by translating propulsion and vehicle-behavior requirements into testable control and integration expectations. Developed the control logic and unit tests, exercised the functions through SIL/HIL, then used vehicle integration and field testing to compare commanded and measured speed behavior. Field data was used to identify remaining deviations and guide integration and validation decisions.
decisions: Treated torque allocation and traction behavior as part of one propulsion-control problem rather than as isolated motor functions. Used staged validation to expose software and interface issues before vehicle testing, and kept diagnostic monitoring and test data close to the control implementation so that degraded or unexpected behavior could be investigated rather than judged only from the final speed trace.
deliverables: Delivered integrated traction-control and speed-control functionality for the TA15 autonomous electric hauler, including dual-motor torque-allocation logic, diagnostic monitoring, unit-test coverage, SIL/HIL validation, integration support, and vehicle field-test results.
metrics:
  - label: Vehicle platform
    value: TA15 autonomous electric hauler
  - label: Propulsion architecture
    value: Dual-motor electric drive
  - label: Controler accuracy
    value: 5% speed-tracking error in vehicle validation
  - label: Validation
    value: Unit tests · SIL/HIL · vehicle testing
reflection: "The engineering lesson was that autonomy is only as predictable as the low-level control loops that turn a speed demand into force at the ground. Predictable propulsion requires control logic, diagnostics, software interfaces, and validation results to mature together. This capability supports the industry's wider move toward safer, lower-emission, and more productive material handling, without making those broader outcomes a claim about this assignment."
---

This project shows how control intelligence becomes useful on a real machine: a high-level autonomous demand must become coordinated motor torque, stable traction behavior, and test results showing how the vehicle performs outside the lab.
