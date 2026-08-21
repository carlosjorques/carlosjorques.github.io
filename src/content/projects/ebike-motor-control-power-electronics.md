---
title: E-Bike Motor-Control Software and Delivery Practices
company: MAHLE
context: E-Bike Motor Control
description: Delivered application-layer motor-control software and improved the way embedded teams tested, integrated, and released it. The work combined model integration, power-electronics interfaces, Automotive SPICE practices, and CI/CD across projects involving approximately 12 engineers.
tags: [Motor control, CI/CD and Automotive SPICE]
image: ../../assets/projects/ebike-motor-control.webp
imageAlt: E-bike motor and crank area after off-road use
objective: "An e-bike motor is a physical system experienced directly by the rider: torque must feel responsive and consistent while the software works within converter, battery, sensor, thermal, and communication limits. This work focused on turning motor-control intent and models into maintainable application software, while making the surrounding development process more testable, traceable, and dependable."
heroTitle: Making e-bike motor control dependable from model to product
overviewTitle: Connecting motor-control behaviour, power electronics, and disciplined software delivery
overviewDescription: The project combined application-layer motor-control development with the engineering practices needed to integrate and release embedded software consistently. It covered model integration, interfaces to the motor-control and power-electronics stack, bench validation, unit testing, Automotive SPICE-oriented development, and CI/CD across projects involving approximately 12 engineers.
overviewFocus: E-bike motor control, embedded software integration, and delivery quality
overviewScope: Application software, model integration, interfaces, verification, and team practices
roleScopeTitle: Bridging control models, embedded application software, and engineering delivery
constraintsTitle: Making rider-facing control behaviour survive real software and hardware interfaces
processTitle: Moving from model integration to repeatable verification and release evidence
deliverablesTitle: Delivering motor-control software and a more reliable development system
outcomesTitle: Evidence of more consistent, traceable software delivery
reflectionTitle: Reliable control depends on the system around the algorithm
role: Senior embedded software developer
roleScope: Owned application-layer motor-control development and the integration boundary between control models, embedded software, and the surrounding power-electronics interfaces. In parallel, helped strengthen the engineering workflow by introducing more consistent unit testing, Automotive SPICE-oriented practices, and CI/CD across projects involving approximately 12 engineers.
contribution: Integrated control behaviour into production-oriented embedded software, clarified interfaces between application logic and the underlying motor-control and power-electronics functions, and supported bench-based verification. As Scrum Master for a six-person cross-functional team, also helped coordinate priorities, dependencies, and delivery practices so technical work could move through the team with clearer ownership and evidence.
collaborators: Worked across controls, embedded software, electronics, power electronics, testing, platform, and product teams, connecting implementation decisions with interface agreements, verification needs, and delivery planning.
toolsAndMethods: [Model-based design, Motor-control integration, Power-electronics interfaces, C/C++, AUTOSAR-oriented architecture, CAN, Unit testing, Automotive SPICE, CI/CD, Jenkins, Bench validation]
constraints: The software had to preserve intended motor behaviour while operating through real interfaces, signal timing, communication paths, converter limits, battery conditions, and thermal constraints. The development process also had to support traceability and repeatable verification without slowing a cross-functional team working across application software, models, electronics, and testing.
risks: The main risks were model-to-code mismatches, unclear ownership at software interfaces, integration regressions, incomplete test coverage, and control behaviour that appeared correct in isolation but failed when combined with power-electronics limits, sensor signals, or the rest of the product software.
process: Started from control-model and product requirements, then connected the intended behaviour to application-software interfaces and implementation boundaries. Used unit tests and bench validation to catch local regressions, strengthened the path from change to verification through CI/CD, and used Automotive SPICE-oriented practices to make requirements, implementation, and evidence easier to follow across the participating teams.
decisions: Treated software delivery practices as part of control quality rather than as separate process work. Favoured explicit interfaces and testable application boundaries so model behaviour could be checked independently from hardware integration, and introduced automation and traceability where they reduced repeated manual effort or made regressions visible earlier.
deliverables: Delivered application-layer motor-control software, model-integration and power-electronics interfaces, bench-validation evidence, unit-test development, and a more consistent CI/CD and Automotive SPICE-oriented delivery approach. The work also included Scrum Master responsibility for a six-person cross-functional team and process improvements spanning projects involving approximately 12 engineers.
metrics:
  - label: Delivery scope
    value: Projects involving approximately 12 engineers
  - label: Team leadership
    value: Scrum Master for a 6-person cross-functional team
  - label: Engineering practices
    value: Unit testing · CI/CD · Automotive SPICE
  - label: Product context
    value: E-bike motor control and power electronics
reflection: "The work reinforced that dependable control is not produced by an algorithm alone. It emerges when model intent, software interfaces, hardware behaviour, verification evidence, and team execution are connected well enough for changes to remain understandable and safe to integrate."
---

This project shows the less visible side of embedded control delivery: making the software around a motor-control algorithm testable, traceable, and easier for a cross-functional team to integrate into a real product.
