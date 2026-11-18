---
title: "How predictive thermal control saves energy in electric trucks"
seoTitle: "Predictive truck thermal control: energy and battery"
subtitle: "How predictive thermal control saves energy in electric trucks"
description: "Predictive thermal control chooses the cheapest heat path and the right moment along the route. This approach can save 2–4% of an electric truck's energy."
teaser: "How control allocation and route preview save energy in an electric truck."
publishDate: 2026-11-02
updatedDate: 2026-11-17
readingTime: 17 min read
category: Control Algorithms & Diagnostics
tags:
  - Electric trucks
  - Thermal management
  - Model predictive control
  - Control allocation
  - Battery thermal management
keyFigure:
  value: "Up to 25 kWh"
  label: "less battery for the same range in the reference sizing model"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part2-social.png"
  alt: "Part 2 of 4. How predictive thermal control saves energy in electric trucks. 2–4% higher efficiency than production feedback control in trucks."
midNote:
  text: "I design and validate control strategies for coupled thermal systems, from models to tests on trucks."
featured: false
draft: false
series:
  id: control-software-electric-trucks
  part: 2
---

Many electric cars prepare the battery once a fast charger is set as the navigation destination. On the way, they heat or cool the cells so that the battery is within the temperature range where it accepts the most charging power *on arrival*. An electric truck faces similar timing decisions throughout its route. Its battery, power electronics and cab need heating or cooling, and the electricity for that work comes from the same battery that drives the wheels. **In my work, choosing which actuator does the thermal work, and when, reduced total truck energy consumption by 2–4% against production feedback control, in tests on trucks as well as in simulation.**

[Part 1](/writing/control-software-electric-trucks-part-1-context/) showed that the battery and the thermal hardware are sized for the most demanding conditions, such as a cold day near the end of the battery's working life. I design the thermal management strategies that operate this hardware on every other day. Their choices set how much energy the truck uses and, with it, how much battery capacity it needs for a given range.

## 1. Several thermal paths can meet the same demand

A battery that needs heat can receive it from an electric heater, from losses recovered in the drivetrain or from a heat pump. These paths differ in their electrical cost, because an electric heater gives about the same heat as the electricity it consumes, but a heat pump can move more heat than the electricity it consumes. Which path is available at a given moment depends on the pumps, valves, radiators, compressor and fan that connect the circuits. These generic circuits, based on published architectures [1–3], are illustrated in Figure 1.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part2-fig1-thermal-topology-mobile.svg" width="360" height="1480" />
		<img src="/images/blog/control-software-electric-trucks/part2-fig1-thermal-topology.png" width="1824" height="1032" alt="Illustrative electric-truck thermal circuits: cab, battery and power-electronics coolant, motor oil and refrigerant exchange heat through a liquid-cooled condenser, a chiller and an oil cooler. A shared front-end fan serves the radiators and condensers. The mobile overview groups these circuits by fluid. The desktop drawing shows representative pipe and valve paths, not a particular truck." loading="lazy" />
	</picture>
	<figcaption>Figure 1. Electric-truck thermal circuits generalised from published integrated architectures [1–3]. On desktop, representative component connections run from the front-end module on the left. On mobile, A identifies the cab–heat pump liquid-cooled condenser, B the battery–heat pump chiller and C the motor oil–power electronics coolant oil cooler. Dashed purple indicates refrigerant, orange cab coolant, green battery coolant, blue power-electronics coolant and brown motor oil. Arrows indicate circulation.</figcaption>
</figure>

Because the circuits are connected, the battery circuit can receive drivetrain waste heat during a cold start or reject its own heat through a radiator or the chiller during fast charging. Each of these arrangements changes the temperatures of several circuits at once and has its own electrical cost. At low outside temperature, for example, a radiator may need little fan power, whereas at a warmer ambient temperature the refrigerant circuit may be cheaper. **Hence, the best path depends on the operating conditions, and the controller has to choose it continuously.**

To make that choice, the controller needs the problem stated in control terms: the variables of the system, the limits on them and an objective. The *states* describe the system at any moment, for example the battery and coolant temperatures. The *inputs* are the variables the controller sets (the pump, valve, compressor, fan and heater commands). The *disturbances* act from outside and cannot be chosen, such as ambient temperature, vehicle speed and the heat from driving or charging.

Sensors measure only some variables, the *outputs*, so a state estimator reconstructs the states that are not measured, such as the temperature inside the cells. The *constraints* are the limits these variables must respect: cell, motor and refrigerant limits, cab comfort and actuator operating ranges. The *objective* is to meet them at minimum energy and component wear. How these elements connect is illustrated in Figure 2, together with the route forecast that predictive control adds.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part2-fig2-control-problem-mobile.svg" width="360" height="922" />
		<img src="/images/blog/control-software-electric-trucks/part2-fig2-control-problem.png" width="2100" height="800" alt="Control block diagram: actuator commands u enter the thermal system, disturbances d act on it, and sensors with a state estimator return states x. A dashed route-forecast path supplies predicted gradient, speed, ambient temperature and next charging stop to the controller." loading="lazy" />
	</picture>
	<figcaption>Figure 2. Thermal control problem. The controller commands inputs (u), disturbances (d) affect the system, and sensors with an estimator return its states (x). The dashed path supplies predicted route, speed, ambient and charging information to predictive control.</figcaption>
</figure>

Feedback control uses only the return path from the sensors in Figure 2. Preview adds the dashed path, so the controller can prepare for a climb or a charging stop before its heat reaches the battery. This preparation works because the time scales differ widely. Refrigerant pressures change in seconds, whilst the temperature of a roughly 4-tonne battery changes over tens of minutes. The system also switches between operating modes, and its heat transfer depends on temperature differences and flow rates. Therefore, no fixed actuator setting is the cheapest across all these conditions, and feedback alone does not search for the cheapest one.

## 2. Limitations of feedback control for energy minimisation

*Closed-loop feedback* compares a measured temperature with a target (its set-point) and adjusts an actuator when the two differ. PI or PID loops with mode-selection logic and overrides are well understood and computationally cheap ([an interactive PI tuning game](/writing/control-engineering-in-ten-levels/)). They are also robust to model errors, because they correct whatever deviation they measure [4]. Their gains can also be calibrated from how the truck drives, which matters for software maintained over years by engineers who did not design it. In my experience, a production controller is often a simple PI loop surrounded by gain scheduling, state machines and mode logic, refined over many iterations. For these reasons, feedback is a demanding reference for any new method and remains its protection layer.

However, a feedback loop reacts only after the temperature has moved. In a coupled system, separate loops can also compete for shared heat exchangers, and tracking a fixed set-point ignores that another temperature within the admissible window may cost less energy. Feedforward control can compensate a measured disturbance, but it still responds to conditions already present. **Better tuning improves tracking, yet it cannot choose the cheapest combination of actuators across the system, nor move thermal work to a cheaper point on the route.**

These are two distinct decisions that feedback control does not take. *Control allocation* chooses *how* to produce the required heating or cooling at the current operating point (section 3). *Model predictive control* (MPC) chooses *when* to do it, using a forecast and correcting the plan repeatedly with measurements (section 4).

## 3. Allocation chooses the cheaper way to move heat

Allocation is possible because the thermal system is redundant: several actuators can deliver the same battery cooling demand. The coolant pump and radiator fan can reject the heat to outside air, or a compressor can move it through the refrigerant circuit to another circuit that needs it. The electrical cost of each option changes with vehicle speed and ambient temperature. This dependence is plotted in Figure 3 for the *same heat removed*, using generic component physics.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part2-fig3-cheapest-actuator-mobile.svg" width="360" height="516" />
		<img src="/images/blog/control-software-electric-trucks/part2-fig3-cheapest-actuator.svg" width="1000" height="500" alt="Illustrative plot of electrical power per unit of heat removed against ambient temperature. Radiator and fan power rises steeply near coolant temperature, especially at low vehicle speed, whereas refrigerant-circuit power rises more gradually. The cheapest option switches earlier at low speed." loading="lazy" />
	</picture>
	<figcaption>Figure 3. Electrical power per unit of heat removed against ambient temperature, comparing a radiator with fan at high and low vehicle speeds against a refrigerant circuit. Circles mark the changes in the cheaper option, and shading marks the range in which speed changes that choice. Generic component physics.</figcaption>
</figure>

At low ambient temperature, the radiator rejects the heat with little fan power. As the outside air approaches the coolant temperature, the radiator needs more airflow, and the fan power rises until the refrigerant circuit becomes cheaper. Driving supplies airflow without running the fan as hard, so at low vehicle speed this crossover moves to a lower ambient temperature. Consequently, a fixed priority order chosen at design time misses this change.

In practice, the problem is split into two layers. A higher-level controller first asks for a heat flow to or from each subsystem. These requests are *virtual control demands*, which specify *how much* thermal work is needed but not which pump or compressor provides it. **The allocator then selects the actuator settings that deliver those heat flows at the lowest total electrical power within the actuator limits** [5]. When an actuator saturates, the allocator can redistribute the demand, and when the full demand is impossible, it must minimise the shortfall according to component-protection priorities (Appendix A).

Because of this split, a change in the actuators is handled in the allocator. The higher-level controller stays the same. However, allocation optimises only the present operating point. If cheap cooling is available now and a climb lies ahead, the controller also needs a way to do part of that cooling in advance.

## 4. Route preview shifts thermal work to cheaper moments

To do thermal work in advance, a controller has to plan ahead and still correct itself with measurements. An MPC controller starts from the estimated temperatures, predicts their response to candidate actions over a finite horizon and chooses the sequence that meets the limits at minimum cost. It applies only the first action, and at the next step it measures again and replans [6, 7]. This *receding horizon* gives the forecast a feedback correction. When the cost is energy instead of the deviation from a set-point, the method is called *economic MPC* [8], and temperatures can then move within the permitted window whenever this saves energy.

A truck has good information for these forecasts. Route gradient and expected speed predict the propulsion heat, and speed also sets the radiator airflow. Ambient forecasts and the next charging stop add the other near-term demands. Hence, several disturbances in Figure 2 become known in advance instead of being corrected afterwards.

The battery's own thermal mass provides the storage needed to act on these forecasts. Lithium-ion cells have a specific heat of about 1,100 J/(kg·K) [9], so a 4-tonne battery stores about 1 kWh of heat per kelvin of temperature change. A usable window of 5 K holds about 5 kWh of heat, which a refrigerant circuit with a coefficient of performance (heat moved per unit of electricity) of 2–3 would need about 2 kWh of electricity to remove. During fast charging, the cell limits are tighter and this window narrows.

Figure 4 compares how the two controllers use this storage on level road followed by a climb and more level road. In this simple heat-balance comparison, feedback and predictive control start and finish at the same temperature and remove the same heat.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part2-fig4-climb-precooling-mobile.svg" width="360" height="740" />
		<img src="/images/blog/control-software-electric-trucks/part2-fig4-climb-precooling.png" width="3125" height="2431" alt="Illustrative three-panel route comparison: elevation rises on a climb, feedback holds battery temperature at its set-point and cooling power peaks on the climb, whereas prediction cools before the climb and lets the battery warm within its limit. Both finish at the same battery temperature after removing the same heat." loading="lazy" />
	</picture>
	<figcaption>Figure 4. Illustrative battery cooling with feedback and predictive control on level road and a climb (shaded). Panels show (a) road elevation, (b) temperature within the admissible window and (c) electrical cooling power. The controllers remove equal heat and finish at the same temperature. Simple battery heat balance.</figcaption>
</figure>

In the middle panel, prediction lowers the battery temperature before the climb and then lets it rise within its limit as the propulsion heat increases. In the lower panel, more of the cooling runs on level road, where airflow makes it cheaper. Feedback, by contrast, holds its set-point and requests its peak cooling during the climb. **Since both controllers remove the same heat and leave the battery at the same temperature for the next trip, the modelled advantage comes from *when* that heat is removed.**

A known fast-charging stop creates a related timing problem. Conditioning the battery too early loses heat to the surroundings, whilst conditioning it too late reduces the charging power on arrival. In an electric-car simulation over 480 km with two charging stops, optimising thermal conditioning together with charging and speed reduced the total charging time from 66 to 37 minutes [10]. This is a charging-time result for a car, so it does not add to the truck's 2–4% energy result.

Both timing problems appear in a second illustrative heat-balance example, which follows a longer route with a climb, an unforecast congestion and a charging stop. In Video 1, the controller predicts 20 minutes ahead, applies the first cooling action of each plan and replans from the next measurement. Compared with feedback, this simulation used 13% less *cooling-system* energy and reduced peak cooling power by 27% for the same final battery temperature.

<figure class="article-figure">
	<video controls preload="metadata" poster="/videos/control-software-electric-trucks/part2-video1-predictive-control-poster.png" width="1920" height="1080">
	  <source src="/videos/control-software-electric-trucks/part2-video1-predictive-control.mp4" type="video/mp4">
	  Video: illustrative predictive battery cooling compared with feedback on a climb, an unforecast congestion and a charging stop.
	</video>
	<figcaption>Video 1. Illustrative battery cooling under feedback and a 20-minute predictive horizon on a route with a climb, an unforecast congestion and a charging stop. Feedback is the reference, and the bar at right compares cooling energy. Simple heat-balance simulation.</figcaption>
</figure>

When the congestion changes the forecast, replanning from the next temperature measurement corrects the cooling schedule. The charging stop, by contrast, gives the controller a known future heat load. If the forecast is wrong, the feedback layer still protects the battery temperature (Appendix B).

Shifting heat in time also changes how two controllers must be compared. A controller can appear economical merely by finishing a test with a warmer battery, which postpones cooling to the next trip. A fair comparison therefore holds the initial and final thermal states equal, and in MPC a terminal cost or constraint enforces this condition alongside the temperature and actuator limits (Appendix A).

## 5. Fallback architecture of production controllers

A predictive plan can fail on a truck, for example when navigation data disappear or an actuator saturates. **Component limits therefore remain protected by a feedback fallback and protection functions that do not depend on the plan.** ISO 26262 [13] governs these functional-safety requirements, including freedom from interference between the predictive layer and the protection functions.

Even with all its data available, a plan is only useful if the control unit can compute it within its sample time, at every step. For this reason, a *control-oriented model* keeps the physical effects that alter the decision and leaves out detail that adds computing cost without changing it. Some battery and refrigerant states cannot be measured directly, so an observer combines the sensor signals with the model to estimate them. In a published battery-model comparison, for example, adding voltage hysteresis reduced driving-cycle error by less than 5% at a higher computational cost [11].

Mode changes make the optimisation harder still, because heat-pump and valve configurations are discrete choices. Layered planning and structured mode logic keep the calculation feasible. In a study of hybrid long-haul trucks, three layers with different horizons and update rates ran on current control units and saved 4–5% fuel [12], although the study concerns the energy management of hybrid trucks.

Models and software are checked in model-in-the-loop, software-in-the-loop and hardware-in-the-loop tests, followed by climate-chamber and vehicle tests across summer and winter conditions. I develop the truck software within these safety and software-quality processes, where model and solver choices produce a road saving only when the whole control and validation chain works.

## 6. Truck tests show a 2–4% whole-vehicle saving

Published studies report savings from predictive thermal control in cars, buses and trucks, but they measure them against different denominators. Some report cooling electricity, some battery energy and others heating electricity, and their baselines also differ (Appendix C). A 16.6% reduction in a cooling subsystem, for example, cannot be read as a 16.6% reduction in the energy used to drive a truck.

**In my work, predictive optimisation methods for thermal control allocation reduced total vehicle energy consumption by 2–4% against well-tuned conventional feedback control already in production.** The result was tested in trucks as well as in simulation, and several effects contribute to it. A battery kept closer to its best temperature has lower electrical losses and needs less active conditioning. The actuators can run at a better heat-pump coefficient of performance with less fan cycling, and the controller can reuse available heat or store thermal work in the battery. Figure 4 explains one of these mechanisms. The percentage itself comes from the truck tests, and the contribution of each mechanism has not been quantified separately.

The size of the saving depends on climate, route, hardware and the quality of the feedback baseline. A baseline that already uses some route information leaves less room for a new predictive layer. Whether the 2–4% transfers to another vehicle can be tested only with whole-vehicle energy on the same route, with equal initial and final thermal states and the same component limits.

## 7. Less energy can translate to less battery

Because the 2–4% refers to the energy of the whole truck, it can be converted directly into battery capacity. The saving is then either kept as extra range or used to reduce the battery for the original range. The second choice turns the saving into a *virtual battery*: capacity that need not be installed. For a normalised European 40-tonne long-haul truck with a 640 kWh battery (4.06 tonnes), 1.08 kWh/km consumption and 90% usable capacity, I define a 2–4% efficiency improvement as reducing consumption from *c*₀ to *c*₀/(1+*g*). **For the same range, this avoids 12.5, 18.6 or 24.6 kWh at gains of 2, 3 or 4%, respectively.** The reference truck and its costs are developed in [Part 3](/writing/control-software-electric-trucks-part-3-business-case/).

At the model's 154 €/kWh pack cost, this avoided hardware is worth about 1,900–3,800 €, and the battery is 80–156 kg lighter. The lighter battery in turn reduces the truck's mass and a small part of its consumption, so with the model's mass sensitivity the avoided capacity grows to 13.4, 19.9 and 26.2 kWh (85, 126 and 166 kg). Appendix D gives the mass calculation and Figure 5. This extra gain is modest because the battery is about one eighth of the operating mass and aerodynamic drag does not fall with mass. If the saved mass becomes payload instead, it cannot also produce the full lower-mass benefit.

These reductions apply to a *new specification* sized continuously, because a current truck cannot always remove battery capacity in such small increments and a truck already built keeps its packs. Across 10,000 new trucks, 12.5–24.6 kWh per truck corresponds to 125–246 MWh of capacity avoided before the mass feedback. Part 3 values this battery decision and the use of the saved mass. [Part 4](/writing/control-software-electric-trucks-part-4-design/) then examines what must be known before that decision is fixed.

## Summary and conclusions

The same thermal hardware can heat or cool a battery through paths with different electrical costs. Feedback control corrects temperature deviations and protects component limits, but it neither chooses the cheapest path across coupled circuits nor uses the route to shift thermal work. Control allocation adds the choice of *how* to meet each heat-flow demand, and MPC adds the choice of *when*, using forecasts and the battery's thermal mass.

In my work, these two layers together reduced total truck energy consumption by 2–4% against production feedback control in truck tests. On the normalised 640 kWh truck, using that gain for the same range **avoids about 12–25 kWh of battery**, or 13–26 kWh including the lighter-mass effect. These battery figures are model results, whereas the whole-vehicle energy saving comes from the truck tests. The result still depends on route, climate, hardware and baseline, and component protection must remain available when a forecast fails.

For another coupled thermal system, I would begin by measuring whole-system energy against a well-tuned feedback controller under matched initial and final states, and then test allocation and route preview separately where the hardware offers both choices. This first comparison shows whether the saving is large enough to justify the effort of modelling and validating a predictive controller.

## Appendix: method and evidence

### A. What the two optimisation problems solve

Control allocation takes a requested heat-flow vector *v* from a higher-level controller and selects actuator commands *u*. A compact expression is [5]:

$$
\min_{u}\;J(u)=\sum_i P_i(u_i)\quad\text{subject to}\quad B(u)=v,\quad u_{\min}\leq u\leq u_{\max}
$$

Here *P*ᵢ is each actuator's electrical power and *B*(*u*) describes the heat flows produced. If an actuator saturates or fails, its limits change and the allocator redistributes demand. If demand is infeasible, the shortfall is penalised according to protection priorities. This is the general form of the method, without the details of any truck implementation.

MPC predicts the evolution of the estimated state *x* with disturbance forecast *d* over *N* steps [6–8]:

$$
\min_{u_0,\dots,u_{N-1}}\sum_{k=0}^{N-1}\ell(x_k,u_k,d_k)+V_f(x_N)
$$

$$
x_{k+1}=f(x_k,u_k,d_k),\qquad x_k\in\mathcal X,\quad u_k\in\mathcal U
$$

The admissible sets $\mathcal X$ and $\mathcal U$ contain state and input limits. The term $V_f$ is the terminal cost. With energy as the stage cost $\ell$, temperatures may vary within those limits to avoid costly cooling later. A terminal cost or constraint must prevent the apparent saving that would result from finishing a comparison with stored thermal work still unpaid. In production, cell-core temperature, heat generation and some flows require state estimation. Discrete modes can be handled with a separate mode layer or combined with the optimisation, at the cost of a harder calculation [12]. Sample-time feasibility, fallback on missing forecasts and tests from simulation through vehicle operation remain requirements that these equations do not prove.

### B. The illustrative route with a missed forecast

Video 1 in section 4 uses a simple battery heat balance. Its 20-minute prediction is recalculated at each step from the measured temperature; only the first cooling action of each plan is applied. The unexpected congestion changes the route forecast after planning has started. Replanning from the new measurement corrects the schedule, whilst the separate feedback layer protects the temperature limit. The charging stop adds a known future heat load to the forecast.

### C. Published results use different denominators

The studies in Table 1 show the range of methods and test conditions. Their reported percentages cannot be added or used as estimates of the truck-test whole-vehicle gain, because a saving in cooling energy has a different denominator from a saving in traction-battery energy.

*Table 1. Published predictive and optimisation-based thermal-control results.*

| Study | Baseline, system and evidence | Reported result |
| --- | --- | --- |
| Amini, Kolmanovsky, Sun [14] | Electric-car battery cooling with traffic preview, simulation | Up to 5.4% less battery energy |
| Lopez-Sanz et al. [15] | Plug-in-hybrid cooling, nonlinear MPC against state-machine control, simulation | More than 5% less cooling energy |
| Fuel-cell truck, 40 t [16] | Thermal management, nonlinear MPC against PI control, simulation | 16.6% less cooling energy |
| Truck cab heating [17] | Predictive heating, simulation | 8.1% less heating energy, up to 21.7% with waste-heat reuse |
| Electric bus A/C [18] | MPC of air conditioning | 8% less energy |
| Tomanik et al. [19] | Integrated driving and fast-charging thermal control, 3.7 kWh pack, experiment | 9.91% less thermal-management energy |
| Fast-charging preconditioning [20] | Predictive battery heating before charging | Up to 4.5% shorter charging time |

Hamednia et al. [10] report a different outcome again: the electric-car charging-time reduction cited in section 4. None of these studies isolates the contribution of the individual control mechanisms within my 2–4% truck result.

### D. Battery sizing and the mass feedback

The same-range calculation holds the usable share constant. With starting capacity $E_0=640$ kWh and $c_1=c_0/(1+g)$, avoided capacity before accounting for mass is $E_0-E_0/(1+g)$. At 2, 3 and 4%, it gives 12.5, 18.6 and 24.6 kWh. At 157.5 Wh/kg (640 kWh in 4.06 tonnes) this corresponds to approximately 80, 118 and 156 kg. The pack cost of 154 €/kWh gives approximately 1,900, 2,900 and 3,800 €.

For the mass effect, let $f$ be battery mass divided by average operating mass (4.06/32 = 0.127), and let $\varepsilon$ be the sensitivity of consumption to mass. The model uses $\varepsilon=0.5$, derived from the force balance at 80 km/h with comparable rolling and aerodynamic resistance. Reported heavy-truck values are approximately 0.4–0.65 [21, 22]. Thus 1% less mass yields about 0.5% less consumption under this assumption. With battery mass proportional to capacity, the fractional capacity reduction *x* and the equivalent efficiency gain $g_{\mathrm{eq}}$ are:

$$
x=\frac{g}{1+g-\varepsilon f},\qquad g_{\mathrm{eq}}=\frac{g}{1-\varepsilon f}\approx 1.07g
$$

The mass feedback adds about 7% to the *efficiency gain*, not seven percentage points to the original 2–4%. Gains of 2, 3 and 4% become equivalent gains of 2.14, 3.20 and 4.27%. Figure 5 plots avoided battery capacity over 0–5% gain with and without that feedback, and varies $\varepsilon$ over the reported range.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part2-fig5-virtual-battery-mobile.svg" width="360" height="485" />
		<img src="/images/blog/control-software-electric-trucks/part2-fig5-virtual-battery.svg" width="1000" height="490" alt="Battery capacity avoided for the same range rises towards about 30 kWh at a 5% gain. With mass feedback at 2, 3 and 4%, 13.4, 19.9 and 26.2 kWh (85, 126 and 166 kg) are avoided. The band for mass sensitivity 0.4–0.65 is narrow." loading="lazy" />
	</picture>
	<figcaption>Figure 5. Avoided battery capacity (left axis) and mass (right axis) against efficiency gain for a 640 kWh, 4.06-tonne battery. The dashed line excludes mass feedback, the solid line includes feedback at ε = 0.5, and the band covers ε = 0.4–0.65 [21, 22]. Labels mark 2, 3 and 4%, and shading marks the truck-test gain range. Model results for the same range, not measured avoided hardware.</figcaption>
</figure>

The solid and dashed lines stay close because only about one eighth of the operating mass is battery and aerodynamic drag does not fall when mass falls. If capacity comes in fixed packs, the calculated reduction is available only in a new specification or a suitable battery variant. Payload use also excludes the lighter-mass benefit for the mass that remains on the truck as cargo.

## References

1. M. Johansson, L. Eriksson, Model-based design and evaluation of state-of-the-art thermal management systems for electrified trucks, *Energies*, 18(3), 673, 2025. https://doi.org/10.3390/en18030673
2. J. F. Hellmuth, M. Steeb, M. Pollak, F. Jäger, W. Tegethoff, J. Köhler, Innovative thermal management operating strategies for battery-electric heavy-duty trucks, *Proceedings of ECOS 2023*, pp. 2581–2592, 2023. https://doi.org/10.52202/069564-0232
3. A. Wray, K. Ebrahimi, Octovalve thermal management control for electric vehicle, *Energies*, 15(17), 6118, 2022. https://doi.org/10.3390/en15176118
4. K. J. Åström, R. M. Murray, *Feedback Systems: An Introduction for Scientists and Engineers*, 2nd ed., Princeton University Press, 2021. https://fbswiki.org
5. T. A. Johansen, T. I. Fossen, Control allocation: a survey, *Automatica*, 49(5), 2013. https://doi.org/10.1016/j.automatica.2013.01.035
6. J. B. Rawlings, D. Q. Mayne, M. M. Diehl, *Model Predictive Control: Theory, Computation, and Design*, 2nd ed., Nob Hill Publishing, 2017. https://sites.engineering.ucsb.edu/~jbraw/mpc/
7. D. Q. Mayne, J. B. Rawlings, C. V. Rao, P. O. M. Scokaert, Constrained model predictive control: stability and optimality, *Automatica*, 36(6), 2000. https://doi.org/10.1016/S0005-1098(99)00214-9
8. M. Ellis, H. Durand, P. D. Christofides, A tutorial review of economic model predictive control methods, *Journal of Process Control*, 24(8), 2014. https://doi.org/10.1016/j.jprocont.2014.03.010
9. K. A. Murashko, J. Pyrhönen, J. Jokiniemi, Determination of the through-plane thermal conductivity and specific heat capacity of a Li-ion cylindrical cell, *International Journal of Heat and Mass Transfer*, 163, 2020. https://doi.org/10.1016/j.ijheatmasstransfer.2020.120330
10. A. Hamednia, N. Murgovski, J. Fredriksson, J. Forsman, M. Pourabdollah, V. Larsson, Optimal thermal management, charging, and eco-driving of battery electric vehicles, *IEEE Transactions on Vehicular Technology*, 72(6), 2023. https://doi.org/10.1109/tvt.2023.3240279
11. M.-K. Tran, A. Mevawala, S. Panchal, K. Raahemifar, M. Fowler, R. Fraser, Effect of integrating the hysteresis component to the equivalent circuit model of lithium-ion battery for dynamic and non-dynamic applications, *Journal of Energy Storage*, 32, 2020. https://doi.org/10.1016/j.est.2020.101785
12. L. Johannesson, N. Murgovski, E. Jonasson, J. Hellgren, B. Egardt, Predictive energy management of hybrid long-haul trucks, *Control Engineering Practice*, 41, 2015. https://doi.org/10.1016/j.conengprac.2015.04.014
13. ISO 26262:2018, Road vehicles: Functional safety, Parts 1–12, International Organization for Standardization, 2018. https://www.iso.org/standard/68383.html
14. M. R. Amini, I. Kolmanovsky, J. Sun, Hierarchical MPC for robust eco-cooling of connected and automated vehicles and its application to electric vehicle battery thermal management, *IEEE Transactions on Control Systems Technology*, 2020. https://doi.org/10.1109/tcst.2020.2975464
15. J. Lopez-Sanz et al., Nonlinear model predictive control for thermal management in plug-in hybrid electric vehicles, *IEEE Transactions on Vehicular Technology*, 2016. https://doi.org/10.1109/tvt.2016.2597242
16. Energy-efficient thermal management of a fuel-cell heavy-duty truck via nonlinear model predictive control, *Energies*, 2026. https://doi.org/10.3390/en19133123
17. Enhancing thermal comfort and efficiency in fuel cell trucks: a predictive control approach for cabin heating, *World Electric Vehicle Journal*, 2025. https://doi.org/10.3390/wevj16100568
18. Model predictive control of the air-conditioning system for electric bus, *Energy Procedia*, 2017. https://doi.org/10.1016/j.egypro.2017.03.694
19. Tomanik et al., Integrated predictive control of battery thermal management, *Applied Thermal Engineering*, 2026. https://www.sciencedirect.com/science/article/pii/S1359431126000190
20. Predictive battery thermal management for fast charging, *Automotive and Engine Technology*, 2025. https://doi.org/10.1007/s41104-025-00157-7
21. J. Le Corguillé, F. Hacker, K. Göckeler, M. Mottschall, T. Dolinga, Real-world data analysis of energy consumption, activity and charging patterns of battery electric trucks operating in Germany, Öko-Institut, 2025. https://www.oeko.de/fileadmin/oekodoc/Real-world-data-analysis-of-battery-electric-trucks.pdf
22. A. Shiledar et al., Assessing geographical and seasonal influences on energy consumption and driving range for electric drayage trucks, *SAE International Journal of Electrified Vehicles*, 15(3), 253–273, 2026. https://doi.org/10.4271/14-15-03-0013

*The methods and circuits are described in general terms from the cited literature. No confidential control algorithm, data or vehicle layout is disclosed. Battery capacities and costs use the normalised truck model of Part 3.*
