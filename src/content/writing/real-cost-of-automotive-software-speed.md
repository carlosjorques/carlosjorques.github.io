---
title: "The Real Cost of Automotive Software Is Speed"
subtitle: Why software-defined vehicles need shorter learning loops, not just more code.
description: A practical argument for why automotive software competitiveness depends on learning speed, system ownership, embedded control competence, and validation discipline in software-defined physical systems.
publishDate: 2026-07-03
readingTime: 17 min read
category: Technical Leadership
tags:
  - Software-defined vehicles
  - Embedded control
  - Automotive software
  - Technical leadership
featured: true
draft: false
---

For many years, automotive software was treated as something downstream of the "real" vehicle.

The vehicle was the engine, the chassis, the transmission, the cabin, the wiring, and the manufacturing system. Software was there to implement functions, coordinate ECUs, satisfy diagnostics, pass validation, and make the physical product behave as specified.

That view is no longer enough.

Vehicles are becoming software-defined physical systems: machines where software does not merely support the product, but increasingly determines what the product can do, how fast it can improve, how safely it can adapt, and how much value it can deliver after production.

The [International Energy Agency describes software-defined vehicles](https://www.iea.org/reports/vehicle-software-and-software-defined-vehicles) as a shift where software determines an increasing share of vehicle functionality, enabled not only by software itself but by a rethinking of the vehicle's electronic and electrical architecture. That distinction matters. This is not just a software trend. It is a product architecture trend.

A software-defined vehicle is not a smartphone on wheels. It is a real-time, safety-critical, energy-constrained physical system. It has sensors, actuators, thermal limits, power limits, timing constraints, diagnostics, cybersecurity requirements, functional safety constraints, calibration dependencies, manufacturing variation, aging components, and customers who experience the final behavior in the real world.

This changes the real bottleneck in automotive development.

The bottleneck is not only code.

It is not only the number of software engineers.

It is not even only software architecture.

The bottleneck is the speed at which an organization can observe real system behavior, understand it correctly, make a technical decision, implement the change safely, validate it, and learn from the result.

That speed depends on much more than tools or headcount. It depends on architecture, ownership, domain knowledge, supplier strategy, validation culture, and the proximity between software engineers and the physical system they are controlling.

After more than twelve years developing embedded control software in the automotive industry, from combustion control ECUs to electrified trucks and production embedded systems, I have seen two very different development models. One is optimized around requirements, suppliers, process maturity, and formal interfaces. The other is built around cross-functional competence, direct collaboration, and engineers who stay close to the machine.

Both models can produce quality.

Only one of them is naturally optimized for fast learning.

In the era of software-defined vehicles, learning speed may become the most important engineering KPI.

<section class="article-callout" aria-labelledby="reader-map-title">
  <h2 id="reader-map-title">The argument in one page</h2>
  <ul>
    <li>Software-defined vehicles expose organizational latency because software, electronics, controls, diagnostics, cybersecurity, validation, and user experience now interact continuously.</li>
    <li>The old supplier-driven model still has value, but it struggles when the product behavior is discovered through iteration rather than fully specified upfront.</li>
    <li>Outsourcing can work for stable, modular work. It becomes risky when the outsourced work is part of the organization's active learning loop.</li>
    <li>AI will help strong engineering teams move faster, but it will not replace system ownership, validation discipline, or physical-system understanding.</li>
    <li>Embedded control is becoming more strategic because the software stack is moving closer to physical behavior, not further away from it.</li>
  </ul>
</section>

## Why this matters now

The pressure is not theoretical.

In the [Global EV Outlook 2026](https://www.iea.org/reports/global-ev-outlook-2026/executive-summary), the IEA reports that global electric car sales grew by 20% in 2025 to exceed 20 million vehicles, reaching one-quarter of all new cars sold. It also reports that electric truck sales more than doubled in 2025, reaching 9% of global truck sales.

Electrification changes more than the propulsion system. It increases the importance of torque control, battery management, thermal management, charging behavior, power electronics, energy optimization, derating strategies, diagnostics, and safety monitoring.

At the same time, software-defined architectures are changing how the vehicle is built and updated. The IEA notes that zonal and centralized E/E architectures reduce wiring complexity and allow more vehicle functionality to be defined and updated through software, including ADAS and battery management improvements over the air.

This creates a hard engineering combination:

- faster software iteration
- higher integration complexity
- stricter cybersecurity expectations
- more safety-related behavior in software
- more dependency on production and fleet data
- more pressure to reduce product cost
- more competition from companies with shorter development loops

The industry is not simply adding software to vehicles. It is changing the product into a continuously evolving physical system.

## The old model worked until the product changed

European automotive companies have traditionally been excellent system integrators.

They learned how to define requirements, distribute work across suppliers, validate components, integrate complex systems, and manufacture vehicles at scale. This model was not accidental. It emerged because cars became too complex for one organization to build everything internally, and because safety, reliability, traceability, and repeatability matter enormously in automotive development.

The classic supplier-driven model has real advantages. It creates structure. It allows parallelization. It enables specialization. It gives purchasing departments flexibility. It allows OEMs to scale vehicle programs across platforms, suppliers, and markets.

Process frameworks such as A-SPICE also helped the industry manage software maturity, traceability, verification, and supplier quality. For safety-critical and production software, that discipline is important. Nobody should romanticize chaotic development in a vehicle that must operate reliably for years.

The problem is not that the old model was wrong.

The problem is that it was optimized for a different kind of product.

The traditional model works best when the desired behavior can be specified relatively clearly upfront, distributed across organizational boundaries, implemented by different parties, and validated later against requirements.

But software-defined vehicles create a different reality. Many features are not fully understood at the beginning. The interaction between software, electronics, control behavior, energy management, thermal limits, cloud services, user experience, diagnostics, cybersecurity, and real-world operation is discovered through iteration.

The more the vehicle becomes software-defined, the more costly it becomes to separate the people who write software from the people who understand the system behavior.

In a conventional ECU-centric development model, organizational friction was expensive.

In a software-defined vehicle model, organizational friction becomes strategic risk.

## Software-defined vehicles expose organizational latency

The shift toward software-defined vehicles is often described in terms of technology: centralized computing, zonal architectures, middleware, service-oriented software, cloud connectivity, over-the-air updates, and continuous deployment.

That is true, but incomplete.

The deeper transformation is organizational.

[McKinsey describes software and E/E architecture](https://www.mckinsey.com/features/mckinsey-center-for-future-mobility/focus-areas/software-defined-vehicles-and-e-e-architecture) as core enablers for autonomous, connected, electric, and shared mobility. [BCG has argued](https://www.bcg.com/publications/2024/auto-software-revs-up-suppliers-switch-gears) that the automotive software and electronics market is becoming a major growth arena for OEMs, suppliers, semiconductor companies, and technology firms.

But market size does not automatically translate into execution capability.

A company can invest billions in software and still move slowly if its organization is built around queues, handovers, fragmented ownership, and late integration.

This is where the automotive industry faces a difficult contradiction. Software-defined vehicles require faster development, but automotive products still require safety, reliability, compliance, deterministic behavior, cybersecurity, and production quality. The solution is not to copy consumer software development blindly. A vehicle cannot be treated like a mobile app.

The real challenge is to bring software speed into a physical-system environment without losing engineering discipline.

Recent research on [deterministic and reliable software-defined vehicles](https://arxiv.org/abs/2407.17287) highlights the need for service-oriented architectures, virtualization, deterministic communication, and orchestration. Those technical building blocks are important. Behind each of them, though, there is also an organizational question:

- Who owns the behavior?
- Who can make the decision?
- Who understands the system well enough to change it?
- Who validates the effect?
- Who sees the production data?
- Who closes the loop?

If those responsibilities are fragmented, the software organization becomes slow no matter how many engineers it hires.

## The fastest teams have the shortest learning loop

In my own experience developing ECU software for combustion control and later electrified trucks, the biggest accelerator was not a tool, a methodology, or a process document.

It was proximity.

When a mechanical engineer needed a new behavior, a calibration change, or an experiment, the software team was close enough to understand the physical problem directly. We could discuss the function, understand the constraints, implement a test version, run it, observe the result, and adjust.

Sometimes the change took days. Sometimes it took weeks. The point is not that everything was easy. The point is that the learning loop was short.

That proximity mattered especially because embedded control software is not abstract. It is software that acts on the physical world.

A control function is not only a block diagram or a C function. It is a decision that affects torque, pressure, current, voltage, temperature, speed, emissions, drivability, energy consumption, safety, comfort, and component durability. The software may be running in an ECU, but the behavior appears in the machine.

This is why testing the system personally can be so valuable.

When the developer is close to the truck, the machine, or the test bench, the log file is not just a collection of signals. It becomes a memory of a real sequence of events. You know when the driver slowed down because the vehicle ahead braked. You know when the road started climbing. You know when the air conditioning was switched on. You know when a sound, vibration, delay, or unexpected behavior appeared even if no sensor captured it directly.

That context makes analysis faster.

Without it, the developer often has to reconstruct the story from signals alone, ask the test engineer what happened, interpret incomplete notes, and make assumptions about what the system experienced. The test may be efficient from a procedural point of view, but part of the understanding is lost in translation.

This is not an argument against professional test teams. Good test engineers are essential. It is an argument against separating implementation knowledge, physical understanding, and test evidence so far apart that the organization spends more time exchanging interpretations than learning from the product.

In software-defined physical systems, the winning organization is the one that can close the loop fastest between physical behavior and software change.

## Process quality is not the same as learning speed

Automotive organizations often treat process maturity as a proxy for quality. That is understandable. In regulated, safety-critical industries, process matters.

But process quality and learning speed are not the same thing.

A process can be mature and still slow.

A requirement can be traceable and still wrong.

A test can be executed correctly and still miss the important behavior.

A supplier can deliver according to specification and still fail to solve the real system problem.

This is especially important in software-defined vehicles because the system behavior is increasingly emergent. Features interact. Updates change assumptions. Power, thermal, communication, diagnostics, cybersecurity, and user experience constraints collide. What looked like a simple software feature may become a cross-domain system issue.

The industry is responding technically with new E/E architectures, service-oriented software, virtualization, middleware, and CI/CD pipelines. Research on [variant-rich software-defined vehicles](https://arxiv.org/abs/2507.19446) points toward automated build-test-deploy flows, integration environments, OTA deployment, rollback mechanisms, and variant management.

Those are necessary capabilities.

But they do not solve the organizational problem by themselves.

A CI/CD pipeline helps if the organization knows what to integrate, who owns the integration, what evidence is required, and how quickly teams can react when something fails. Middleware helps if the platform has clear ownership and stable abstractions. OTA helps if the company has confidence in validation, rollback, cybersecurity, diagnostics, and fleet monitoring.

Tools accelerate good engineering systems.

They do not compensate for unclear ownership.

## The externalization trap

Outsourcing is not the enemy.

Suppliers are essential in automotive. No OEM can or should build every component alone. Specialized companies often have deeper expertise, better tooling, stronger economies of scale, and faster execution in specific domains.

The problem begins when an organization outsources the part of the system it still needs to understand.

This is where the apparent cost of software development becomes misleading. A company may look at hourly rates and conclude that it can save money by moving work to a lower-cost engineering location. That can be true for well-defined, modular, stable work with clean interfaces and strong ownership.

But for complex embedded control, diagnostics, integration, calibration, platform software, and software-defined vehicle behavior, the hidden cost is often not talent quality. Excellent engineers exist everywhere, including India, Eastern Europe, China, Latin America, Spain, and every major engineering market.

The hidden cost is speed.

Distributed software engineering research repeatedly shows that distance affects coordination. One [global software engineering study](https://arxiv.org/abs/2007.02328) found that distributed project members spent substantial time in scheduled and unscheduled meetings, and identified low availability of key people as a barrier to effective coordination. Research on [outsourcing and temporal distance](https://arxiv.org/abs/2602.08084) found advantages for nearshore development in communication-intensive or agile projects.

For automotive software, that matters because the expensive part of development is often not typing the code. It is understanding the system, making the right trade-off, validating the behavior, and integrating it safely.

If the software task is stable, outsourcing may reduce cost.

If the software task is part of an active learning loop, outsourcing may reduce speed.

And in the current market, speed is often the more expensive variable.

This is the externalization trap: the organization believes it is buying cheaper development capacity, but it may actually be buying longer feedback loops, more coordination, more rework, more integration delay, and weaker system ownership.

The issue is not the country. The issue is the interface.

If the interface is clear, outsourcing can work.

If the interface is unclear because the product itself is still being discovered, the company should be very careful about outsourcing the learning.

## Partnerships are becoming a speed strategy

The clearest sign that speed has become strategic is that large OEMs are forming partnerships not only to buy technology, but to import execution models.

[Volkswagen and Rivian launched a joint venture](https://www.volkswagen-group.com/en/press-releases/faster-leaner-more-efficient-rivian-and-volkswagen-group-announce-the-launch-of-their-joint-venture-18828) in November 2024 with a total deal size of up to $5.8 billion to develop electrical architecture and software for next-generation software-defined vehicles. Volkswagen's own announcement frames the collaboration around being faster, leaner, and more efficient, with engineers from both companies joining the venture.

This is not a minor supplier contract. It is a strategic move by one of the world's largest automotive groups to accelerate a capability that is now central to future vehicle platforms.

[TRATON's partnership with Applied Intuition](https://traton.com/en/newsroom/press-releases/the-traton-group-and-applied-intuition-announce-traton-one-os.html) points in the same direction. In March 2026, TRATON and Applied Intuition announced TRATON ONE OS, a unified software-defined vehicle platform intended to power new vehicles across Scania, MAN, International, and Volkswagen Truck & Bus.

These examples are important because they show how legacy organizations are reacting.

They are not only looking for software.

They are looking for speed, architecture, platform discipline, and a different way of executing.

The lesson is not that every OEM should outsource its software platform to a startup. That would be too simplistic. The lesson is that software-defined vehicle development requires a different operating model from traditional component sourcing.

Partnerships can help, but only if the OEM keeps enough internal competence to remain an intelligent system owner. Otherwise, the company may replace one dependency with another.

The future will not be pure in-house development or pure outsourcing. It will be selective ownership.

OEMs need to know which capabilities are strategic and must remain close to the product, and which capabilities can be modularized, sourced, or co-developed.

Embedded control, system behavior, integration architecture, diagnostics strategy, validation logic, cybersecurity posture, OTA safety, and production feedback loops are not administrative details. They are strategic capabilities.

## China changed the benchmark

The rise of Chinese OEMs is often discussed through the lens of cost, subsidies, batteries, tariffs, or geopolitics. Those are real factors, but they do not fully explain the competitive pressure.

Chinese OEMs changed the benchmark for speed.

They benefited from a large domestic market, strong battery and electronics supply chains, intense local competition, rapid product iteration, and customers who quickly adopted digital cockpit features, connectivity, and EV-specific experiences.

The IEA reports that Chinese automakers supplied 60% of global electric car sales in 2025, while European and North American automakers each supplied about 15%. It also reports that Chinese electric car exports doubled to more than 2.5 million in 2025, and that imports from China accounted for 55% of electric car sales in countries outside Europe and the United States.

Europe has responded partly through trade defense. The [European Commission imposed definitive countervailing duties](https://trade.ec.europa.eu/access-to-markets/en/news/eu-commission-imposes-countervailing-duties-imports-battery-electric-vehicles-bevs-china) on imports of battery electric vehicles from China from 30 October 2024, after concluding that China's BEV value chain benefited from unfair subsidies that threatened economic injury to EU producers.

Tariffs may buy time.

They do not create engineering speed.

They do not simplify legacy E/E architectures.

They do not rebuild embedded software competence.

They do not shorten decision loops.

They do not make vehicles more affordable by themselves.

This is critical because affordability is becoming part of the engineering problem. If the cost of electrification, software platforms, regulation, supply-chain uncertainty, and organizational inefficiency pushes new vehicles out of reach, fleet renewal slows down.

This connects business strategy back to engineering execution.

If development cycles are slow, platforms are expensive, software integration is painful, and organizations require too much rework, the final product becomes more expensive. That cost eventually reaches the customer.

A slow engineering organization is not only an internal problem.

It becomes a market-positioning problem.

## AI will accelerate engineers, not replace system understanding

AI is now part of every serious discussion about software development. It should be.

Used well, AI can help automotive engineering teams move faster. It can support code generation, test-case generation, requirements review, documentation, log analysis, anomaly detection, calibration assistance, simulation workflows, and knowledge retrieval.

In software-defined vehicles, AI may also become part of the product itself: advanced driver assistance, energy optimization, predictive maintenance, user personalization, fleet analytics, and automated diagnostics.

But AI does not remove the need for engineering judgment.

This is especially true in embedded control and safety-critical systems, where the hard question is not only "does the code compile?" but "does the system behave correctly under real-world constraints?"

AI can suggest software.

It cannot own responsibility.

It cannot understand the full physical consequence of a control decision unless the organization has defined the right architecture, data, constraints, validation strategy, and human review.

For automotive organizations, the right question is not "can AI replace engineers?"

The right question is "can AI help strong engineers close the learning loop faster?"

I believe the answer is yes.

AI can make strong engineering organizations faster. It can help engineers search logs, compare traces, identify suspicious requirements, generate test scaffolding, review code, summarize failures, and connect field data to known issues. It can reduce repetitive work and increase the surface area that engineers can inspect.

But AI will not make weak engineering organizations competent.

If ownership is unclear, requirements are poor, interfaces are unstable, validation is disconnected, and teams do not understand the physical system, AI may only generate more output for the organization to misunderstand.

The future is not AI instead of engineers.

The future is experienced engineers using AI inside better engineering systems.

## Embedded control is becoming more important, not less

A common mistake in the software-defined vehicle conversation is to treat embedded control as legacy work.

That is wrong.

As vehicles become more software-defined, embedded control becomes more important because the software stack is moving closer to physical behavior, not further away from it.

Electrification increases the importance of torque control, battery management, thermal management, charging behavior, power electronics, energy optimization, derating strategies, diagnostics, and safety monitoring.

Automation increases the importance of deterministic timing, sensor fusion, actuation control, fallback behavior, fault handling, and validation under edge cases.

Connectivity and OTA updates increase the importance of software version management, cybersecurity, compatibility, rollback strategies, diagnostics, and fleet monitoring.

Zonal and centralized architectures increase the importance of scheduling, communication determinism, resource allocation, and safe integration of mixed-criticality functions. The more compute moves toward shared platforms, the more important it becomes to understand timing, fault containment, resource budgets, and failure behavior.

The more software-defined the vehicle becomes, the more valuable it is to have engineers who understand both software and physics.

This is the role of embedded control engineers.

They sit at the intersection of control theory, real-time software, sensors, actuators, diagnostics, calibration, validation, safety, production constraints, and customer-perceived behavior.

That intersection is becoming strategic.

## What the future automotive software organization should optimize for

The automotive industry does not need to abandon process. It needs to redesign process around faster learning.

The future organization should optimize for five principles.

<ol class="process-list">
  <li><strong>Keep system ownership close to the product.</strong> Teams should not only own software components. They should own vehicle behavior, including requirements, implementation, diagnostics, calibration, validation strategy, field data, and production feedback.</li>
  <li><strong>Use suppliers for leverage, not abdication.</strong> Suppliers, startups, and technology partners will remain essential, but the OEM must retain architectural competence and integration authority.</li>
  <li><strong>Build cross-functional teams around learning loops.</strong> Software, controls, systems engineering, calibration, testing, cybersecurity, safety, hardware, data, and product teams need ownership models that shorten handovers.</li>
  <li><strong>Modernize validation without weakening it.</strong> SDVs need faster integration, simulation, CI/CD, virtual ECUs, HIL, SIL, scenario testing, fleet monitoring, and OTA-safe release strategies. The goal is not to test less. The goal is to learn earlier and with better evidence.</li>
  <li><strong>Measure speed correctly.</strong> Speed is not rushing, skipping validation, or pushing unfinished software to customers. Engineering speed is the time between discovering a relevant system problem and delivering a validated improvement.</li>
</ol>

Reducing that time requires better architecture, better tools, clearer ownership, stronger internal competence, and fewer organizational handovers.

## Conclusion: the real cost is delay

The automotive industry is not simply moving from mechanical products to software products.

It is moving toward software-defined physical systems.

That distinction matters because the winning companies will not be the ones that write the most code, hire the cheapest engineers, or create the largest software departments.

They will be the companies that learn fastest while preserving safety, reliability, and system understanding.

This is why the real cost of automotive software is not software cost.

It is delay.

Delay in understanding what the system is doing.

Delay in deciding who owns the problem.

Delay in translating physical behavior into software requirements.

Delay in integrating across suppliers and internal teams.

Delay in validating changes.

Delay in learning from production data.

Delay in adapting to a market that is moving faster than the organizations built to serve it.

The answer is not to reject suppliers, ignore process, or pretend automotive can work like consumer software.

The answer is to build engineering organizations that are fast because they are technically competent, close to the product, clear in ownership, disciplined in validation, and able to learn continuously.

For that future, embedded control engineers are not legacy specialists.

They are one of the bridges the industry needs most.

Because in a software-defined physical system, software only matters when it becomes trustworthy behavior in the real world.

## Sources and further reading

- [IEA: Vehicle software and software-defined vehicles](https://www.iea.org/reports/vehicle-software-and-software-defined-vehicles)
- [IEA: Global EV Outlook 2026 executive summary](https://www.iea.org/reports/global-ev-outlook-2026/executive-summary)
- [McKinsey: Software-defined vehicles and E/E architecture](https://www.mckinsey.com/features/mckinsey-center-for-future-mobility/focus-areas/software-defined-vehicles-and-e-e-architecture)
- [BCG: Auto software revs up as suppliers switch gears](https://www.bcg.com/publications/2024/auto-software-revs-up-suppliers-switch-gears)
- [Volkswagen Group: Rivian and Volkswagen Group announce their joint venture](https://www.volkswagen-group.com/en/press-releases/faster-leaner-more-efficient-rivian-and-volkswagen-group-announce-the-launch-of-their-joint-venture-18828)
- [TRATON: TRATON ONE OS with Applied Intuition](https://traton.com/en/newsroom/press-releases/the-traton-group-and-applied-intuition-announce-traton-one-os.html)
- [European Commission: countervailing duties on Chinese BEV imports](https://trade.ec.europa.eu/access-to-markets/en/news/eu-commission-imposes-countervailing-duties-imports-battery-electric-vehicles-bevs-china)
- [Stray and Moe: coordination in global software engineering](https://arxiv.org/abs/2007.02328)
- [Looi and Szepan: outsourcing in global software development](https://arxiv.org/abs/2602.08084)
- [Teixeira et al.: deterministic and reliable software-defined vehicles](https://arxiv.org/abs/2407.17287)
- [Open-source CI/CD pipeline for variant-rich software-defined vehicles](https://arxiv.org/abs/2507.19446)
