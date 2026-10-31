---
title: "The value of control software in electric heavy-duty trucks, Part 2"
subtitle: "Predictive thermal management of the battery"
description: "How the thermal management of an electric truck is controlled, and how predictive control, which plans ahead along the route, reduces its energy use."
teaser: "How predictive control along the route reduces the energy used to keep the battery at temperature."
publishDate: 2026-11-02
readingTime: 31 min read
category: Control Algorithms & Diagnostics
tags:
  - Electric trucks
  - Thermal management
  - Model predictive control
  - Control allocation
  - Battery thermal management
series:
  id: control-software-electric-trucks
  part: 2
keyFigure:
  value: "Up to 25 kWh"
  label: "less battery for the same range, with predictive thermal control"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part2-social.png"
  alt: "Part 2 of 4 of the series on control software in electric heavy-duty trucks: Predictive thermal management of the battery. Up to 25 kWh less battery for the same range, with predictive thermal control."
featured: false
draft: false
---

## The role of the control software

An electric truck has to keep its battery, power electronics and cab within their temperature ranges at all times, and the energy for this comes from the same battery that drives the wheels. The thermal management system does this work, and the control software decides how that system is operated, regardless of the ambient and driving conditions. Most thermal systems are currently controlled with closed-loop feedback, which corrects a temperature once it has deviated from its target and does not take the energy cost of that correction into account.

In my work, I am responsible for the design of thermal management strategies for electric trucks. Predictive and optimisation-based methods use a model of the system and what is known about the route to decide in advance, and they reduced the total energy consumption of the truck by 2–4% compared with standard feedback control. These results have been tested in trucks, in addition to simulation.

[Part 1](/writing/control-software-electric-trucks-part-1-context/) described the components of the thermal management system. This part goes one level deeper and follows four questions in order: why the thermal control problem is difficult, which control approach decides both how and when thermal energy is spent, how such a controller runs reliably on a production truck, and how much battery capacity the saving is worth.

## 1. The control problem

To compare control approaches, the problem they solve has to be defined first, starting from the system that is controlled. A generic thermal management system of an electric truck, generalized from published integrated architectures [1–3], is illustrated in Figure 1. The components are placed from left to right in the order they have in the truck: the front-end module with the fan behind the grille, then the cab, the battery with the heat pump, and the power electronics.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part2-fig1-thermal-topology.png" alt="Circuit diagram of a thermal management system, from the front of the truck on the left to the rear on the right. A single fan blows ambient air through a front-end module with a front condenser, a cab AC condenser, a battery radiator and a power electronics radiator. A cab AC refrigerant circuit cools the cab evaporator. A heat-pump refrigerant circuit with compressor, chiller, liquid-cooled condenser, expansion valve and a 2-way bypass of the front condenser connects the battery coolant to the cab coolant. The cab coolant circuit has a pump, the liquid-cooled condenser, a PTC heater, a 3-way valve and the heater core. The battery coolant circuit has a pump, a PTC heater, three battery packs in parallel, 3-way valves to the radiator, the chiller or the power electronics circuit, and a 2-way valve to the cab circuit. The power electronics coolant circuit has a pump, the power electronics, an oil cooler and a 3-way valve to the radiator or a bypass; a small oil circuit with its own pump cools the electric motor." loading="lazy" />
	<figcaption>Figure 1. Generic thermal management system of an electric truck, generalized from published integrated architectures [1–3]. The components are placed from the front of the truck (left) to the rear (right). Dashed purple lines: refrigerant; orange: cab coolant; green: battery coolant; blue: power electronics coolant; brown: motor oil. The arrows indicate the flow direction; the symbols are defined in the legend.</figcaption>
</figure>

The system serves three subsystems, each with its own coolant circuit and pump: the cab, the battery (three packs in parallel) and the power electronics, which also cool the electric motor through a small oil circuit and an oil cooler. Heat is generated in two ways. The battery, the power electronics and the motor produce it as losses whilst the truck drives or charges, and two electric (PTC) heaters, one in the cab circuit and one in the battery circuit, produce it on demand. All other components move heat. The pumps and valves decide where each coolant flows, and the radiators and condensers of the front-end module, together with the fan, reject heat to the ambient air. Two refrigerant circuits move heat from a cold source to a warmer sink: the cab air-conditioning (AC) circuit cools the cab through its evaporator, whereas the heat-pump circuit takes heat from the battery coolant through the chiller and releases it either to the ambient air through the front condenser or to the cab coolant through the liquid-cooled condenser.

The battery circuit is the link between the other two. At the battery outlet, a 3-way valve sends the coolant either to the battery radiator or to a second 3-way valve, which leads it to the chiller or into the power electronics circuit. In the opposite direction, the power electronics coolant can return through the chiller to the battery inlet, the cab circuit can send coolant heated by its PTC heater to the battery, and a 2-way valve connects the battery outlet with the cab circuit. Consequently, the heat of one component can reach almost any other component, and the same heat flow can follow more than one path. Some examples of the configurations this allows are:
- **Mild ambient:** the battery and the power electronics reject their heat through their own radiators, with the fan, whilst both refrigerant circuits are off.
- **Hot ambient or fast charging:** the radiator cannot keep the battery within its limits, so the battery coolant passes through the chiller, and the heat-pump compressor moves the battery heat to the front condenser.
- **Cold start:** the power electronics bypass their radiator and send their losses to the battery through the chiller line, with the compressor off. The battery PTC heater adds the heat that is still missing.
- **Winter driving:** the heat pump takes heat from the battery and power electronics coolant through the chiller and delivers it to the cab through the liquid-cooled condenser and the heater core. The front condenser is bypassed, so that no heat is lost to the ambient air, and the cab PTC heater covers only the remaining demand.

Each configuration is a combination of valve positions, and within each one the controller still sets continuous inputs: the pump, compressor and fan speeds and the heater power. Several configurations can meet the same temperature demand at very different energy costs. For example, a cold battery can be warmed by its PTC heater, which converts each kilowatt-hour of electricity into one kilowatt-hour of heat, by the waste heat of the power electronics, which is free, or by the heat pump, which moves more heat than the electricity it consumes. Therefore, the thermal management control system has to choose the configuration and set its inputs at the same time, and the best choice depends on the conditions that follow.

The figure already shows the core of the control problem: several actuators act on the same temperatures, and the heat of a component can be removed through more than one path. A control problem is described by the states of the system, the inputs the controller acts on, the disturbances that act from outside, the constraints that must be respected and the objective. For an electric truck, these are commonly the following.

**States (x):** the quantities that describe the system at any moment.
- temperatures of the battery cells and modules;
- temperatures of the coolant in each circuit;
- temperatures of the power electronics and electric motors;
- the pressures and temperatures in the refrigerant circuit;
- the cab air temperature and humidity.

Some of these states are measured directly. Others, such as the temperature inside a battery cell, have to be estimated.

**Inputs (u):** the commands the controller can act on.
- pump speeds;
- valve positions;
- compressor speed;
- fan speed;
- heater power;
- the operating mode of the heat pump;
- the cab blower and air distribution.

**Disturbances (d):** the influences that act on the system from outside, which the controller cannot choose.
- ambient temperature;
- vehicle speed, which drives the airflow through the radiators;
- heat produced by the battery and drivetrain, which depends on the propulsion power and therefore on the road gradient, the load and the traffic;
- heat produced during charging.

**Constraints:** the limits that must never be violated.
- temperature ranges for the cells, with tighter limits during fast charging;
- maximum temperatures and temperature gradients for the power electronics and motors;
- pressure and speed limits of the refrigerant circuit;
- the operating range of each actuator;
- cab comfort.

**Objective:** formulated as an optimisation problem, the final goal is to meet every constraint with the minimum energy, whilst protecting the components over their life.

These elements, and the way they are connected, are summarised in Figure 2.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part2-fig2-control-problem.png" alt="Block diagram: the controller sends the inputs (u) to the thermal system, the disturbances (d) act on the thermal system, and sensors and a state estimator return the states (x) to the controller. A dashed path carries the predicted disturbances (route and gradient, speed, ambient, next charging stop) to the controller." loading="lazy" />
	<figcaption>Figure 2. The thermal control problem as a block diagram. The controller sets the inputs (u) of the thermal system, whose states (x) are affected by the disturbances (d); sensors and a state estimator return the states to the controller. The dashed path indicates the predicted disturbances, which are used by predictive control (section 4).</figcaption>
</figure>

Feedback control, described in section 2, uses only the loop from the measured states to the inputs. Predictive control also uses the dashed path, i.e. what the truck knows about the disturbances before they arrive.

The objective is hard to reach because of five properties of the system:
- **Coupled:** the circuits share heat exchangers and energy sources. Therefore, changing one input moves several temperatures at once.
- **Nonlinear:** heat transfer depends on flow rates and temperature differences. The efficiency of the refrigerant circuit, its coefficient of performance (COP, the heat moved per unit of electrical energy), changes with the operating conditions.
- **Hybrid:** the system switches between discrete operating modes (for example, heat pump or chiller, and different valve configurations) whilst it also varies continuous inputs.
- **Very different time scales:** refrigerant pressures change in seconds, whereas the temperature of a 4-tonne battery changes over tens of minutes.
- **Strongly disturbed:** on a long-haul route, the propulsion power varies all the time with the road gradient.

Hence, a controller for this system has to coordinate several actuators at once, account for both fast and slow dynamics, and handle large disturbances, all with the minimum energy. These requirements are the yardstick for the established approach, feedback control.

## 2. Feedback control: the established approach

Since most thermal systems in production use feedback control, it is the reference against which any other approach has to be measured. Feedback control covers the safety side of the problem defined in section 1; however, it leaves the energy side unsolved.

In *closed-loop feedback control*, for each controlled temperature, a controller compares the measured value with a target (the set-point) and adjusts one actuator to reduce the difference. The usual building blocks are:
- PI or PID controllers;
- hysteresis and threshold logic;
- state machines that select the operating mode;
- look-up tables that adapt the controller gains to the operating point (gain scheduling).

This simple feedback architecture has three strengths [4]. It is robust to model errors, because it corrects whatever deviation it measures. It is computationally cheap and well understood. It is also easy to test and to certify.

However, its limitations are structural, and they correspond to the properties of section 1:
- **It acts on errors that already exist:** the controller responds after a temperature has moved. Information about what will happen next (a climb in ten minutes, or a charging stop in half an hour) has no use in this structure.
- **Loops are designed one at a time:** in a coupled system, separate loops can work against each other, and the overall energy consumption is not minimised by design. Decoupling logic and priorities make coordination possible, but their complexity grows quickly.
- **Constraints are handled indirectly:** saturations, priorities and overrides keep the system safe. However, they are added on top of the loops instead of being part of the decision.
- **The objective is tracking:** a feedback loop keeps its temperature near the target. The energy needed to hold that target is not part of the decision, and neither is a slightly different temperature that would still be acceptable and cheaper overall.

Since these limitations come from the structure (one loop, one actuator, one present error), better tuning cannot remove them. Feedforward control (an action computed from a measured disturbance before it moves the controlled temperature) can compensate measured disturbances. For example, it adds cooling when the propulsion power increases. This improves the response time; however, feedforward control is still a reaction to the present.

Therefore, reducing the energy consumption requires two decisions that feedback control does not make: how to share the thermal work between the actuators, and when to do it. Section 3 addresses the first decision and section 4 the second.

## 3. Optimisation-based control allocation

The first decision missing in feedback control is which actuators deliver the thermal work. Optimisation-based control allocation makes it at every control step, at the lowest energy cost.

The decision is possible because the thermal system of an electric vehicle is redundant (several actuators can produce the same thermal effect). This redundancy comes from extreme operating conditions, dimensioning for the worst-case scenario and the control of separate subsystems, among others, and it adds complexity. However, it also provides many degrees of freedom, since heat can be moved between the subsystems, towards where it is needed or away from where it must be removed, in many different ways.

For example, to remove a given amount of heat from the battery, the system can:
- run the compressor faster;
- increase coolant flow through a radiator;
- increase fan speed;
- change a valve position;
- transfer the heat to another part of the vehicle that needs it, such as the cab in winter.

The energy cost of each option depends on the operating point: vehicle speed, ambient temperature, the temperatures of the circuits involved and the efficiency of the refrigerant circuit at that moment. To illustrate this dependence, the electrical power needed to remove the same amount of heat with two generic options, a radiator with its fan and the refrigerant circuit, is plotted in Figure 3 as a function of the ambient temperature.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part2-fig3-cheapest-actuator.png" alt="Line plot: the power of the radiator and fan is low at low ambient temperature and rises steeply as the ambient approaches the coolant temperature; the power of the refrigerant circuit rises gradually. The curves cross at a lower ambient temperature when the vehicle drives slowly." loading="lazy" />
	<figcaption>Figure 3. Electrical power needed per unit of heat removed, as a function of the ambient temperature, for a radiator with fan at high and low vehicle speed and for the refrigerant circuit. The circles indicate where the cheapest option changes; the shaded area indicates the range of ambient temperatures in which the cheapest option depends on the vehicle speed. Illustrative, generic physics; not measured data.</figcaption>
</figure>

At a low ambient temperature, the radiator is the cheapest option, because the outside air removes the heat with little fan power. As the ambient temperature approaches the coolant temperature, the radiator needs more and more airflow, and the fan power rises steeply until the refrigerant circuit becomes cheaper. The point at which this happens also depends on the vehicle speed, since the airflow from driving is free; at low speed, it moves to a lower ambient temperature. Therefore, the cheapest option changes with the operating point, no fixed priority order is optimal, and the choice has to be made on-line.

One option is a single, complex optimisation problem that integrates every control action and its efficiency. Instead, the problem can be structured in abstraction layers and split in two. The first layer solves the energy problem (the heat flows), and the second decides how those heat flows are produced. The second layer is the so-called *control allocation* problem. The two questions are:
1. **How much:** the heating or cooling that each subsystem needs. A higher-level controller answers this question with a set of *virtual control demands*, typically heat flows.
2. **How:** the way to deliver those demands with the available actuators. The allocator answers this question.

In optimisation-based allocation, the second question is formulated as a constrained optimisation problem, which is solved at every control step [5]. The cost is the total electrical power of the actuators, and the constraints are the demanded heat flows and the actuator limits:

$$
\min_{u}\; J(u) = \sum_i P_i(u_i) \quad \text{subject to} \quad B(u) = v,\quad u_{\min} \le u \le u_{\max}
$$

where:
- *u* is the vector of actuator commands;
- *P*ᵢ is the electrical power of actuator *i*;
- *B*(*u*) describes the heat flows the actuators produce;
- *v* is the virtual demand.

When the demand cannot be met exactly, the problem is reformulated to minimise the deviation from the demand, with priorities that protect the most critical components first.

Compared with the fixed loops of section 2, this formulation has three advantages:
- **Energy-optimal distribution:** at every operating point, the allocator uses the cheapest combination of actuators. A conventional design uses a fixed priority order chosen at design time instead.
- **Explicit handling of limits:** when an actuator saturates, the allocator redistributes the demand among the others automatically.
- **Modularity and fault tolerance:** if an actuator fails or is degraded, its limits are updated and the allocator redistributes the demand. The higher-level controller does not have to change. This modularity is the main advantage of the formulation, because a change in the actuators is absorbed by the allocator alone.

Control allocation is well established in aerospace, marine and vehicle dynamics applications [5]. In thermal management, the difficulty lies in the coupling between circuits, the nonlinear efficiency of the refrigerant circuit and the discrete operating modes. However, the allocator optimises each instant separately, and the second missing decision (when to do the thermal work) remains open.

## 4. Model predictive control

The second limitation of feedback control is that it reacts to the present. Control allocation makes the best decision for the present; *model predictive control* (MPC) makes the best decision for the present *taking the future into account* [6, 7]. Therefore, MPC decides when thermal work is done.

At every control step, the MPC controller:
1. starts from the current estimated state *x*₀;
2. uses a model of the thermal system to predict its evolution over a horizon of *N* steps for a sequence of candidate inputs;
3. solves an optimisation problem to find the input sequence with the lowest cost that respects all constraints;
4. applies only the first input of that sequence;
5. repeats the whole calculation at the next step, with new measurements and updated forecasts.

This principle is called the *receding horizon*. Since the calculation is repeated with new measurements, forecast errors are corrected at every step, and this gives MPC its feedback character. In compact form, the controller minimises the sum of the stage costs over the horizon plus a terminal cost, subject to the model and the admissible sets:

$$
\min_{u_0,\dots,u_{N-1}} \sum_{k=0}^{N-1} \ell(x_k, u_k, d_k) + V_f(x_N)
$$

subject to:

$$
x_{k+1} = f(x_k, u_k, d_k), \quad x_k \in \mathcal{X}, \quad u_k \in \mathcal{U}
$$

where:
- $d_k$ are the predicted disturbances;
- $\mathcal{X}$ and $\mathcal{U}$ are the sets of admissible states and inputs;
- $V_f$ is a terminal cost.

When the stage cost $\ell$ (the cost assigned to each step of the horizon) is the energy consumed, instead of a tracking error, the method is called *economic MPC* [8]. The controller then minimises energy directly. Hence, temperatures are allowed to move freely within their admissible windows whenever this lowers the total consumption, which removes the tracking objective identified as a limitation in section 2.

### What the truck knows about its future

An MPC controller can only anticipate what it can predict, so its performance depends on the quality of the predicted disturbances. A truck has unusually good information about its next hour:
- **Route and topography:** from the navigation system and map data. The gradient profile translates into a propulsion power profile, and the propulsion power into the heat produced in the battery and drivetrain.
- **Expected speed:** it determines both the propulsion power and the airflow available for the radiators.
- **Ambient temperature:** the temperature forecast along the route.
- **Next charging stop:** its expected arrival time and charging power.

Therefore, most of the disturbances listed in section 1 (propulsion heat, airflow, ambient temperature and charging) can be forecast, and they become inputs to the decision instead of deviations to correct afterwards.

### What MPC can do with that information

A forecast is only useful if the controller has a way to act on it in advance. The main physical resource for this is *thermal storage*. The specific heat of lithium-ion cells is about 1,100 J/(kg·K) [9], so a battery of 4 tonnes stores roughly 1 kWh of heat per kelvin. A window of 5 K holds about 5 kWh of heat, which a refrigerant circuit with a COP of 2–3 would need about 2 kWh of electricity to remove. Therefore, within its admissible window, the battery temperature can be used as a buffer that shifts thermal work in time, towards the moments when that work is cheapest. Some examples are:
- **Before a long climb:** the controller cools the battery slightly whilst the truck is on level road at speed, where the radiators receive plenty of airflow and cooling is cheap. During the climb, the battery absorbs part of the heat within its window, so less active cooling is needed when the system is most loaded.
- **Before a descent:** the controller avoids cooling a component that will soon be cooled by the reduced load, or that will soon need heat.
- **Before fast charging:** the controller warms or cools the battery so that it arrives at the temperature at which it accepts full charging power. If the conditioning starts too early, the heat is lost to the environment. If it starts too late, the first minutes of charging are slow. For an electric car on a 480 km route with two charging stops, optimising the battery conditioning together with charging and speed reduced the total charging time from 66 to 37 minutes [10].
- **Choice of operating mode:** switching a heat pump or changing a circuit configuration has a cost. Knowing what is coming allows the controller to avoid unnecessary switching.

The first example is plotted in Figure 4, which compares feedback control and predictive control on the same route: level road, a long climb and level road again. Both controllers remove the same heat and end at the same battery temperature.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part2-fig4-climb-precooling.png" alt="Three stacked panels over time: road elevation with a long climb; battery temperature, held at the set-point by feedback control and moved within the admissible window by predictive control; cooling power, which peaks during the climb with feedback control and is shifted to the level road with predictive control." loading="lazy" />
	<figcaption>Figure 4. Battery cooling with feedback control and with predictive control on a route with a long climb (shaded): (a) road elevation, (b) battery temperature within its admissible window, (c) electrical power for cooling. Both controllers remove the same heat and end at the same temperature. Illustrative, simple battery heat balance; not measured data.</figcaption>
</figure>

Feedback control holds the battery at its set-point, so its cooling power follows the heat produced and peaks during the climb, when cooling is most expensive. Predictive control cools the battery below the set-point on the level road, lets it warm up within the admissible window during the climb and recovers after it. The heat removed is the same; however, a larger part of it is removed when cooling is cheap. Hence, the battery temperature is used as a thermal store, and the tracking objective identified in section 2 disappears.

Figure 4 shows the result of the plan, but not the way the plan is made. For the reader who wants to see the mechanism, Video 1 follows the predictive controller step by step on a longer and more demanding route. In addition to the climb, the route includes a traffic congestion that is not in the forecast and a charging stop. At every step, the controller predicts the next 20 minutes, plans the cooling over that horizon and applies only the first step of the plan, as described at the beginning of this section. The congestion shows how the plan is corrected when the forecast is wrong, and the charging stop shows how the battery is precooled before a known heat load. On this route, predictive control uses 13% less cooling energy than feedback control and reduces the peak cooling power by 27%, for the same final battery temperature.

<figure class="article-figure">
	<video controls preload="metadata" poster="/videos/control-software-electric-trucks/part2-video1-predictive-control-poster.png">
	  <source src="/videos/control-software-electric-trucks/part2-video1-predictive-control.mp4" type="video/mp4">
	  Video: predictive battery cooling compared with feedback control on a route with a climb, an unforecast congestion and a charging stop.
	</video>
	<figcaption>Video 1. Battery cooling with feedback control and with predictive control (20-minute prediction horizon) on a route with a long climb, a congestion that is not in the forecast and a charging stop. Feedback control is shown first as the reference; the bar on the right compares the cooling energy of both controllers. Illustrative, simple battery heat balance; not measured data.</figcaption>
</figure>

In all these examples, the energy saving comes from doing the same thermal work at a cheaper moment, or from avoiding work that the future makes unnecessary.

### Comparison baseline

Shifting thermal work in time also creates a risk when controllers are compared. A controller can always look efficient over a single trip if it finishes the trip with a colder battery or a cooler cab, since the thermal work is then left to the next trip. The terminal cost $V_f$, or a terminal constraint, solves this measurement problem. Therefore, comparisons between controllers are only valid when the initial and final thermal states are equal.

With the method defined, the remaining engineering question is whether it can run reliably on a production truck.

## 5. Implementation in a production truck

An energy saving in simulation has to be reproduced in a vehicle. The mathematics of predictive control is described in the textbooks cited above; the most difficult part is turning it into reliable software that runs on a series-production truck. Six aspects decide this step:

**Models:** the predictive model has to be accurate enough to make good decisions and simple enough to solve in real time. Usually, it is a control-oriented grey-box model, i.e., a model with a physical structure whose parameters are identified from test data. Part of the expertise lies in deciding which details change the decision and which can be neglected. For example, adding voltage hysteresis to an equivalent-circuit battery model reduced its error on driving cycles by less than 5%, at a higher computational cost [11].

**State estimation:** cell core temperatures, heat generation and some flow rates are not measured directly. Observers (algorithms that combine the available sensors with the models), such as Kalman filters, reconstruct them.

**Computation:** automotive control units have limited computing power and strict timing. Therefore, the optimisation problem must be formulated so that it is solved reliably within its sample time, at every step. Possible approaches are a convex approximation, a tailored solver, off-line pre-computation or a suitable split between fast and slow layers. For hybrid long-haul trucks, a split into three layers with different horizons and update rates made predictive energy management feasible on current control units, with a fuel saving of 4–5% [12].

**Hybrid decisions:** discrete mode choices turn the problem into a mixed-integer one (with both integer and continuous decision variables), which is expensive to solve exactly. The solutions used in vehicles combine optimisation with structured mode logic, or solve the discrete choices in a separate layer below a convex planning layer [12].

**Robustness and fallback:** routes change, traffic deviates from the forecast and the navigation data may be missing. The controller must stay safe and efficient with imperfect information, and fall back to a robust feedback layer when needed. Component protection must never depend on the forecast being right. In the terms of the functional safety standard ISO 26262 [23], the protection functions carry the safety requirements, and the predictive layer must be free from interference with them: it can change how the system is operated, but not the limits that protect it.

**Validation:** the software is verified and validated step by step:
- model-in-the-loop and software-in-the-loop simulation;
- hardware-in-the-loop test benches;
- climate chambers;
- vehicle tests in summer and winter conditions.

All these steps follow the functional safety (ISO 26262 [23]) and software quality processes of the automotive industry, which apply to the software I develop.

Hence, an optimisation idea becomes an energy saving on the road only when these six aspects work together, and the choice of algorithm is one part of that combination. The size of the saving that results is quantified in section 6.

## 6. What the research shows

Once the methods run on a vehicle, the question is how much energy they save. Published studies give the range of savings found by other groups, and my own results give the value against production feedback control.

The published results are summarised in Table 1. The reference of each result (cooling, heating, battery or vehicle energy) changes from row to row.

*Table 1. Published results of predictive and optimisation-based thermal control.*

| Study | System and method | Result |
| --- | --- | --- |
| Amini, Kolmanovsky, Sun [13] | Battery cooling, electric car, hierarchical MPC with traffic preview, simulation | Up to 5.4% less battery energy |
| Lopez-Sanz et al. [14] | Cooling, plug-in hybrid, nonlinear MPC vs state machine, simulation | More than 5% less cooling energy |
| Fuel-cell truck, 40 t [15] | Thermal management, nonlinear MPC vs PI control, simulation | 16.6% less cooling energy |
| Truck cab heating [16] | Predictive heating, simulation | 8.1% less heating energy, up to 21.7% with waste-heat reuse |
| Electric bus A/C [17] | MPC of the air-conditioning system | 8% less energy |
| Tomanik et al. [18] | Integrated driving and fast-charging thermal control, 3.7 kWh pack, experiment | 9.91% less thermal management energy |
| Hamednia et al. [10] | Battery thermal management, charging and speed optimised jointly, electric car, 480 km route, simulation | Charging time from 66 to 37 min (−44%) |
| Fast-charging preconditioning [19] | Predictive battery heating before charging | Up to 4.5% shorter charging time |

All the studies report a saving with predictive control, across cars, buses and trucks. However, most of them measure the saving inside the thermal system, i.e. less energy spent on heating or cooling. On a vehicle, the effect of thermal control reaches further, because the temperature of the battery and the operating point of the actuators also set the efficiency of the rest of the truck.

In my work, predictive optimisation methods for the control allocation of the thermal management reached efficiency improvements of 2–4% of the total vehicle energy consumption, in absolute terms. The comparison is made against well-tuned conventional feedback control that is already in production. The saving does not come from a single function, but from several effects that the predictive control coordinates:

- **Battery temperature:** the battery operates closer to its optimal temperature, which reduces its losses and avoids active heating or cooling.
- **Actuator efficiency:** the air-conditioning system runs at a better coefficient of performance, and the fans avoid switching on and off.
- **Heat reuse:** heat that is already available on the truck is used where it is needed, so less of it is rejected and generated again.
- **Thermal buffering:** the thermal mass of the system stores heat in advance, so less energy is spent pumping it at the moment it is needed.

Within that range, the improvement depends on the climate, the route and the hardware, and above all on the quality of the baseline.

Since this saving refers to the total energy of the vehicle, it can be translated directly into the battery capacity the truck needs, which is the subject of section 7.

## 7. The virtual battery

A saving in percent is difficult to compare with the hardware decisions that set the cost and mass of an electric truck. Expressed in battery hardware, the same result becomes a physical quantity. If the truck needs less energy for the same route, it needs a smaller battery for the same range, and the control software then acts as a *virtual battery* (battery capacity that does not have to be installed).

To size this virtual battery, a typical European 40-tonne long-haul truck is used, with the following assumptions:
- a 640 kWh battery of 4.06 tonnes;
- 1.08 kWh/km energy consumption;
- 90% of the capacity usable.

[Part 3](/writing/control-software-electric-trucks-part-3-business-case/) describes this reference truck in full. I define an efficiency improvement *g* as a change in consumption from *c*₀ to *c*₀/(1+*g*). For the same range, the battery capacity that is no longer needed is then 12.5, 18.6 and 24.6 kWh for improvements of 2, 3 and 4%. Hence, the 2–4% saving of section 6 is equivalent to a battery between 80 kg and 156 kg lighter, and between 1,900 € and 3,800 € cheaper in hardware at 154 €/kWh, for the same range.

### The battery mass reduction feedback

This calculation assumes that the efficiency improvement is used to reduce the battery, which is one of two options: the truck can keep its battery and drive a longer distance on each charge, or the battery can be reduced until the truck has its original range again. The second option creates a feedback. A smaller battery makes the truck lighter. A lighter truck needs slightly less energy, which allows a slightly smaller battery again. To quantify this feedback, let:
- $f$ be the battery share of the operating mass: 4.06 t of an average 32 t, so 0.127;
- $\varepsilon$ be the sensitivity of consumption to mass: about 0.5, derived from the force balance of a long-haul truck at 80 km/h, where rolling resistance and aerodynamic drag are of similar size. Measured values for heavy trucks are about 0.4–0.65 [20, 21, 22]. An $\varepsilon$ of 0.5 means that 1% less mass gives 0.5% less consumption.

With battery mass proportional to capacity, the solution is:

$$
x = \frac{g}{1+g-\varepsilon f}, \qquad g_{\mathrm{eq}} = \frac{g}{1-\varepsilon f} \approx 1.07\,g
$$

Here $x$ is the fractional battery reduction and $g_{\mathrm{eq}}$ is the equivalent efficiency improvement. This result means that reducing the battery adds about 7% to the efficiency improvement: each 1% of energy saving is worth about 1.07% once the lighter battery is taken into account. Improvements of 2, 3 and 4% therefore become equivalent improvements of 2.14, 3.20 and 4.27%.

To show how both cases evolve with the efficiency improvement, and how sensitive the feedback is to ε, the battery avoided is plotted in Figure 5 from 0 to 5%.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part2-fig5-virtual-battery.png" alt="Line plot: the battery capacity avoided rises almost linearly with the efficiency improvement, to about 30 kWh at 5%. With the mass feedback, it is 13.4, 19.9 and 26.2 kWh (85, 126 and 166 kg) at 2, 3 and 4%, slightly above the curve without feedback; the band for ε = 0.4–0.65 is narrow." loading="lazy" />
	<figcaption>Figure 5. Battery capacity (left axis) and battery mass (right axis) avoided for the same range, as a function of the efficiency improvement, for the reference long-haul truck (640 kWh, 4.06 t). The dashed line excludes the mass feedback; the solid line includes it with ε = 0.5, and the band covers ε = 0.4–0.65 [20, 21, 22]. The labels indicate the values at 2, 3 and 4%; the shaded area indicates the range of section 6.</figcaption>
</figure>

The two curves stay close over the whole range, and the band for ε is narrow. Hence, the feedback increases the battery avoided only slightly, and the result hardly depends on the exact value of ε. Its additional gain is modest for two reasons:
- **Battery share:** the battery is about one eighth of the operating mass.
- **Aerodynamic drag:** it is a large share of long-haul consumption, and it does not depend on mass.

Nevertheless, if the mass saved is used for payload instead, this feedback is exchanged for transport capacity. Across 10,000 trucks, the virtual battery without the mass feedback amounts to 125–246 MWh of capacity that does not need to be manufactured. Therefore, the energy saving of the control software has a physical counterpart in battery capacity, which is the quantity on which its economic value is built.

## Summary and conclusions

The thermal management system of an electric truck keeps the battery, the power electronics and the cab within their temperature ranges, with energy taken from the same traction battery that, as [Part 1](/writing/control-software-electric-trucks-part-1-context/) describes, is sized for the worst-case scenario. Its control is difficult because the circuits are coupled, the efficiency is nonlinear, the system switches between discrete modes, its dynamics span seconds to tens of minutes, and the road gradient disturbs it constantly. Feedback control keeps it safe; however, it corrects deviations after they occur, one loop at a time, and energy is not part of its decision.

Two additional decisions reduce the energy. Optimisation-based control allocation decides *how*: it delivers each heating or cooling demand with the cheapest combination of the redundant actuators at the current operating point. Model predictive control decides *when*: it uses the route, the speed, the ambient temperature and the next charging stop to shift thermal work to cheaper moments, with the battery (about 1 kWh of heat per kelvin) as a thermal store. **Implemented with control-oriented models, state estimation, real-time solvers, a feedback fallback and staged validation, these methods reduced the total energy consumption of a production truck by 2–4% against well-tuned feedback control. For the same range, this is 12–25 kWh of battery, or 13–26 kWh including the lighter truck.** In economic terms, this saving is worth 5,500–21,500 € per truck, as derived in [Part 3](/writing/control-software-electric-trucks-part-3-business-case/), and almost twice as much when it is known before the battery is sized ([Part 4](/writing/control-software-electric-trucks-part-4-design/)).

For a similar thermal control problem, the two decisions are worth separating, since each removes a different limitation of feedback control. Controllers should only be compared between equal initial and final thermal states, and the saving is best expressed in terms of the hardware it replaces. Its size depends on the climate, the route, the hardware and, above all, on the quality of the baseline. The 2–4% is the result of my own work: I am responsible for these strategies in electric trucks, building on 15 years of control software development, and they were measured on trucks against production feedback control, within the functional safety and software quality processes of the automotive industry.

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
13. M. R. Amini, I. Kolmanovsky, J. Sun, Hierarchical MPC for robust eco-cooling of connected and automated vehicles and its application to electric vehicle battery thermal management, *IEEE Transactions on Control Systems Technology*, 2020. https://doi.org/10.1109/tcst.2020.2975464
14. J. Lopez-Sanz et al., Nonlinear model predictive control for thermal management in plug-in hybrid electric vehicles, *IEEE Transactions on Vehicular Technology*, 2016. https://doi.org/10.1109/tvt.2016.2597242
15. Energy-efficient thermal management of a fuel-cell heavy-duty truck via nonlinear model predictive control, *Energies*, 2026. https://doi.org/10.3390/en19133123
16. Enhancing thermal comfort and efficiency in fuel cell trucks: a predictive control approach for cabin heating, *World Electric Vehicle Journal*, 2025. https://doi.org/10.3390/wevj16100568
17. Model predictive control of the air-conditioning system for electric bus, *Energy Procedia*, 2017. https://doi.org/10.1016/j.egypro.2017.03.694
18. Tomanik et al., Integrated predictive control of battery thermal management, *Applied Thermal Engineering*, 2026. https://www.sciencedirect.com/science/article/pii/S1359431126000190
19. Predictive battery thermal management for fast charging, *Automotive and Engine Technology*, 2025. https://doi.org/10.1007/s41104-025-00157-7
20. J. Le Corguillé, F. Hacker, K. Göckeler, M. Mottschall, T. Dolinga, Real-world data analysis of energy consumption, activity and charging patterns of battery electric trucks operating in Germany, Öko-Institut, 2025. https://www.oeko.de/fileadmin/oekodoc/Real-world-data-analysis-of-battery-electric-trucks.pdf
21. Shiledar et al., *SAE International Journal of Electrified Vehicles*, 15(3), 2026. https://doi.org/10.4271/14-15-02-0013
22. M. Coyle, Effects of payload on the fuel consumption of trucks, Imise for the UK Department for Transport, 2007.
23. ISO 26262:2018, Road vehicles: Functional safety, Parts 1–12, International Organization for Standardization, 2018. https://www.iso.org/standard/68383.html

*The methods are described in general terms, as found in the cited literature. No confidential data, control algorithm or system layout is disclosed. Battery figures come from my own model of a normalised truck (Part 3).*
