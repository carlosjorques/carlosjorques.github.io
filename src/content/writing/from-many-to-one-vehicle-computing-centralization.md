---
title: "From Many to One: What the Centralization of Vehicle Computing Really Changes"
description: A technical article on the shift from distributed ECUs to zonal controllers and central vehicle computers, and what that changes for software speed, safety, suppliers, and control engineering.
publishDate: 2026-07-07
readingTime: 13 min read
category: Embedded Control Architecture
tags:
  - Software-defined vehicles
  - Vehicle architecture
  - Embedded software
  - Zonal architecture
  - Automotive software
featured: true
draft: false
---

For three decades, the car solved every new problem the same way: add another computer. Electronic fuel injection got a computer. Then the airbags, the ABS, the seats, the mirrors, the ambient lighting. Each function arrived with its own electronic control unit, its own supplier, its own software, and its own wiring. It was a reasonable strategy, and it worked, right up until the moment it did not.

Today the industry is running that strategy in reverse. Almost every major automaker is collapsing dozens of distributed ECUs into a handful of zonal controllers and central computers. The press calls it the software-defined vehicle. The engineering reality is more specific: it is the largest redesign of vehicle electrical and electronic architecture since the introduction of the CAN bus, and it changes not just the hardware topology but who writes the software, who captures the value, and how fast an organization can learn.

This article looks at where the transition stands in 2026, what is driving it, who has done it well, who has struggled, and what it means for the people who build automotive software.

## The thesis in 60 seconds

1. The distributed ECU architecture did not fail. It scaled past its limits. With [150 or more ECUs in premium vehicles](https://www.mckinsey.com/industries/semiconductors/our-insights/getting-ready-for-next-generation-ee-architecture-with-zonal-compute) and wiring harnesses running to [five kilometers and nearly 70 kilograms](https://spectrum.ieee.org/software-eating-car), the integration cost of adding one more box now exceeds the cost of rethinking the whole.
2. Centralization is not one architecture but a progression: distributed, then domain-based, then zonal controllers feeding central compute. McKinsey expects roughly [18 percent of vehicles worldwide to carry zonal architectures by 2030](https://www.mckinsey.com/industries/semiconductors/our-insights/getting-ready-for-next-generation-ee-architecture-with-zonal-compute), with almost half on domain architectures and a third still distributed. The transition is real, and it is gradual.
3. The measured benefits are substantial. Rivian removed [ten ECUs, 1.6 miles of wiring, and 44 pounds of mass](https://www.popsci.com/technology/rivian-zonal-electrical-architecture/) per vehicle in one generation. BMW's Neue Klasse harness is [30 percent lighter with 600 meters less wiring](https://www.press.bmwgroup.com/global/article/detail/T0448372EN/four-superbrains-for-the-neue-klasse:-more-intelligent-more-efficient-more-powerful?language=en).
4. The risks are equally real: single points of failure, mixed-criticality integration on shared silicon, and an organizational transformation that has publicly humbled Volkswagen, Volvo, and GM.
5. The deepest change is economic. Control software is moving out of supplier-owned black boxes and into OEM-owned computers. The ECU business, the supplier relationship, and the value of the car itself are all being repriced around software.

## How the car became a hundred computers

The numbers deserve a moment, because they explain why this transition became unavoidable rather than merely attractive.

IEEE Spectrum's landmark analysis, [How Software Is Eating the Car](https://spectrum.ieee.org/software-eating-car), traced the growth: around 2011 a premium car carried roughly 100 ECUs; a decade later, high-end vehicles carried 150 or more, executing on the order of 100 million lines of code. For comparison, a passenger aircraft runs on about 15 million. Projections vary by methodology, from [300 million lines by 2030](https://spectrum.ieee.org/software-eating-car) to Synopsys's more aggressive [600 million by 2027](https://www.synopsys.com/blogs/chip-design/600-million-lines-code-cars-2027.html), but the direction is not in dispute.

Every one of those ECUs needs power and communication. The result is a wiring harness with [more than 1,500 wires, up to five kilometers in length, weighing close to 70 kilograms](https://spectrum.ieee.org/software-eating-car). The harness is one of the last major vehicle components still assembled largely by hand, and McKinsey notes that [wiring harness costs often account for 20 percent of the total E/E architecture budget](https://www.mckinsey.com/industries/semiconductors/our-insights/getting-ready-for-next-generation-ee-architecture-with-zonal-compute).

Stellantis put a concrete number on the legacy state when presenting its STLA Brain architecture: its current electrical setup carries [119 ECUs](https://www.wardsauto.com/news/the-stellantis-software-strategy/798625/), with a 20 percent reduction at the first step and a 50 percent cut targeted in the next iteration.

The distributed model had a quieter cost as well, and it is the one that matters most for this series. Each ECU typically came from a different supplier, with its own software stack and release cycle. Changing behavior that spans ten ECUs means coordinating ten organizations. The architecture that made it easy to add functions made it very hard to change them.

## From distributed to domain to zonal

The industry's answer has unfolded in generations, and it helps to name them precisely, because the terms get blurred in marketing material.

**Domain architectures** group functions by what they do: one controller for infotainment, one for driver assistance, one for the body. This was the dominant consolidation pattern of the late 2010s, and McKinsey expects it to remain the most common architecture through 2030.

**Zonal architectures** group by where things are. Zonal controllers sit at the corners of the car and aggregate the input and output of whatever sensors and actuators are physically nearby, regardless of function. They translate local CAN and LIN traffic onto a high-speed Ethernet backbone that connects to one or a few central computers, where the actual application logic runs. Bosch describes the target state as separating ["thinking" from "acting"](https://www.bosch-mobility.com/en/mobility-topics/ee-architecture/): a few powerful cross-domain vehicle computers do the thinking, zone ECUs and the remaining edge nodes do the acting.

The economics follow the topology. McKinsey's analysis with the Global Semiconductor Alliance projects that the classic ECU market will [contract by about 1 percent per year through 2030, while domain, zonal, and central compute units grow at 30 to 40 percent per year](https://www.mckinsey.com/industries/semiconductors/our-insights/getting-ready-for-next-generation-ee-architecture-with-zonal-compute). Central compute units carry price points of 1,000 to 4,000 dollars depending on the level of driving automation; zone controllers average 50 to 70 dollars.

One caveat worth stating plainly, because it separates engineering reality from slideware: full centralization is not the end state for everything. The same McKinsey report notes that safety-critical powertrain and ADAS functions still rely on distributed ECUs in many designs, and that autonomous driving workloads exceed what zonal controllers can offer. The practical architecture of the next decade is a hybrid: central compute for the heavy logic, zonal controllers for aggregation and power distribution, and a residue of dedicated ECUs where physics and safety cases demand them.

## What centralization buys

The benefits fall into three categories, and the field data now exists to quantify each.

**Physical cost, weight, and manufacturability.** Rivian's second-generation R1T and R1S are the cleanest documented before-and-after in the industry. Moving from a domain-based to a zonal design, Rivian went [from 17 ECUs to 7](https://insideevs.com/news/761865/rivian-zonal-architecture-development/), three of them zonal controllers, and removed [1.6 miles of wiring and 44 pounds of mass per vehicle](https://www.popsci.com/technology/rivian-zonal-electrical-architecture/), eliminating an entire dash harness in the process. BMW's Neue Klasse, launching with the iX3, consolidates vehicle intelligence into [four high-performance computers the company calls superbrains](https://www.press.bmwgroup.com/global/article/detail/T0448372EN/four-superbrains-for-the-neue-klasse:-more-intelligent-more-efficient-more-powerful?language=en), delivering more than twenty times the computing power of the previous generation, while a four-zone harness design cuts 600 meters of wiring, sheds 30 percent of harness weight, and replaces up to 150 conventional fuses with smart eFuses. Shorter, modular harness sections also open the door to automated harness assembly, something [Aptiv has built its Smart Vehicle Architecture around](https://www.aptiv.com/en/insights/article/getting-vehicle-architectures-from-ice-to-bev-and-beyond).

**Software velocity.** When application logic runs on a central computer behind an abstraction layer, a function is no longer welded to a specific supplier's box. Updates ship over the air to a few targets instead of a hundred. The consolidation [simplifies both updates and rollbacks when updates fail](https://www.mckinsey.com/industries/semiconductors/our-insights/getting-ready-for-next-generation-ee-architecture-with-zonal-compute), and it decouples hardware and software lifecycles, so the compute platform can be designed once and the functionality can keep evolving. This is the mechanism behind the most famous OTA moment in the industry: in 2018 Tesla shipped an over-the-air braking update that [cut the Model 3's 60-to-0 stopping distance by 19 feet](https://www.consumerreports.org/car-safety/tesla-model-3-gets-cr-recommendation-after-braking-update/), turning a Consumer Reports rating around in a week. That kind of change, spanning perception, actuation, and calibration, is close to impossible to ship quickly across a federation of supplier ECUs.

**Energy and compute efficiency.** Dozens of small microcontrollers, each with its own housing, power supply, and idle draw, are replaced by fewer, more efficient SoCs built on modern process nodes. BMW cites a [20 percent improvement in the energy efficiency of the electronics](https://www.press.bmwgroup.com/global/article/detail/T0448372EN/four-superbrains-for-the-neue-klasse:-more-intelligent-more-efficient-more-powerful?language=en) for its zonal design, which in an electric vehicle translates directly into range.

## What centralization costs

An honest account has to weigh the other side, because the drawbacks are structural, not incidental.

**Concentration of failure.** A hundred small computers fail in a hundred small ways. A central computer fails in one large way. Centralized designs must engineer in redundancy, graceful degradation, and fail-operational behavior that the distributed world got almost for free through sheer independence. When a zonal controller owns every function in its corner of the car, its failure takes the whole corner with it. This is solvable, aviation solved it decades ago, but it is engineering effort that shows up nowhere in the weight-savings slide.

**Mixed criticality on shared silicon.** The moment an ASIL D braking function and a QM infotainment stack share a chip, ISO 26262's freedom-from-interference requirement stops being a checkbox and becomes an architecture. Hypervisors such as the [QNX Hypervisor for Safety, pre-certified to ASIL D](https://qnx.software/en/software/products-and-solutions/qnx-hypervisor-and-hypervisor-for-safety), and hardware safety islands inside SoCs exist precisely to build these isolation walls. But the safety case for a consolidated computer is qualitatively harder than the safety case for a dedicated box, and the certification effort scales with everything you put inside.

**Thermal and electrical concentration.** Compute that was once spread across the vehicle now dissipates in one or two enclosures. Mercedes liquid-cools the central computers in its new CLA. Thermal design, power distribution, and electromagnetic compatibility all get harder as the boxes get denser.

**Ecosystem disruption.** The distributed architecture was also an industrial structure. Every ECU was a product, with a supplier, a margin, and a decades-old relationship behind it. Centralization dismantles that structure, and the transition costs, organizational, contractual, and human, have proven to be the highest costs of all. More on that below, because the evidence here is rich.

## The enablers: why now and not ten years ago

The concept of centralizing vehicle compute is old. What changed is that four enabling technologies matured at roughly the same time.

**Automotive-grade high-performance compute.** NVIDIA's [DRIVE Thor](https://nvidianews.nvidia.com/news/nvidia-unveils-drive-thor-centralized-car-computer-unifying-cluster-infotainment-automated-driving-and-parking-in-a-single-cost-saving-system), announced in 2022 with up to 2,000 teraflops of FP8 compute, was explicitly pitched as a centralized car computer unifying cluster, infotainment, automated driving, and parking in a single system. Qualcomm's [Snapdragon Ride Flex](https://www.qualcomm.com/news/releases/2023/01/qualcomm-unveils-snapdragon-ride-flex---the-automotive-industry-) was the first SoC family designed to run digital cockpit and ADAS workloads simultaneously, with a dedicated ASIL-rated safety island for mixed criticality. The microcontroller side is moving too: NXP's [S32K5 family](https://www.globenewswire.com/news-release/2025/03/11/3040299/0/en/New-S32K5-microcontroller-family-advances-zonal-SDV-architectures-and-extends-the-NXP-CoreRide-platform.html) brought 16 nm FinFET and embedded MRAM to zonal controllers, and Renesas's [R-Car X5H](https://www.renesas.com/en/about/newsroom/renesas-fast-tracks-sdv-innovation-r-car-gen-5-soc-based-end-end-multi-domain-solution-platform) put a multi-domain automotive SoC on a 3 nm process.

**Automotive Ethernet, all the way to the edge.** A zonal architecture is only as good as its backbone. Multi-gigabit automotive Ethernet links the zones to central compute, and newer standards such as [10BASE-T1S extend Ethernet to low-speed edge nodes](https://www.analog.com/en/resources/analog-dialogue/articles/how-10base-t1s-ethernet-simplifies-zonal-architectures.html), removing the protocol-translation gateways that CAN-to-Ethernet bridging required.

**Virtualization and mixed-criticality operating systems.** Hypervisors let one SoC host several operating systems with certified isolation between them: a safety-certified RTOS next to Linux next to Android Automotive. Without this, consolidation would mean recertifying everything to the strictest standard on the chip, which would kill the economics.

**Service-oriented middleware.** The [AUTOSAR Adaptive Platform](https://www.autosar.org/fileadmin/standards/R24-11/AP/AUTOSAR_AP_EXP_SWArchitecture.pdf) is the industry's standardized answer to running dynamic, service-oriented applications on POSIX operating systems, communicating over SOME/IP with runtime service discovery. Where Classic AUTOSAR statically binds software to a specific ECU at build time, the Adaptive Platform treats functions as services that can be deployed, updated, and relocated. It is the software expression of the same idea the zonal hardware expresses: decouple the function from the box.

Around these, a standardization layer is forming. The [SDV Alliance links AUTOSAR, COVESA, Eclipse SDV, and SOAFEE](https://www.soafee.io/news/2024/sdv_announcement), the last an Arm-led initiative bringing cloud-native development practices to vehicle software, with roughly 130 members including GM, Bosch, Continental, and AWS.

## What the field shows: transitions that worked

Tesla established the reference point. The Model 3 replaced the traditional federation with a central computer plus three positionally organized body controllers, documented in Tesla's own service manuals as [VCFRONT](https://service.tesla.com/docs/Model3/ServiceManual/2024/en-us/GUID-30B5050E-4AB1-419D-88FC-D8435168DB39.html), VCLEFT, and VCRIGHT, each controlling whatever is physically near it. The wiring result, per Musk's public statements, was a harness [cut from roughly 3 kilometers in the Model S to about 1.5 kilometers in the Model 3](https://insideevs.com/news/363422/tesla-wiring-architecture-details/). The Cybertruck pushed further with the [first mass-production 48-volt low-voltage architecture](https://www.motor1.com/features/704878/tesla-cybertruck-48-volts/), reducing current roughly fourfold, and Tesla [open-sourced the 48V design](https://www.notebookcheck.net/Tesla-open-sources-the-Cybertruck-s-48V-architecture-for-all-carmakers-to-speed-up-adoption.780292.0.html) to accelerate industry adoption.

Rivian is the cleanest before-and-after because it published the numbers and Munro's teardown teams verified the hardware: [17 ECUs down to 7](https://insideevs.com/news/761865/rivian-zonal-architecture-development/), three zonal controllers named West, East, and South, 1.6 miles of wiring and 44 pounds removed, and a claimed [20 percent material cost saving](https://www.popsci.com/technology/rivian-zonal-electrical-architecture/) against the first generation. Notably, Rivian did it in about two years by rewriting the software in house rather than porting supplier stacks, a decision that says as much about the organizational model as the technical one.

BMW's Neue Klasse and Mercedes's MB.OS show the incumbents arriving. BMW's [four superbrains](https://www.bmwgroup.com/en/news/general/2025/superbrains.html) partition the vehicle into infotainment, automated driving, driving dynamics, and comfort functions over a four-zone harness. Mercedes made the [2025 CLA the first vehicle to run MB.OS end to end](https://media.mbusa.com/releases/release-cf381cd2fcff624ae37d39116309930e-the-all-new-mercedes-benz-cla-gorgeous-effortless-intuitive-and-flexible), its in-house chip-to-cloud operating system, with over-the-air updates extended to driver assistance functions for the first time in the brand's history.

## What the field shows: transitions that hurt

The failures are as instructive as the successes, and they share a signature: the hardware centralization was the easy part.

Volkswagen's ID.3 launched in 2020 with software so incomplete that finished cars [sat in lots awaiting fixes](https://cleantechnica.com/2023/11/01/chaos-at-volkswagens-cariad-division-may-lead-to-delays-job-cuts/). The software organization built to fix this, CARIAD, absorbed reported losses of [more than 2.5 billion dollars per year](https://insideevs.com/news/753673/vw-group-cariad-billions-losses-2024/) while its delays [pushed the Porsche Macan Electric and Audi Q6 e-tron back by roughly a year](https://techcrunch.com/2023/10/30/layoffs-at-vws-cariad-further-delay-software-launch-in-porsche-audi-models/). The resolution was striking: Volkswagen formed a [joint venture with Rivian worth up to 5.8 billion dollars](https://www.volkswagen-group.com/en/press-releases/faster-leaner-more-efficient-rivian-and-volkswagen-group-announce-the-launch-of-their-joint-venture-18828), effectively buying the zonal architecture and software platform of a company a fraction of its size. One year in, the JV counts [more than 1,500 engineers, with the ID.EVERY1 slated as the first Group vehicle on the new zonal architecture in 2027](https://www.volkswagen-group.com/en/press-releases/one-year-after-its-founding-joint-venture-between-volkswagen-group-and-rivian-shows-strong-progress-19980).

Volvo's EX90, built on centralized core computing around NVIDIA Orin, shipped in late 2024 with [software so unfinished that deliveries were repeatedly delayed and early cars lacked promised functions](https://insideevs.com/news/773202/volvo-ex90-software-issues/). Volvo's fix was expensive and honest: the 2026 model year got an upgraded central computer, and Volvo committed to [replacing the core computer in existing customer cars free of charge](https://insideevs.com/news/774024/volvo-software-ex90-fixes/).

GM's Ultium-generation Chevrolet Blazer EV launched in late 2023 with crashing screens and charging failures severe enough that GM [paused sales entirely in December 2023](https://www.greencarreports.com/news/1141841_gm-pauses-chevy-blazer-ev-sales-over-software-woes), resuming three months later after a rewrite.

The pattern across all three is the one this series keeps returning to. These companies did not lack capital, talent, or silicon. They lacked a short learning loop between the software organization and the vehicle. Centralized architectures concentrate not only compute but also integration risk: when one software platform carries the whole car, the whole car waits for the software.

## What changes for the people building the software

For engineers, the transition rewrites the daily texture of the work in at least four ways.

**From C on bare metal to services on POSIX.** The center of gravity shifts from statically configured, OSEK-style runtimes toward Linux and QNX, C++ services, and service-oriented communication. Classic AUTOSAR does not disappear, it continues to run the zonal controllers and remaining edge ECUs, but the differentiating logic moves up into the central computers, where the toolchain looks more like backend engineering than traditional embedded work.

**Testing shifts left, into the cloud.** When functions are software services rather than supplier boxes, they can be tested before hardware exists. dSPACE's VEOS now runs [full virtual ECU networks in the cloud on Arm-based AWS Graviton processors](https://www.dspace.com/en/pub/home/products/sw/simulation_software/veos.cfm), and [Volvo runs containerized in-vehicle software tests on Graviton-backed Kubernetes clusters](https://aws.amazon.com/blogs/industries/volvo-cars-streamlines-in-vehicle-software-testing-with-aws-graviton-on-amazon-eks/). AWS has documented the pattern as [accelerating the V-model itself](https://aws.amazon.com/blogs/industries/simulating-automotive-e-e-architectures-in-aws-part-1-accelerating-the-v-model/): continuous integration pipelines running against virtual E/E architectures, with hardware-in-the-loop reserved for what genuinely needs physics. For anyone who has waited weeks for bench time, this is the single biggest quality-of-life change in the field.

**Safety and security become vehicle-wide properties.** In the federated world, each ECU carried its own safety case and its own attack surface. In the centralized world, isolation, freedom from interference, and secure update infrastructure are properties of the platform. Regulation has followed: [UNECE R155 and R156](https://www.vehicle-certification-agency.gov.uk/connected-and-automated-vehicles/cyber-security-and-software-updating/) make certified cybersecurity and software update management systems a condition of type approval in the EU and other markets, mandatory for all new vehicles produced since July 2024.

**Control engineering gains leverage rather than losing it.** It is tempting to read centralization as the triumph of IT over embedded. The opposite is closer to the truth. When the actuation of the whole vehicle is reachable from one compute platform, cross-domain control becomes tractable: torque, braking, steering, and thermal management coordinated in one place, as BMW does in its driving dynamics superbrain. The discipline of designing controllers that respect physical limits, degrade gracefully, and prove their safety does not get automated away by the new architecture. It becomes the scarce skill the architecture depends on.

## The repricing of the ECU business and the car

Follow the software and you find the money moving with it.

The traditional model gave a Tier 1 supplier the whole vertical slice: hardware, software, and integration, sold as a black box with decades of relationship behind it. Centralization unbundles the slice. The OEM buys compute hardware in a handful of large contracts, increasingly [insources the differentiating software](https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/automotive-software-and-electrical-electronic-architecture-implications-for-oems), and asks suppliers for either commodity zonal hardware or specialized software components. The winners so far are visible in the order books: Qualcomm reports a [45 billion dollar automotive design-win pipeline](https://www.qualcomm.com/news/onq/2026/03/snapdragon-automotive-market-traction-and-scale), and NVIDIA's automotive platform runs through Mercedes, Volvo, and much of the Chinese EV industry. Classic ECU suppliers face a shrinking core market, and the strategic responses, from Bosch's pivot to [cross-domain vehicle computers](https://www.bosch-mobility.com/en/mobility-topics/vehicle-computer/) to Aptiv's zonal Smart Vehicle Architecture, are attempts to own the new control points rather than the old boxes.

For the OEM, the prize is a different revenue model. BCG estimates software-defined vehicles will create [more than 650 billion dollars in value potential by 2030](https://www.bcg.com/press/7september2023-software-defined-vehicles-create-650-billion-value-potential), with OEM software and electronics revenue nearly tripling. Stellantis publicly targeted [20 billion euros in incremental annual software-enabled revenue by 2030](https://www.stellantis.com/en/news/press-releases/2021/december/stellantis-targets-20-billion-in-incremental-annual-revenues-by-2030-driven-by-software-enabled-vehicles). Whether those specific numbers survive contact with customers is an open question, early subscription experiments have met real resistance, but the direction is set: a car that can gain function over the air is a product whose value is no longer fixed at the factory gate.

That has a second-order effect worth watching: residual value. S&P Global Mobility argues that OTA-updatable vehicles begin to behave like [upgradable platforms rather than depreciating assets](https://www.spglobal.com/automotive-insights/en/blogs/2026/05/from-ota-refresh-to-modular-vehicle-renewal), while cars without update support risk accelerated depreciation as technically frozen products. A used car with five years of software improvements ahead of it is a different asset from one that left the factory finished. The architecture decides which of the two you built.

## The road ahead

Three trajectories seem well supported by the evidence.

**The migration is a decade, not a product cycle.** McKinsey's projections have roughly a third of vehicles still on fully distributed architectures in 2030, and about [30 percent of production on zonal architectures by 2032](https://www.mckinsey.com/industries/semiconductors/our-insights/advanced-semiconductors-for-the-era-of-centralized-e-e-architectures). Fleets turn over slowly, platforms live seven years or more, and every OEM is sequencing the transition around existing product commitments. Engineers should expect to work in mixed architectures, Classic and Adaptive, CAN and Ethernet, distributed and central, for most of a career's remaining span.

**The hardware keeps consolidating, and chiplets are the next step.** As central computers absorb more domains, monolithic SoCs run into yield and flexibility limits. imec's [Automotive Chiplet Program](https://www.imec-int.com/en/expertise/cmos-advanced-and-beyond/compute/automotive-chiplet-program), whose partners now include BMW, Bosch, Audi, Porsche, Volkswagen, and Rivian, is exploring architectures where OEMs compose central computers from smaller dies, mixing compute tiles the way they once mixed ECUs.

**The software-defined vehicle is becoming the AI-defined vehicle.** Mercedes has already pushed a [ChatGPT-powered voice assistant to more than three million vehicles over the air](https://media.mbusa.com/releases/release-b35d2af89e06f556bbd8fe420412e9c2-mercedes-benz-takes-in-car-voice-control-to-a-new-level-with-chatgpt), and the CES 2026 announcements were dominated by agentic in-car assistants and on-device language models. Whatever one thinks of chatbots in cars, the compute headroom and update infrastructure that centralization created is what makes such features deployable at all. The architecture is the enabler; the applications will keep arriving.

## Conclusion: the bottleneck moves, again

Strip away the terminology and the ECU centralization story is a familiar one. An architecture optimized for adding functions collided with a product that now competes on changing them. The industry's answer, fewer computers, faster networks, software as services, is technically sound and increasingly proven in the field. Rivian's numbers, BMW's harness, and Tesla's decade-old head start show what the destination looks like.

But the cases that went wrong carry the more important lesson. Volkswagen, Volvo, and GM did not stumble on silicon or topology. They stumbled where the new architecture concentrates everything: in the software organization and its ability to observe, decide, implement, and validate quickly. Centralizing the computer centralizes the learning loop. For organizations with short loops, that is enormous leverage. For organizations with long ones, it removes the last places to hide.

The vehicles of the next decade will carry a handful of computers instead of a hundred and fifty boxes. Whether that makes them better products depends far less on the count than on the people and processes behind the software those computers run. The architecture is necessary. It has never been sufficient.

*Part of the series: Software-Defined Physical Systems.*

## Sources and further reading

**The trend and its economics**

- McKinsey & Company / Global Semiconductor Alliance, [Getting ready for next-generation E/E architecture with zonal compute](https://www.mckinsey.com/industries/semiconductors/our-insights/getting-ready-for-next-generation-ee-architecture-with-zonal-compute) (June 2023)
- McKinsey & Company, [Advanced semiconductors for the era of centralized E/E architectures](https://www.mckinsey.com/industries/semiconductors/our-insights/advanced-semiconductors-for-the-era-of-centralized-e-e-architectures)
- Robert N. Charette, [How Software Is Eating the Car](https://spectrum.ieee.org/software-eating-car), IEEE Spectrum (June 2021)
- BCG / World Economic Forum, [Software-defined vehicles will create more than 650 billion dollars in value potential](https://www.bcg.com/press/7september2023-software-defined-vehicles-create-650-billion-value-potential) (September 2023)
- S&P Global Mobility, [From OTA refresh to modular vehicle renewal](https://www.spglobal.com/automotive-insights/en/blogs/2026/05/from-ota-refresh-to-modular-vehicle-renewal) (May 2026)

**Case studies**

- BMW Group, [Four superbrains for the Neue Klasse](https://www.press.bmwgroup.com/global/article/detail/T0448372EN/four-superbrains-for-the-neue-klasse:-more-intelligent-more-efficient-more-powerful?language=en) (March 2025)
- Popular Science, [Rivian's zonal electrical architecture](https://www.popsci.com/technology/rivian-zonal-electrical-architecture/); InsideEVs, [How Rivian developed its zonal architecture](https://insideevs.com/news/761865/rivian-zonal-architecture-development/)
- Volkswagen Group, [Rivian and Volkswagen Group announce the launch of their joint venture](https://www.volkswagen-group.com/en/press-releases/faster-leaner-more-efficient-rivian-and-volkswagen-group-announce-the-launch-of-their-joint-venture-18828) (November 2024) and [one-year progress update](https://www.volkswagen-group.com/en/press-releases/one-year-after-its-founding-joint-venture-between-volkswagen-group-and-rivian-shows-strong-progress-19980) (November 2025)
- Mercedes-Benz USA, [The all-new CLA](https://media.mbusa.com/releases/release-cf381cd2fcff624ae37d39116309930e-the-all-new-mercedes-benz-cla-gorgeous-effortless-intuitive-and-flexible) (2025)
- Tesla Service Manual, [Model 3 body controller documentation](https://service.tesla.com/docs/Model3/ServiceManual/2024/en-us/GUID-30B5050E-4AB1-419D-88FC-D8435168DB39.html); InsideEVs, [Tesla wiring architecture details](https://insideevs.com/news/363422/tesla-wiring-architecture-details/)
- InsideEVs, [Volvo EX90 software issues](https://insideevs.com/news/773202/volvo-ex90-software-issues/) and [Volvo's free computer replacement](https://insideevs.com/news/774024/volvo-software-ex90-fixes/)
- Green Car Reports, [GM pauses Chevy Blazer EV sales over software woes](https://www.greencarreports.com/news/1141841_gm-pauses-chevy-blazer-ev-sales-over-software-woes) (December 2023)
- WardsAuto, [The Stellantis software strategy](https://www.wardsauto.com/news/the-stellantis-software-strategy/798625/)

**Enablers and software development**

- NVIDIA, [DRIVE Thor announcement](https://nvidianews.nvidia.com/news/nvidia-unveils-drive-thor-centralized-car-computer-unifying-cluster-infotainment-automated-driving-and-parking-in-a-single-cost-saving-system) (September 2022)
- Qualcomm, [Snapdragon Ride Flex announcement](https://www.qualcomm.com/news/releases/2023/01/qualcomm-unveils-snapdragon-ride-flex---the-automotive-industry-) (January 2023)
- AUTOSAR, [Adaptive Platform software architecture](https://www.autosar.org/fileadmin/standards/R24-11/AP/AUTOSAR_AP_EXP_SWArchitecture.pdf) (R24-11)
- Analog Devices, [How 10BASE-T1S Ethernet simplifies zonal architectures](https://www.analog.com/en/resources/analog-dialogue/articles/how-10base-t1s-ethernet-simplifies-zonal-architectures.html)
- AWS Industries, [Simulating automotive E/E architectures in AWS](https://aws.amazon.com/blogs/industries/simulating-automotive-e-e-architectures-in-aws-part-1-accelerating-the-v-model/); [Volvo Cars in-vehicle software testing on Graviton](https://aws.amazon.com/blogs/industries/volvo-cars-streamlines-in-vehicle-software-testing-with-aws-graviton-on-amazon-eks/)
- UK Vehicle Certification Agency, [UNECE R155 and R156 overview](https://www.vehicle-certification-agency.gov.uk/connected-and-automated-vehicles/cyber-security-and-software-updating/)
- Consumer Reports, [Tesla Model 3 gets CR recommendation after braking update](https://www.consumerreports.org/car-safety/tesla-model-3-gets-cr-recommendation-after-braking-update/) (May 2018)
- SOAFEE, [SDV Alliance announcement](https://www.soafee.io/news/2024/sdv_announcement); imec, [Automotive Chiplet Program](https://www.imec-int.com/en/expertise/cmos-advanced-and-beyond/compute/automotive-chiplet-program)
