---
title: "Speed control for Volvo’s autonomous TA15 electric hauler"
seoTitle: "Volvo TA15 autonomous hauler speed control"
description: "Carlos Jorques led the speed-control design of Volvo’s autonomous TA15 electric hauler, whose speed then stayed within 1 km/h, without oscillation."
context: "Autonomous electric haulers"
eyebrow: "Volvo Construction Equipment · Autonomous electric haulers · 2023–2024"
intro: "**I led a team of three ALTEN engineers** in Spain working on the powertrain software of Volvo’s autonomous electric haulers. On the TA15, **I designed the changes to the speed and torque control** that made the hauler hold the speed requested by its autonomy system, with two electric axles that no longer work against each other."
facts:
  - label: "Role"
    value: "**Team lead of 3 ALTEN engineers** · powertrain control engineer for Volvo CE"
  - label: "Delivery"
    value: "Client assignment for Volvo Construction Equipment through ALTEN, where I am a **Technical Leader**; remote from Spain, with planning sessions in Sweden every 10 weeks"
  - label: "Team"
    value: "3 engineers at the ALTEN Delivery Center in Spain, within a 10-person ALTEN work package across Spain and Sweden"
  - label: "Skills"
    value: "Speed and torque control · coupled (multivariable) systems · Kalman filtering · MATLAB/Simulink with C code generation · unit testing and software verification · Git, Jenkins and JFrog CI/CD · SAFe PI planning · team leadership and mentoring"
updated: 2026-10-27
metrics:
  - value: "< 1 km/h"
    label: "speed error against the request, without oscillation, in autonomous runs over the full speed range"
  - value: "0.1–1 km/h"
    label: "speed oscillation of the original controller, with the hauler visibly trembling"
  - value: "≈ 3%"
    label: "more loads per hour from a 1 km/h higher average speed, in a rough example"
  - value: "1 sensor"
    label: "for both axles; a Kalman filter estimates the speed of each axle"
metricsNote: "Pre-development (concept stage) work, from logs on the hauler in manual tests up to 5 km/h and in autonomous runs by Volvo Autonomous Solutions up to about 30 km/h, with loading and unloading on slopes, curves, gravel and mud. The loads per hour come from my example with assumed numbers (15 km/h average speed, half of the cycle travelling)."
glance:
  - label: "The need"
    text: "Quarries, mines and other closed sites struggle to find drivers, and diesel exhaust harms health in tunnels. An autonomous electric hauler removes both problems, but without a driver its software has to hold the requested speed by itself, on slopes, gravel and mud and with a changing load."
  - label: "My role"
    text: "**Technical leader of 3 ALTEN engineers in Spain**, working remotely inside Volvo CE’s process. I coordinated the verification of a larger hauler concept, then designed the TA15 speed and torque control with Volvo CE and Volvo Autonomous Solutions."
  - label: "Key work"
    text: "The two axles had two independent controllers that excited each other through the hauler body. I added feed-forward, decoupling, derivative action, gain scheduling and a Kalman filter that estimates the speed of each axle from one sensor. The same coupling appears in any machine with several drives on one motion, such as mobile robots."
  - label: "Result"
    text: "**Speed within 1 km/h of the request and no oscillation** between the axles in autonomous runs, against oscillations of up to 1 km/h and a trembling hauler before."
schema:
  keywords: "speed control, torque control, PI control, decoupling, gain scheduling, Kalman filter, e-axle, MATLAB/Simulink, C code generation, unit testing, Jenkins, JFrog, Git, SAFe, autonomous haulers, mining"
  about:
    - name: "Vehicle speed control"
    - name: "Kalman filter"
      sameAs: "https://en.wikipedia.org/wiki/Kalman_filter"
    - name: "Autonomous haulage system"
      sameAs: "https://en.wikipedia.org/wiki/Autonomous_haulage_system"
  mentions:
    - { type: "Organization", name: "Volvo Construction Equipment", sameAs: "https://www.volvoce.com/" }
    - { type: "Organization", name: "Volvo Autonomous Solutions", sameAs: "https://www.volvoautonomoussolutions.com/" }
    - { type: "Organization", name: "ALTEN", sameAs: "https://www.alten.com/" }
    - { type: "Thing", name: "Scaled Agile Framework", sameAs: "https://en.wikipedia.org/wiki/Scaled_agile_framework" }
---

## Driverless electric haulers make quarries and mines cheaper and healthier to run

The TA15 is a 15-tonne battery-electric hauler from Volvo Construction Equipment (Volvo CE) for quarries, mines and other closed sites where material moves along a fixed route. Volvo Autonomous Solutions (VAS) runs such haulers for its customers, who pay for the material moved ([International Mining, 2020](https://im-mining.com/2020/07/07/volvo-autonomous-solutions-next-steps-tara-battery-electric-autonomous-haulage-offering/)). Remote sites struggle to find drivers, and an autonomous hauler keeps running through breaks and shift changes. For example, Rio Tinto's autonomous trucks each ran about 700 hours more than conventional ones in 2018, at 15% lower cost ([Rio Tinto, 2018 data](https://www.riotinto.com/en/mn/about/innovation/automation)). Electric drive also removes diesel exhaust, which causes lung cancer ([IARC, 2012](https://www.iarc.who.int/wp-content/uploads/2018/07/pr213_E.pdf)) and builds up underground, where ventilation is 35–40% of the electricity cost of mines with diesel trucks ([IEEE Access, 2024](https://doi.org/10.1109/ACCESS.2024.3353108)).

The speed control decides how much of this value reaches the customer. A hauler that oscillates needs a wider margin to its speed limits, so it is planned slower. A hauler that holds its speed drives closer to the limit on ice, mud or gravel, which affects cycle times, energy use and tyre and brake wear ([VAS, 2026](https://www.volvoautonomoussolutions.com/en-en/news-and-insights/insights/articles/2026/may/vehicle-dynamics-autonomy-is-more-than-software.html)). As a rough example, a hauler that averages 15 km/h and travels for half of its cycle gets **about 3% more loads per hour** from driving 1 km/h faster, roughly one more hauler in a fleet of 30.

## A remote team that worked as part of Volvo CE's development teams

Volvo CE develops its software in sprints, and every 10 weeks all teams plan together in a Program Increment (PI) planning of SAFe, a framework that coordinates many agile teams. Our team in Spain joined the sprints online, and I travelled to Sweden for each PI planning. My areas were:

- **Team lead:** planning and coordination of 3 engineers, and one-to-one mentoring of a junior engineer new to unit testing and dynamic systems.
- **Verification (April 2023 to July 2024):** coordination of the unit testing and verification of the powertrain functions of a larger autonomous hauler concept.
- **Speed and torque control (July to December 2024):** in the Volvo CE powertrain software team, I designed the changes described below, built them in Simulink, planned the test runs and guided the tuning. VAS ran the autonomous tests with us.
- **Control expertise:** advice on control design to the rest of the work package.

## Two axles that move one hauler have to be controlled as one system

The TA15 drives on two electric axles (e-axles, with the motor and gearbox built into the axle). When I joined the team, each axle had its own PI controller, which sets the torque from the speed error and from its sum over time. Both axles push the same body, so a torque change on one axle changes the speed that the other controller sees. In some conditions, the two controllers reacted to each other's corrections, so the speed oscillated by 0.1 to 1 km/h and the hauler trembled. How this cycle starts is illustrated in Figure 1.

<figure>
  <img src="/images/work/volvo-fig1-axle-coupling.svg" alt="Left: side view of a hauler with two electric axles, each commanded by its own PI controller, and one measured speed fed back to both. Four numbered steps describe the cycle: controller 1 adds torque, the body speeds up, controller 2 cuts torque, the body slows, and controller 1 adds torque again. Right: two illustrative speed traces. With two independent PI controllers, the speed oscillates around the request. With the added control actions, it settles close to the request." width="1000" height="560" loading="lazy" />
  <figcaption>Figure 1. (a) How two independent axle controllers excite each other through one hauler body. (b) Speed against time before and after the changes, shape only. Illustration, not measured data.</figcaption>
</figure>

Each controller was tuned as if it moved the hauler alone, whereas the hauler is a coupled system, with two inputs acting on one motion. Three decisions shaped the solution:

- **Improve the existing structure:** a multivariable controller, which computes both torques together, handles the coupling directly. However, it meant restarting the design and verification of a function already in tests. I kept the two PI controllers and added actions one at a time, each tested on the hauler, at the cost of more parameters to calibrate.
- **Four additions to the controllers:** feed-forward gives each axle the torque the request needs in advance; a decoupling term removes the effect of the other axle's correction; derivative action damps the oscillation; and gain scheduling changes the gains with the speed.
- **Estimate the speed of each axle:** the hauler had one speed sensor for both axles. I developed a Kalman filter, an estimator that combines the measurement with a model of the axles and weights each by how much it can be trusted. Its estimates feed an inner loop below the speed controller. A sensor per axle changes the hardware; the estimator only needs software, at the cost of a model that has to match the hauler.

Where these additions sit around the two original PI controllers is illustrated in Figure 2. Estimating what no sensor measures also runs through my [motor temperature model at MAHLE](/work/mahle-aspice-motor-thermal-model/) and my [PhD on combustion control](/work/heavy-duty-engine-diagnostics-control-research/).

<figure>
  <img src="/images/work/volvo-fig2-speed-control.svg" alt="Block diagram of a speed control for a hauler with two driven axles. A speed request goes to one PI controller per axle. Each controller has derivative action and gains scheduled with speed. A decoupling block links the two controllers, and feed-forward adds torque for the request before each axle. Both axles drive one hauler body, measured by one speed sensor. A Kalman filter estimates the speed of each axle and feeds it back to the controllers." width="1000" height="510" loading="lazy" />
  <figcaption>Figure 2. Generic structure of the speed control for a hauler with two independently driven axles. Orange blocks were added during the TA15 work around the existing PI controllers (grey). Illustration only, without Volvo signals or parameters.</figcaption>
</figure>

In Figure 2, the decoupling block between the two controllers breaks the cycle of Figure 1, and the Kalman filter gives each axle its own speed estimate from the single sensor.

## Testing on gravel, slopes and mud made the speed control fit for quarries and mines

Each change was built in MATLAB/Simulink, generated as C code and first tested with the hauler driven manually, at up to 5 km/h, at the Volvo CE test facilities in Eskilstuna. Colleagues in the hauler shared their screens in real time, so **I could guide the re-tuning from Spain** and run several iterations in one session. The change then went to autonomous runs with VAS, at up to about 30 km/h, on a circuit with slopes, curves, gravel and mud, loading and unloading. Finished tasks were peer-reviewed, built and unit-tested in Jenkins and JFrog Artifactory (CI/CD) and released at the end of each sprint.

After many iterations, **the speed stayed within 1 km/h of the request, without oscillation**, over the full speed range. The Kalman filter contributed most to that result. The same filter could later estimate road grip, wheel slip and load, so that the torque is shared between the axles to save energy ([Kopczyński, 2019](https://doi.org/10.1051/e3sconf/201910000037)).

## What I took from the TA15 project

The project left Volvo CE with a hauler that holds its speed on a circuit with slopes, gravel and mud. I still apply four lessons from it when I lead control work:

- **Good enough for the stage of the project:** improving the controller already in tests solved the oscillation on the project's schedule, at the cost of more parameters to calibrate. Since then, I judge a solution by what it solves at the stage the project is in.
- **Accuracy against complexity as a skill to teach:** the junior engineer I mentored ended the project delivering complete unit tests by himself and weighing that trade-off in his own decisions. Discussing it before each test is now part of how I mentor.
- **Knowing how the machine behaves:** the engineers who wrote the software also followed its tests, so we could re-tune the controller in the same session. I now plan control work so that the engineers who write the software follow its tests, without intermediaries who add time but no information.
- **Remote work inside the client's process:** a team in Spain delivered the speed control of a hauler in Sweden, with people on site only at the machine and at the PI plannings. Hence, I build remote teams into the client's own process and tools.

*This page uses only public information and my own description of the work; Figures 1 and 2 are generic and show no Volvo signals or parameters. My work was in pre-development and is not claimed as part of a specific product.*
