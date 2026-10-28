---
title: "Thermal management control for Scania's electric trucks"
seoTitle: "Scania electric truck thermal control"
description: "Carlos Jorques leads predictive thermal control for Scania's electric trucks. In truck tests, it used 2–4% less energy than the production control."
context: "Electric heavy-duty trucks"
eyebrow: "Scania · Electric heavy-duty trucks · 2025–present"
intro: "**I lead the predictive control concept and its architecture** in the software that heats and cools Scania's electric trucks, keeping the batteries and electronics at the temperatures where they run efficiently and safely. With a project team of three, I take the concept to truck tests together with the battery, autonomous-driving and supplier teams, and I **mentor the students** who join the project."
facts:
  - label: "Role"
    value: "**Senior Control Software Engineer, thermal management**"
  - label: "Delivery"
    value: "Client assignment for Scania through ALTEN, where I am a **Technical Leader**; fully remote from Spain with teams in Sweden"
  - label: "Team"
    value: "Predictive control project of 3 engineers, within the thermal management software department of about 20 engineers"
  - label: "Skills"
    value: "Model predictive control · control allocation · control architecture · real-time embedded control · MATLAB/Simulink with C code generation · C++ · ISO 26262 · MIL/SIL/HIL testing"
updated: 2026-10-27
metrics:
  - value: "2–4%"
    label: "less total vehicle energy than the production control software"
  - value: "12–25 kWh"
    label: "of battery not needed for the same range (80–156 kg)"
  - value: "up to 4.6×"
    label: "the value of the electricity saved, when the battery is sized for the gain"
  - value: "ASIL-B"
    label: "safety level of the thermal software under ISO 26262"
metricsNote: "Pre-development (concept stage) results of the predictive control, from winter and summer truck tests at −30 to 40 °C ambient, with equal start and end battery temperature. The battery capacity is for the same range, and the value comes from my life-cycle cost model of a 40 t long-haul truck over 8 years. ASIL-B is the second of four safety integrity levels."
glance:
  - label: "The need"
    text: "Scania's electric trucks compete with diesel on cost per tonne-kilometre, and part of every battery charge goes into heating and cooling the truck itself."
  - label: "My role"
    text: "**I lead the research and pre-development** of predictive thermal control, control allocation and their architecture in a project team of three. **I also deliver production thermal software** for the current trucks and functions for the next platform, and support purchasing with the coolant-pump A-samples. Through ALTEN since June 2025."
  - label: "Key work"
    text: "Predictive control that uses the route ahead to decide when to heat or cool the truck, and a control allocator that picks the pumps, fans and heaters that do it with the least electricity. Heat pumps in buildings and battery storage face the same problem, with several actuators sharing one energy budget."
  - label: "Result"
    text: "**2–4% less total vehicle energy than the production control in truck tests** from −30 to 40 °C, and shorter charging in simulation. For hauliers, that is worth **up to 4.6 times the electricity it saves** when the battery is sized for it."
schema:
  keywords: "model predictive control, control allocation, embedded control software, thermal management, electric trucks, ISO 26262, MATLAB/Simulink, C++, Adaptive AUTOSAR, MIL/SIL/HIL"
  about:
    - name: "Thermal management of electric trucks"
    - name: "Model predictive control"
      sameAs: "https://en.wikipedia.org/wiki/Model_predictive_control"
    - name: "Control allocation"
  mentions:
    - { type: "Organization", name: "Scania", sameAs: "https://www.scania.com" }
    - { type: "Organization", name: "TRATON", sameAs: "https://traton.com" }
    - { type: "Organization", name: "ALTEN", sameAs: "https://www.alten.com" }
    - { type: "Organization", name: "Applied Intuition", sameAs: "https://www.appliedintuition.com" }
    - { type: "SoftwareApplication", name: "TRATON ONE OS" }
    - { type: "Thing", name: "ISO 26262", sameAs: "https://en.wikipedia.org/wiki/ISO_26262" }
    - { type: "Thing", name: "AUTOSAR", sameAs: "https://en.wikipedia.org/wiki/AUTOSAR" }
---

## Thermal control sets part of the battery's size and the truck's price

Hauliers choose trucks by cost per tonne-kilometre and work on [margins of about 2%](https://market-insights.upply.com/fr/transport-routier-fran%C3%A7ais-le-bilan-2023-revele-lerosion-des-marges). The battery is about 32% of the cost of an electric truck (99,000 € of a 305,000 € long-haul truck in [my cost model](/writing/control-software-electric-trucks-part-3-business-case/)), and it is sized for the worst case, including the energy spent on heating and cooling. Therefore, every kilowatt-hour the thermal system saves is battery that does not have to be bought, or range that can be sold.

## Leading the predictive concept next to production thermal software

The thermal system has pumps, valves, fans, a compressor, a chiller, a heat pump and heaters on several coolant circuits, and its software runs in trucks already sold. A department of about 20 engineers develops it across several projects and vehicle platforms. Three of us work on the predictive control project, with a summer worker and, from January 2027, two master's thesis students. The project is in pre-development (the concept stage), where the software is tested on trucks to prove the concept before it is developed for the product. From Spain, I work with the teams in Sweden and the suppliers through shared models, specifications and test data. My own areas are:

- **Predictive control:** the predictive methods, the control allocation and their architecture, up to the truck tests.
- **Production software:** thermal functions in the current trucks and new functions for the upcoming platforms, including C++ on Adaptive AUTOSAR for [TRATON ONE OS](https://traton.com/en/newsroom/press-releases/the-traton-group-and-applied-intuition-announce-traton-one-os.html), the software-defined vehicle platform TRATON is co-developing with Applied Intuition.
- **Coolant pumps:** specifications, SAE J1939 CAN communication and control software with the suppliers, and support to purchasing with the pump A-samples (the first functional prototypes).
- **Functional safety and diagnostics:** ISO 26262 work and fault detection on the thermal functions.

## Predictive control that finds the cheapest way to heat and cool the batteries

Heat can usually reach a component by more than one path, at very different costs. To warm a cold battery, an electric heater gives 1 kWh of heat per kWh of electricity, the heat pump gives 2–3 kWh, and waste heat from the power electronics is free. The production control uses one feedback loop per temperature, which is robust to model errors and straightforward to certify. However, no loop chooses the actuator that reaches its target with the least energy, and none of them knows what is coming on the road.

The predictive strategies are designed to run in real time on a production control unit, next to safety functions under ISO 26262 (the functional-safety standard for road vehicles), which led to three decisions:

- **Two layers:** an upper layer decides how much heating or cooling each component needs, and a control allocator picks the actuators that deliver it with the least electrical power. One large optimisation would miss the real-time deadlines. Two layers are harder to calibrate, but a new actuator or platform change touches one layer only.
- **Route prediction:** the upper layer (*model predictive control*, a controller that plans ahead with a model of the system) uses the route, gradient, speed, ambient temperature and next charging stop. Forecasts can be wrong, so the plan is recomputed at every step with new measurements. The quality of the plan depends on how well the battery temperature is predicted; the prediction model I developed for it stays within ±0.6 °C of the measured temperature, at −20 to 40 °C ambient.
- **Fall-back for protection:** without navigation data, the upper layer returns to temperature set-points, as in feedback control, whilst the allocator keeps picking the cheapest actuators. Part of the saving remains, and the design stays certifiable.

The two layers and the fall-back path are illustrated in Figure 1.

<figure>
  <img src="/images/work/scania-fig1-two-layer-control.svg" alt="Block diagram. A route forecast and the measurements and estimates feed an upper predictive layer, which decides how much heating or cooling each component needs. A lower layer, the allocator, picks the actuators that deliver it with the least electrical power and commands the thermal system. Sensor signals return to the measurements. Without route data, a fall-back with temperature set-points feeds the allocator instead, shown as a dashed path." width="1050" height="450" loading="lazy" />
  <figcaption>Figure 1. Structure of the two-layer predictive thermal control. Orange: predictive control layers; grey: inputs, fall-back and thermal system. The dashed line marks the fall-back path used without route data. Generic structure, not the production software.</figcaption>
</figure>

Figure 2 illustrates the route prediction on a road with a long climb.

<figure>
  <img src="/images/blog/control-software-electric-trucks/part2-fig4-climb-precooling.png" alt="Three stacked plots over distance: road elevation with a long climb, battery temperature for feedback and predictive control, and cooling power for both. The predictive controller cools before the climb and has a lower power peak on it." loading="lazy" />
  <figcaption>Figure 2. Battery cooling with feedback control and with predictive control on a route with a long climb (shaded): (a) road elevation, (b) battery temperature within its admissible window, (c) electrical power for cooling. Both controllers remove the same heat and end at the same temperature. Illustrative, simple battery heat balance; not measured data.</figcaption>
</figure>

With feedback control, the cooling power peaks on the climb (panel c), when the battery is hottest and cooling costs most. The predictive control cools the battery a little on the flat, where the airflow from driving helps, and lets it warm up within its window during the climb (panel b).

The software is built in MATLAB/Simulink with C code generation, and every release passes model- and software-in-the-loop tests (MIL/SIL), CI/CD pipelines and peer reviews before hardware-in-the-loop (HIL) rigs, test benches, the wind tunnel and trucks. On the trucks, **I designed the experiments and analysed the logs**, comparing controllers between equal start and end battery temperatures, so that none could look better by leaving a hot battery for the next trip. In winter and summer tests from −30 to 40 °C ambient, **the saving was 2–4%**, around 3% on average. In simulation, cooling the battery before a charging stop also shortens it. [Part 2 of my article series](/writing/control-software-electric-trucks-part-2-engineering/) explains the structure in detail.

## A 3% energy saving can be worth up to 4.6 times the electricity it saves

The saving reaches the haulier through the electricity bill, a smaller battery, more payload and shorter charging. In my life-cycle cost model of a 40-tonne long-haul truck over 8 years, **2–4% is worth 5,500–21,500 € per truck**, which raises the haulier's operating profit by 24–96%. If the battery is sized for the gain from the start, **a 3% gain is worth up to 4.6 times the electricity saved**. These are my estimates, not Scania figures, and they do not deduct the development cost. [Part 3 (the business case)](/writing/control-software-electric-trucks-part-3-business-case/) and [Part 4 (vehicle design)](/writing/control-software-electric-trucks-part-4-design/) of the series give the full model.

## What the Scania project taught me about designing thermal control

The project took predictive thermal control to truck tests, next to thermal software already in production. Four habits from it shape how I design and lead control work on energy systems:

- **Separate the demand from the actuators:** thermal systems gain actuators, circuits and operating modes with each truck generation. Keeping the demand of each component apart from the choice of actuators absorbs those changes, and the design stays certifiable when a feature such as the route forecast fails. I use this split to guide the architecture of thermal and energy systems from the first sketch.
- **Join the sizing decisions early:** most of the value above is only captured if the control engineer joins the battery and thermal sizing decisions, before the hardware is fixed. I bring the control topics into those discussions, so the hardware teams know what the software can do.
- **Make test data easy to find:** in earlier projects, logs sat in shared folders, and finding the right measurement often took longer than analysing it. Here, the logs were in searchable databases, so I calibrated and validated the models with gigabytes of data from many operating conditions. I push for this kind of data access in every control project.
- **Book time for new ideas:** the concept reached its first truck tests in about six months, next to the daily support a team gives each other. Most of the delay came from those duties. Therefore, I book fixed time for new ideas in the team's plan.

*This page uses only public information, approved pre-development results and my own estimates; Figures 1 and 2 are generic and illustrative.*
