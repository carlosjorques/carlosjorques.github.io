---
title: "AUTOSAR Is a Constraint, Not the Architecture"
subtitle: "Why the industry's standard framework shapes integration, but cannot replace control system design."
description: A technical article on treating AUTOSAR-oriented development as an integration and delivery constraint rather than a substitute for control system architecture, and on whether the framework still serves an industry that now competes on development speed.
publishDate: 2026-07-07
readingTime: 13 min read
category: Embedded Control
tags:
  - AUTOSAR
  - Automotive software
  - Software-defined vehicles
  - Embedded control
  - Software architecture
featured: true
draft: true
---

Ask an automotive software engineer in Europe what architecture their ECU has, and there is a good chance the answer will be one word: AUTOSAR.

That answer says a lot about the state of the industry, because it is not an answer to the question. AUTOSAR describes how software is layered, packaged, configured, and exchanged between companies. It does not describe how the vehicle behaves, which control functions own which physical quantities, how faults are detected and handled, or how torque, current, pressure, and temperature are coordinated when the system degrades. Those decisions are the architecture. AUTOSAR is a constraint the architecture must live within.

I have spent most of my career developing embedded control software inside and around AUTOSAR-based systems: combustion control, electrified trucks, production ECUs. This article is my attempt to be fair to a framework that nobody I worked with ever loved, that solved a real problem the industry had, and that the industry is now visibly outgrowing in some places while doubling down on it in others.

## The thesis in 60 seconds

<div class="comparison-table" role="region" aria-label="AUTOSAR thesis summary" tabindex="0">
  <table>
    <tbody>
      <tr>
        <th scope="row">AUTOSAR solved a real problem</th>
        <td>It gave OEMs and suppliers a common language for exchanging software, and it still does that well.</td>
      </tr>
      <tr>
        <th scope="row">It is a delivery constraint</th>
        <td>It standardizes interfaces, layers, and configuration. It does not design control behavior, diagnostics strategy, or degraded-mode logic. Someone still has to.</td>
      </tr>
      <tr>
        <th scope="row">The costs are real and measured</th>
        <td>Runtime overhead, configuration complexity, long integration cycles, and a tooling market concentrated in a few vendors.</td>
      </tr>
      <tr>
        <th scope="row">The industry is diverging</th>
        <td>European OEMs largely extend AUTOSAR; Chinese OEMs increasingly build their own middleware; new vehicle OS programs mix AUTOSAR with Linux, QNX, and open source.</td>
      </tr>
      <tr>
        <th scope="row">Judge it by loop time</th>
        <td>Like every framework, AUTOSAR should be evaluated by whether it shortens or lengthens the time from observed behavior to validated improvement.</td>
      </tr>
    </tbody>
  </table>
</div>

## Where AUTOSAR came from, and what it promised

In the early 2000s, automotive software was heading toward chaos. Every OEM and supplier had its own software structure, drivers were welded to specific microcontrollers, and the number of ECUs per vehicle was exploding. In 2003, BMW, Bosch, Continental, DaimlerChrysler, and Volkswagen, soon joined by Siemens VDO and later Ford, PSA, Toyota, and GM, founded the AUTOSAR partnership to do something about it. The [stated goal](https://www.autosar.org/about) is standardization of basic system functions and functional interfaces, so that functions can be integrated, exchanged, and transferred within a vehicle network. The unofficial motto captured the deal: cooperate on standards, compete on implementation.

Judged against that original goal, AUTOSAR succeeded. The Classic Platform gave hard real-time ECUs a layered structure: application software components on top, a runtime environment (RTE) in the middle, standardized basic software underneath, and a microcontroller abstraction layer at the bottom, all wired together through machine-readable ARXML descriptions. A supplier in one country can deliver a software component to an OEM in another, and both sides know what the interfaces mean. Hardware can be second-sourced without rewriting the application. Later, the Adaptive Platform extended the idea to high-performance computers: POSIX-based, C++, service-oriented, aimed at driver assistance and connectivity domains.

None of that should be dismissed. The framework became the default language between OEMs and suppliers in Europe precisely because it works as a language. Pre-certified basic software also carries real safety value: vendors sell stacks certified for ISO 26262 up to ASIL D, and one published [tier-one case study](https://www.embedcrest.com/blog/autosar-vs-classic-embedded) reports that pre-certified AUTOSAR basic software cut the certification effort of a body controller by roughly 40%, and enabled requalification on a second-source microcontroller in three months.

To be fair: neither the framework nor its critics are simply right. AUTOSAR optimizes for interchangeability, traceability, and supplier collaboration. The question is what it costs, and whether what it optimizes for is still what the industry most needs.

## What it costs: the view from inside the stack

In my experience, nobody liked working inside AUTOSAR. That is an anecdote, but it is a widely shared one, and the published record backs it with measurements.

Start with runtime cost. Engineers at Volvo Cars [described](https://medium.com/volvo-cars-engineering/the-reality-of-autosar-and-the-way-forward-36af39ec4099) engine ECU code whose CPU load increased by more than 30% simply by running the AUTOSAR communication stack on the same codebase, and characterize the RTE as a complex mini operating system of its own. Timing specialist Peter Gliwa's analysis of failing projects ["Why AUTOSAR fails so often"](https://www.gliwa.com/media/download/15th_aoc_gliwa_why_autosar_fails_opt.pdf) names inefficient AUTOSAR configuration as the number one root cause of timing problems, with measured systems spending nearly 30% of CPU load per core on interrupt locking generated by the RTE's data-consistency machinery. A [practitioner assessment from LHP](https://www.lhpes.com/blog/autosar-is-it-worth-it-a-bare-metal-guys-perspective) adds the memory dimension: over 500 kilobytes of footprint before a single line of application code, which pushes projects onto larger microcontrollers than the function needs.

Then the process cost. The configuration workflow runs through enormous ARXML files and GUI-based vendor tools that resist automation. The Volvo team's numbers are the ones to remember: their CI chain could produce tested, downloadable software in under 45 minutes, against 12 to 48 hours for the AUTOSAR toolchain path. One engineer quoted in that article described being an "AUTOSAR expert" as never writing a single line of code, only clicking buttons in tools and watching them crash. The framework was designed years before continuous integration became normal engineering practice, and it shows. Configuration work that should be code review and pipeline automation becomes a specialized manual discipline.

And this is the point where my central observation comes in, because it follows directly from those costs. In several projects I have seen, a large share of the "application software components" were not really control applications. They were elaborate device drivers: software written to navigate the stack's layers, to work around its abstractions, to get at the hardware behavior the function actually needed. When the framework's abstractions fit the problem, they help. When they do not, engineers spend their creativity tunneling through the framework instead of designing the control system. The framework does not notice. The schedule does.

The result is a quiet inversion. AUTOSAR was meant to free engineers from infrastructure so they could focus on functions. In overloaded configurations it does the opposite: infrastructure becomes the project.

## The vendor question

A standard is only as open as its implementations. In practice, the AUTOSAR stack market is concentrated in a handful of vendors, with Vector Informatik in a dominant position through its MICROSAR stack and DaVinci toolchain, alongside ETAS, Elektrobit, and a few others. Commercial stacks run from [tens of thousands to several hundred thousand dollars in licensing](https://www.embedcrest.com/blog/autosar-vs-classic-embedded) per project before tooling, engineers need months to become productive in the toolchains, and some OEMs mandate a specific vendor, which removes even the theoretical competition. The [LHP assessment](https://www.lhpes.com/blog/autosar-is-it-worth-it-a-bare-metal-guys-perspective) is blunt about the consequence: effective lock-in to a single vendor, the highest off-the-shelf software costs its author had seen, and multi-week service-ticket loops for configuration cases the tools did not anticipate.

I want to be careful here, because the criticism is often aimed at the wrong target. Vector earned its position by executing well for two decades, and its stacks carry certifications (ASIL D, ISO/SAE 21434) that OEMs genuinely need and would struggle to reproduce. The newer subscription-and-package delivery models with CI/CD integration show the vendors responding to exactly the criticisms above. The structural problem is not any vendor's behavior. It is that an "open standard" whose practical use requires one of three or four proprietary implementations, plus their proprietary tooling, is open in specification and closed in economics. When the entire European industry standardizes on the same bottleneck, the bottleneck sets the industry's clock speed.

## Safety and cybersecurity: genuine strengths, with a caveat

On functional safety and cybersecurity, AUTOSAR deserves more credit than the frustrated-engineer discourse gives it.

ISO 26262 does not certify architectures, it certifies systems, but AUTOSAR provides mechanisms that make safety cases substantially cheaper to build: memory partitioning between software of different criticality, end-to-end protection of communication, timing protection, and vendor stacks pre-certified up to ASIL D. On the cybersecurity side, the crypto stack, secure onboard communication, and vendor-certified processes aligned with ISO/SAE 21434 and UNECE R155 mean that a regulation-driven redesign of automotive security did not have to start from zero. These are real network effects of standardization, and any would-be replacement has to answer for them. This is also why "just use Linux and microservices" is not a serious answer for the ECUs that actuate the physical world.

The caveat: safety mechanisms configured into an overloaded, poorly understood stack do not produce a safe system. They produce a certifiable one. The design judgment about degraded modes, fault reactions, diagnostic strategy, and actuation limits still has to come from engineers who understand the physical system. That judgment is precisely what the framework cannot standardize.

## The SDV stress test

Software-defined vehicles change the load on the framework in two directions at once, and this is where the debate stops being philosophical.

Zonal architectures and central computers reduce the number of small ECUs and concentrate functionality on high-performance computers running mixed-criticality software. Adaptive AUTOSAR was created for exactly this world, but its adoption has been slower and rockier than planned. Even sympathetic assessments [concede](https://medium.com/@basha.moustafa/beyond-the-criticism-the-real-value-of-adaptive-autosar-in-automotive-software-8d6702c2ddf6) that practitioners find its complexity disproportionate to its benefits, that the toolchain landscape is fragmented, and that its service-oriented flexibility carries measurable inter-process communication overhead. Meanwhile the actual SDV stacks being shipped are hybrids: Classic AUTOSAR on the real-time ECUs and zone controllers, and some combination of Linux, QNX, Android Automotive, DDS or SOME/IP middleware, and increasingly open-source components on the central computers. Initiatives like Eclipse SDV, SOAFEE, and COVESA exist because the industry does not believe any single standard, AUTOSAR included, will own the high-performance domain.

The vehicle OS programs tell the same story. Volkswagen's CARIAD, Mercedes' MB.OS, and Toyota's Arene all mix standardized components with large in-house or partner-built layers. In commercial vehicles, [TRATON ONE OS](https://traton.com/en/newsroom/press-releases/the-traton-group-and-applied-intuition-announce-traton-one-os.html), announced in March 2026 with Applied Intuition, is explicitly described as a white-box modular architecture combining TRATON's internal development, Applied Intuition's Vehicle OS, and third-party and open-source components, targeting all high-performance computers across Scania, MAN, International, and Volkswagen Truck & Bus from 2028. The public material does not detail how much AUTOSAR lives inside it; given the installed base and the certified real-time layers any truck platform needs, it is reasonable to assume AUTOSAR components remain in the stack, but the headline is elsewhere. The platform is sold on speed, continuous updates, and the freedom to consolidate compute without rewriting applications. The standard has become a component. The architecture is owned by the OEM and its partner.

That is, I think, the correct reading of where AUTOSAR is going in Europe: from "the architecture" to one ingredient inside architectures that OEMs are finally taking ownership of again. Which is exactly the argument of [the externalization article in my other series](/writing/externalization-trap-software-defined-world/): frameworks and suppliers provide leverage, but system ownership cannot be delegated, not to a supplier, and not to a standard.

## The China comparison

The most useful external benchmark comes from the manufacturers that were never committed to the framework. Chinese OEMs use AUTOSAR selectively, and the fastest of them are moving off it where it slows them down. NIO's SkyOS [replaced AUTOSAR with in-house middleware and QNX with an in-house kernel](https://www.nio.com/innovation). XPeng builds its E/E architecture full-stack in-house, and now [sells it to Volkswagen](https://www.globenewswire.com/news-release/2025/08/15/3134027/0/en/XPENG-and-the-Volkswagen-Group-Announce-Entry-into-Agreement-on-Expanding-E-E-Architecture-Technical-Collaboration.html). At the industry level, China has built a parallel standardization track: AUTOSEMO, under the national automakers' association, published its [ASF service framework specification](https://www.reachauto.com/en/2025/07/neusoft-reach-leads-the-release-of-asf-vehicle-service-framework-technical-specification-2-0-enabling-a-new-paradigm-for-on-vehicle-ai-development/) with 35 OEMs and suppliers behind it, natively targeting AI workloads, Python, and web frameworks alongside vehicle services. Chinese industry reports state the motivation plainly: AUTOSAR is not fully adapted to domestic chips and cannot keep up with their requirements, so they built their own.

Two things are worth noticing. First, the disruptors did not reject standardization. They rejected a standard whose evolution cadence was slower than their product cadence, and then standardized among themselves. Second, their choice was only possible because they own their architectures end to end. A company that has externalized its software competence cannot decide to leave a framework; it no longer has the muscles. The framework decision and the ownership decision are the same decision.

Whether the AUTOSAR consortium's [published goals](https://www.autosar.org/about) still match industry needs depends on which industry you mean. For the supplier-integration world that created it, the goals hold. For an industry competing on 18-month development cycles and weekly OTA updates, a consensus organization of hundreds of partners releasing on a yearly cadence is structurally unable to lead. It can only follow.

## AUTOSAR and AI-assisted development

There is a newer stress arriving, and the framework is poorly shaped for it.

AI coding assistants are most effective where the work is code: readable text, testable units, fast feedback in a pipeline. A large fraction of AUTOSAR work is not code. It is configuration spread across giant generated XML artifacts and GUI tools, where the consequences of a setting appear only after a code-generation and integration cycle. That workflow starves AI tools of exactly what they need: a tight loop between a proposed change and observable evidence. The parts of automotive development moving to modern software factories, plain code, textual configuration, containerized toolchains, automated tests, will absorb AI leverage quickly. Classic AUTOSAR configuration workflows will absorb it slowly, and vendors are only beginning to make their toolchains automation-first. If AI meaningfully accelerates application development, the framework's share of total project time grows, and with it the pressure on the framework.

My [series on the industry's speed problem](/writing/automotive-industry-speed-problem/) argues that AI amplifies whatever engineering system it lands on. Landing it on a workflow of GUI clicks and week-long integration loops will amplify very little.

## What this means in practice

For working engineers and their leaders, I would compress all of the above into five positions. They follow the working outline this article started from.

1. **Architecture starts with system behavior.** Define what the vehicle must do, which functions own which physical quantities, how the system degrades, and what evidence releases require. If that is not written down, AUTOSAR will not write it for you.
2. **Treat AUTOSAR as an integration constraint.** Like the bus topology or the microcontroller budget, it shapes the solution space. Design the control architecture first, then map it into the framework, and record where the framework forced compromises. Those records are where the next platform decision comes from.
3. **Keep explicit ownership of control responsibilities.** Every safety-relevant behavior needs a named owner who understands both the physics and the software, whatever the component structure says. Standardized structure is not distributed responsibility.
4. **Diagnostics, safety, and actuation still need design judgment.** The stack provides mechanisms: DEM, DCM, E2E, partitions, watchdogs. Strategy is yours. A certifiable configuration is not the same thing as a safe machine.
5. **Delivery frameworks support architecture; they do not define it.** Evaluate AUTOSAR, and every alternative, by loop time: does it shorten or lengthen the path from observed behavior to validated improvement? Adopt it where it shortens. Contain it where it lengthens. Never mistake adopting it for having designed something.

## Conclusion

AUTOSAR is neither the villain of automotive software nor its architecture. It is a twenty-year-old answer to a real problem: how thousands of companies can exchange software for machines that must not fail. That answer bought the European industry two decades of supplier interoperability, hardware abstraction, and certifiable safety mechanisms, and it deserves honest credit for all three.

But the problem has changed. The competition is no longer between supply chains exchanging specified components. It is between organizations that learn from their machines at different speeds. In that competition, a framework can only be judged as a constraint among constraints: valuable where it standardizes what should be standard, costly where it slows what should be fast, and dangerous only when an organization confuses complying with it for designing a system.

The companies that will do well in the next decade are not the ones that defend AUTOSAR or the ones that flee it. They are the ones that know exactly which parts of their stack it should own, which parts it should not, and who in the building owns the behavior of the machine.

Frameworks are constraints.

Behavior is the architecture.

## Related reading

- [The Automotive Industry Has a Speed Problem, and Software Is Where It Shows](/writing/automotive-industry-speed-problem/)
- [The Real Cost of Automotive Software Is Learning Speed](/writing/real-cost-of-automotive-software-speed/)
- [The Externalization Trap in Automotive Software](/writing/externalization-trap-software-defined-world/)
- [AI Will Not Replace Automotive Engineers](/writing/ai-will-not-replace-automotive-engineers/)

## Sources and further reading

- [AUTOSAR: About and stated goals](https://www.autosar.org/about)
- [Johannes Foufas (Volvo Cars Engineering): The reality of AUTOSAR and the way forward](https://medium.com/volvo-cars-engineering/the-reality-of-autosar-and-the-way-forward-36af39ec4099)
- [Peter Gliwa: Why AUTOSAR fails so often](https://www.gliwa.com/media/download/15th_aoc_gliwa_why_autosar_fails_opt.pdf)
- [LHP: AUTOSAR, is it worth it? A bare-metal perspective](https://www.lhpes.com/blog/autosar-is-it-worth-it-a-bare-metal-guys-perspective)
- [EmbedCrest: AUTOSAR vs classic embedded, when to use each](https://www.embedcrest.com/blog/autosar-vs-classic-embedded)
- [Moustafa Basha: Beyond the criticism, the real value of Adaptive AUTOSAR](https://medium.com/@basha.moustafa/beyond-the-criticism-the-real-value-of-adaptive-autosar-in-automotive-software-8d6702c2ddf6)
- [Amr Zein: Rethinking AUTOSAR Classic](https://www.linkedin.com/pulse/rethinking-autosar-classic-what-solved-didnt-comes-next-zein-mdlbe)
- [TRATON and Applied Intuition announce TRATON ONE OS](https://traton.com/en/newsroom/press-releases/the-traton-group-and-applied-intuition-announce-traton-one-os.html)
- [Applied Intuition: How TRATON ONE OS was built](https://www.appliedintuition.com/blog/applied-intuition-traton-one-os-partnership)
- [NIO Full Stack and SkyOS](https://www.nio.com/innovation)
- [XPENG and Volkswagen expand E/E architecture collaboration](https://www.globenewswire.com/news-release/2025/08/15/3134027/0/en/XPENG-and-the-Volkswagen-Group-Announce-Entry-into-Agreement-on-Expanding-E-E-Architecture-Technical-Collaboration.html)
- [Neusoft Reach / AUTOSEMO: ASF vehicle service framework 2.0](https://www.reachauto.com/en/2025/07/neusoft-reach-leads-the-release-of-asf-vehicle-service-framework-technical-specification-2-0-enabling-a-new-paradigm-for-on-vehicle-ai-development/)
