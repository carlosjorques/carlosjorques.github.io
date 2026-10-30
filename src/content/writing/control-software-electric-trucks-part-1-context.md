---
title: "The Value of Control Software in Electric Heavy-Duty Trucks, Part 1"
subtitle: "Electrifying Heavy Freight: The Thermal Bottleneck"
description: "How thermal management fits into the electrification of heavy trucks, why the battery is sized for the worst-case scenario, and where control engineering makes the difference."
teaser: "Why the battery of an electric truck is sized for the worst case, and where control comes in."
publishDate: 2026-11-02
readingTime: 26 min read
category: Physical Systems Engineering
tags:
  - Electric trucks
  - Battery sizing
  - Thermal management
  - Heavy-duty vehicles
series:
  id: control-software-electric-trucks
  part: 1
keyFigure:
  value: "About 32%"
  label: "of the price of the reference truck is the battery"
  frame: "Why it matters"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part1-social.png"
  alt: "Part 1 of 4 of the series on control software in electric heavy-duty trucks: Electrifying heavy freight, the thermal bottleneck. About 32% of the price of the reference truck is the battery."
featured: false
draft: true
---

## The battery sets the limits of the truck

An electric long-haul truck carries a battery of 600–800 kWh, which weighs 4–5 tonnes. In the reference truck of this series, the battery is around 32% of the purchase price, an estimate of the cost model described in [Part 3](/writing/control-software-electric-trucks-part-3-business-case/#3-the-normalised-truck). Its capacity is fixed at the concept stage for the worst-case scenario the truck must handle, such as a Nordic winter, a full load or a battery that has aged for eight years. Consequently, the capacity that is needed only in these conditions is carried, and paid for, on every other day.

The temperature of the battery is the main variable that the thermal management system controls, and the control software decides how that system is operated. Engineers evaluate this software in kilowatt-hours saved, whilst hauliers evaluate the truck in cost per tonne-kilometre. This series links the two units. It asks what a few percent of saved energy is worth to the haulier, and how much more it is worth when the battery is sized with the software in mind. The series builds on my work on thermal management strategies for electric trucks, where predictive and optimisation-based control reduced the total energy consumption by 2–4% compared with standard feedback control.

This first part sets out the physical argument: why the battery sizes the truck, and where thermal control acts on it. Within the series, [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) describes the control methods in depth, [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) translates their effect into the units of the business case, and [Part 4](/writing/control-software-electric-trucks-part-4-design/) uses the results to design the battery dimensioning.

## 1. Why heavy-duty transportation is being electrified

Most goods in Europe travel by road, and almost all of them on diesel trucks. To reduce the CO₂ emitted by this freight, the EU's CO₂ standards for heavy-duty vehicles require manufacturers to cut the average emissions of their new vehicles by 45% by 2030, 65% by 2035 and 90% by 2040 [1].

For long-haul freight, the battery-electric truck has become the leading technology to meet these targets. This is because an electric drivetrain converts most of the energy stored in the battery into motion, and the cost of batteries keeps falling [2]. Series-produced electric long-haul trucks from Mercedes-Benz, Volvo, MAN and Scania now offer 500–720 km of range at 40 tonnes [3–6].

Consequently, the barrier to adoption has moved from the technology to the cost of operating it. Road freight competes on cost per tonne-kilometre (the cost of moving one tonne of cargo over one kilometre) and operates on thin margins. French hauliers, for example, made a pre-tax margin of 1.4–2.2% in 2022–2023 [12]. Four challenges stand between the electric truck and a competitive cost: its mass, its cost, its range and charging time, and the variability of its energy demand. All four depend on the size of the battery, and the battery is sized for the worst-case scenario the truck must handle.

The thermal management of the truck (the control of the temperatures of its battery, drivetrain and cab), and the control software that runs it, act directly on that sizing compromise. The argument follows the physical chain from the challenges to the battery, from the battery to its temperature and the system that regulates it, and from that system to the worst-case scenarios that size the battery. This chain is illustrated in Figure 1.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part1-fig1-battery-dimensioning.svg" alt="Diagram of the argument of Part 1. Four challenges (mass, cost, range and charging, and the variability of the energy demand) are in a trade-off with the battery dimensioning, which links kWh to range, kg to payload and euros to cost. The worst-case scenarios (Nordic winter, southern summer, an aged battery after 8 years and the required daily range) set the battery size. The battery sets the operating temperature handled by the thermal system hardware (pumps, valves, fans, heaters, HVAC), which delivers heat to the battery in operation (temperature, state of charge, state of health, available power). Measurements and forecasts go to the control software, which commands the thermal system (mode, flows, timing). An orange arrow returns from the control software to the battery dimensioning: increased energy efficiency, which gives a smaller battery, slower ageing and shorter charging stops." loading="lazy" />
	<figcaption>Figure 1. The argumentation of Part 1: the challenges and the worst-case scenarios that set the battery size, and the dimensioning feedback loop formed by the thermal system, the battery in operation and the control software. The dashed arrow indicates the commands of the control software; the orange arrow indicates its effect on the battery dimensioning.</figcaption>
</figure>

## 2. The challenges of an electric heavy-duty truck

The four challenges named above share one cause. Each of them is quantified below in mass, price or time, and each is linked to the battery:

- **Mass:** a long-haul truck battery of 600–800 kWh weighs 4–5 tonnes. To compensate, the EU allows zero-emission trucks up to 2 extra tonnes of gross weight [7]. However, on weight-limited routes, every kilogram of battery is still a kilogram less of payload.
- **Cost:** the battery is the largest single cost item of an electric truck. Pack prices have fallen to an average of about $108/kWh across all applications [2]; commercial-vehicle packs cost more, around €150–220/kWh [8].
- **Range and charging:** a long-haul truck must cover its daily route with the charging opportunities available, typically during the legal breaks of the driver (45 minutes after 4.5 hours of driving [13]). Current trucks accept up to about 750 kW on a megawatt charger [5], so about 30 minutes of charging fits within the break [14]. Nevertheless, charging time competes with driving time, and charger availability is still limited on many routes. [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) shows how a smaller battery shortens the charging stop, and under which conditions.
- **Variability:** the energy a truck needs is a function of the load, the topography, the speed, the traffic and the weather. The weather is the effect studied in this series.

A larger battery solves the range and variability challenges, and makes mass and cost worse; a smaller battery does the opposite. Therefore, the battery size is a trade-off, and it is set by the worst-case scenario the truck must handle.

To quantify the price of this trade-off, the pack mass and the pack cost are plotted in Figure 2 as a function of the battery capacity. The bounds of each band correspond to the pack energy densities of LFP and NMC811 (section 3.1) and to the range of commercial-vehicle pack prices [8].

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part1-fig2-mass-cost-vs-capacity.png" alt="Line plot: pack mass rises from about 2.3–2.8 t at 400 kWh to 4.6–5.5 t at 800 kWh, and pack cost from €60,000–88,000 to €120,000–176,000." loading="lazy" />
	<figcaption>Figure 2. Pack mass (a) and pack cost (b) as a function of the battery capacity. The bands are bounded by the pack energy densities of LFP (145 Wh/kg, solid line) and NMC811 (175 Wh/kg, dashed line), and by pack prices of 220 €/kWh (solid line) and 150 €/kWh (dashed line) [8]. The shaded area indicates the capacity range of long-haul trucks; the dotted line indicates the 2 t gross-weight allowance for zero-emission trucks [7].</figcaption>
</figure>

Both the mass and the cost grow linearly with the capacity. Each kilowatt-hour adds 5.7–6.9 kg and €150–220, so that a long-haul pack of 600–800 kWh weighs 3.4–5.5 t and costs €90,000–176,000. However, the 2 t allowance covers only 36–58% of that mass, and the rest is taken from the payload on weight-limited routes. Therefore, every kilowatt-hour that the truck does not need to carry is saved twice, once in the purchase price and once in the cargo. Since this price is set by the cells, the properties of the battery itself are examined next.

## 3. The battery: the central component

The battery sets the terms of the trade-off described in section 2. Two of its properties link it to thermal management: its chemistry, which the market is moving towards cells that need more heating, and its sensitivity to temperature in general.

### 3.1 Battery chemistries for heavy trucks

The cell chemistry sets the energy density, the cost, the lifetime and the cold-weather behaviour of the battery, i.e. the mass and price of each kilowatt-hour. The chemistries used or considered for heavy trucks are NMC (nickel manganese cobalt oxide, with the number giving the ratio of the three metals), LMFP (lithium manganese iron phosphate), LFP (lithium iron phosphate), sodium-ion and solid-state cells. To compare their four properties at once, the pack cost of each chemistry is plotted in Figure 3 as a function of its pack energy density. The marker size gives the cycle life (the number of full charge cycles until the battery keeps 80% of its original capacity), and the colour gives the cold-weather behaviour.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part1-fig3-chemistry-tradeoff.png" alt="Bubble chart: LFP combines low cost and the longest life with low energy density and weak cold-weather behaviour; NMC chemistries are denser and better in the cold, but more expensive." loading="lazy" />
	<figcaption>Figure 3. Pack cost as a function of pack energy density for the battery chemistries used or considered for heavy trucks. The marker size indicates the cycles to 80% health (2,000–6,000); the colour indicates the cold-weather behaviour. The hollow marker is an outlook, not yet in production. Indicative pack-level values from Table 1.</figcaption>
</figure>

No chemistry in series production is the best in all four properties. Take LFP as an example (orange marker). Among the chemistries in series production, it has the lowest cost (130 €/kWh) and the longest life (6,000 cycles, the largest marker), but also the lowest energy density (145 Wh/kg) and the weakest cold-weather behaviour. The NMC chemistries (green markers) sit in the opposite corner, with 155–175 Wh/kg and good cold-weather behaviour at 160–165 €/kWh. Sodium-ion is cheaper still and very good in the cold, although its 115 Wh/kg makes it heavy for long-haul, and solid-state cells promise 250 Wh/kg but are not yet in production. The exact values, together with the vehicles that use each chemistry, are listed in Table 1.

*Table 1. Battery chemistries for heavy trucks.*

| Chemistry | Pack energy density (Wh/kg) | Pack volume density (Wh/L) | Pack cost (€/kWh) | Cycles to 80% health | Cold-weather behaviour | Used in |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| NMC811 | 175 | 330 | 165 | 3,000 | Good; sensitive to heat | Volvo FH Aero Electric, Tesla Semi |
| NMC622 | 155 | 290 | 160 | 3,500 | Good | MAN, Scania, Freightliner |
| LMFP | 160 | 285 | 135 | 4,500 | Moderate | Emerging |
| LFP | 145 | 260 | 130 | 6,000 | Weaker below 0 °C; needs heating | Mercedes eActros 600, most Chinese heavy trucks |
| Sodium-ion | 115 | 210 | 125 | 4,000 | Very good | Pilot projects |
| Solid-state (outlook) | 250 | 500 | 200 | 2,000 | To be confirmed | Not yet in production |

*Indicative pack-level values, compiled from manufacturer and industry sources.*

Because of its cost and its life, the trend in heavy-duty trucks is towards LFP, which is also safer than NMC and free of nickel and cobalt. However, both of its weaknesses increase the value of thermal management. LFP batteries need heating more often, and, with the lowest energy density, each kilowatt-hour saved avoids more kilograms of battery.

### 3.2 Temperature impact on battery performance

Regardless of the chemistry, lithium-ion cells work best only within a narrow temperature window, roughly between 15 and 35 °C [9]. Outside that window, temperature affects the performance, the charging and the ageing of the cells. These three effects are illustrated in Figure 4 as a function of the cell temperature.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part1-fig4-temperature-window.png" alt="Temperature scale from −30 to 50 °C: below 15 °C power and charging power are reduced and heating is needed; above 35 °C cooling is needed during fast charging and ageing is faster." loading="lazy" />
	<figcaption>Figure 4. Effect of the cell temperature on the power, the charging and the ageing of lithium-ion cells. The grey lines delimit the preferred operating window [9]; the gradients indicate the cold (light blue) and hot (light orange) sides. Faster ageing at high temperature after [10]. Qualitative illustration.</figcaption>
</figure>

Below the window, a cold battery delivers less power, and it must be charged at reduced power to avoid damage. It must therefore be heated, and LFP cells are the most affected. Above the window, the battery must be cooled during fast charging, and its ageing accelerates, since temperature is the main factor in battery degradation [10]. Hence, both sides of the window act on the three quantities the battery was sized for: power, charging time and usable capacity over its life. The battery is the most expensive component of the truck (around 32% of the purchase price of the reference truck), and its temperature is the main variable that the thermal management system controls. Therefore, the system that regulates this temperature is the next link in the argument.

## 4. How thermal management works in an electric truck

The thermal management system keeps the battery in its temperature window, and it serves the drivetrain and the cab as well. Its energy consumption is set by two choices: how its circuits are connected, and how the control software operates them.

### 4.1 Functions

The system covers six functions, each with its own purpose and season of highest demand. These functions are listed in Table 2.

*Table 2. Functions of the thermal management system.*

| Function | Purpose | Highest demand |
| --- | --- | --- |
| Battery cooling | Remove the heat produced during driving and charging; protect the cells from ageing | Summer, long climbs, fast charging |
| Battery heating | Bring a cold battery to its operating window for power and charging | Winter, before charging |
| Drivetrain cooling | Keep the electric motors and power electronics within their limits and in their efficient operating range | High load, high ambient temperature |
| Cab climate | Heating or cooling for driver comfort | All year; demisting is a safety function |
| Charging preparation | Bring the battery to the right temperature before a fast-charging stop, or pre-condition the cab before departure | Winter and summer |
| Heat recovery | Move heat from where it is waste to where it is needed | Winter |

In winter, battery heating, cab climate and charging preparation all need heat at the same time, whilst the drivetrain produces waste heat that can be recovered. In summer, the cooling functions peak together. Hence, the same components must serve different functions at different moments, and this sharing is the origin of the design question in section 4.3.

### 4.2 Components of the thermal management system

These functions are delivered by a set of components common to most electric vehicles, in configurations that vary between manufacturers:

- **Coolant circuits:** liquid circuits carry heat between components. The battery, the drivetrain and the cab work at different temperature levels, so they usually have their own circuits or circuit sections.
- **Pumps:** each pump sets the coolant flow in its circuit.
- **Valves:** the valves direct the flow. They connect circuits to each other, bypass components or route the coolant to different heat exchangers.
- **Radiators and fans:** the radiators reject heat to the outside air. The airflow comes from the vehicle speed, and from the fans when the truck is slow or stationary.
- **Refrigerant circuit:** this circuit cools below ambient temperature. It includes the electric compressor, the condenser, the evaporator for the cab, the chiller for the battery coolant and the expansion valves.
- **Heat pump operation:** the refrigerant circuit is run in reverse to deliver heat. It takes heat from the air or from waste-heat sources and, under favourable conditions, supplies two to three units of heat per unit of electricity. This ratio (the coefficient of performance) falls as the outside temperature drops.
- **Electric heaters:** a heater converts electricity directly into heat. Heaters are simple and powerful, but use one unit of electricity per unit of heat.
- **Cab climate unit:** this unit contains the blower, the air distribution and the flaps.
- **Sensors:** temperatures, pressures and flows are measured across the system.

The list contains two sources of heat with very different costs: the heat pump supplies two to three units of heat per unit of electricity, and the electric heater supplies one. Therefore, the choice of which component provides heat, and when, sets a large part of the winter energy consumption.

### 4.3 The design criteria for the thermal management system

Once the components are sized for the heating and cooling needs of every worst-case scenario, the remaining design question is how far to connect the circuits to each other. This choice sets how much energy the system can save, and how much control it needs to save it.

Separate circuits are simple. Each subsystem has its own heating and cooling, and the control is straight-forward. However, heat cannot move between the circuits. In winter, for example, the waste heat of the drivetrain is rejected to the outside air whilst an electric heater warms the battery.

Integrated circuits allow heat to move to where it is useful. Waste heat from the drivetrain can warm the battery or the cab, the heat pump can serve several consumers, and one radiator can serve different circuits depending on the demand. Hence, part of the heat that separate circuits reject is reused, and less electricity is spent on heating.

The cost of integration is complexity. Every additional valve and connection multiplies the number of possible operating modes (the combinations of flow paths and active components). An integrated system only reaches its saving potential if the control software chooses the right mode, the right flows and the right moment for each situation. Therefore, integrated hardware raises the energy-saving potential, and the control software decides how much of it is realised. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) describes how this control is done: the control problem, the limits of feedback control, optimisation-based control allocation and model predictive control. Since the thermal loads are largest in the worst-case scenarios, these extreme operating conditions are also where the choices of the control software have the largest effect.

## 5. The worst-case scenarios: Nordic winter and southern summer

A haulier needs the truck to complete its route on every working day of its life, so the battery and the thermal components are sized for the extremes. Winter sets the battery capacity, summer sets the cooling capacity and the battery life, and on both the thermal management system has the most work to do.

### 5.1 Winter

Cold weather raises the energy demand of the truck and lowers what its battery can deliver at the same time. In cold weather, several effects add up:

- **Battery capability:** the battery delivers less power and accepts less charging power. LFP batteries are the most affected.
- **Cab heating:** the cab needs heat for nine hours or more of driving.
- **Battery heating:** the battery itself needs heating, both for driving and before fast charging.
- **Heat pump efficiency:** the heat pump supplies less heat per unit of electricity as the outside temperature drops.
- **Driving resistance:** aerodynamic drag and rolling resistance are higher, because cold air is denser and tyres are stiffer.

The size of the combined effect depends on the share of the vehicle's energy that goes into heating. To show this, the winter increase in energy use reported for different vehicles is compared in Figure 5. The sources use different metrics and conditions (range loss in a test, measured consumption, simulated consumption), which are indicated next to each marker. Hence, the comparison is one of orders of magnitude.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part1-fig5-winter-penalty.png" alt="Range chart: winter penalty of 3–10% for drayage trucks in a mild climate, about 25% for regional trucks, about 40% range loss for cars and 40–45% for city buses." loading="lazy" />
	<figcaption>Figure 5. Winter increase in energy use, or loss of range, for different vehicle types, from published measurements, tests and simulations [11, 15, 16, 21]. The metric and the conditions of each source are indicated next to its marker. Bars indicate ranges; dots indicate single values.</figcaption>
</figure>

The vehicles with the largest share of heating show the largest winter penalty. City buses, with a large passenger space to heat, use 40–45% more energy in a Finnish winter than in summer [16], and passenger electric cars lose around 40% of their range in cold weather with heating [11]. A heavy truck is less affected in relative terms, because propulsion dominates its energy use. However, the effect is still large. Measured data from electric trucks in Germany show consumption rising by about 0.13 kWh/km for every 10 °C drop in temperature, i.e. about a quarter more energy at 0 °C than at 20 °C for regional trucks [15]. In mild climates, the simulated difference between winter and summer is only 3–10% for drayage trucks (short-distance trucks serving ports and rail terminals) [21].

Trucks that preconditioned their battery (heated it before departure or charging) showed no clear temperature dependence [15]. Hence, the winter penalty grows with the share of heating in the energy use, and preconditioning, a thermal management function, can remove the temperature dependence of trucks. Manufacturers typically quote range at around 20 °C with a new battery [3]. Therefore, the extra capacity needed for cold weather is paid for in purchase price and in mass, every day of the year.

### 5.2 Summer

In summer, the constraint moves from the energy available to the heat that must be removed, and to the life of the battery:

- **Fast-charging heat:** at megawatt charging power, losses of a few per cent in the battery mean tens of kilowatts of heat to remove. The battery must be cooled during charging so that the charging power does not have to be reduced.
- **Long climbs:** in high ambient temperatures, long climbs load the drivetrain and the battery whilst the radiators work with a small temperature difference to the air.
- **Cab cooling:** the cab needs air conditioning.
- **Ageing:** high temperature accelerates battery ageing, and ageing reduces the usable capacity the truck was sized for. Laboratory tests on commercial cells show calendar ageing (the loss of capacity at rest) slowing at lower temperatures for LFP, NCA (nickel cobalt aluminium oxide) and NMC cells, and cycle ageing (the loss of capacity from charging and discharging) of LFP cells increasing with temperature between 15 and 35 °C [17].

Summer therefore sets the cooling capacity and affects the life of the battery. An aged battery is the other half of the worst-case scenario, since the truck must still complete its route after eight years.

### 5.3 What this means for thermal control

Since the worst-case scenarios set the battery size, the saving of thermal control in those scenarios decides how much battery it can save. *Predictive control* (control that uses a forecast of the route and of the next charging stop to plan its actions) acts differently in each season:

- **Winter:** predictive control heats the battery for charging at the right moment. It uses drivetrain waste heat when available, and chooses between the heat pump and the electric heater based on their actual efficiency.
- **Summer:** predictive control pre-cools the battery before climbs and before charging. It uses the thermal mass of the battery as a buffer, and keeps the cells closer to their ideal temperature to slow ageing.

The size of the winter saving follows the size of the heating demand. For an urban electric bus at −10 °C, about 24 kW of heating adds 1.3 kWh/km at 18 km/h, on top of 1.2 kWh/km for traction and the other auxiliaries [18]. Heating is therefore about half of the energy used in these conditions, about twice its average share; the winter maximum auxiliary power of the same bus is 24 kW, against an average of 8 kW [18]. Similarly, at −10 °C a 12 m bus uses 0.73 kWh/km for traction and 1.51 kWh/km in total [19].

Predictive thermal control saves a broadly constant fraction of the thermal energy, so the absolute saving grows with the heating demand. In a passenger car with a heat pump, *nonlinear model predictive control* (a controller that optimises its actions over a prediction horizon using a nonlinear model of the system) saves 20.2%, 26.1% and 27.8% of the thermal energy compared with rule-based control, at −5, −7 and −10 °C respectively [20]. In absolute terms, the saving is 460, 670 and 840 Wh, i.e. about 1.8 times larger at −10 °C than at −5 °C [20].

Therefore, the saving of thermal control is largest in cold weather, which is the worst-case scenario that dimensions the battery. In my model, I assume, conservatively, that the winter saving is about 1.5 times the annual average. This factor is below both the doubling of the heating share in the bus data and the factor of 1.8 in the car study.

However, the real ratio depends on the climate, the route and the hardware. For electric drayage trucks in mild climates, simulated winter consumption is only 3–10% above summer consumption, although battery heating is 60–80% of the auxiliary power in the coldest weather [21]. In Nordic telematics data from battery-electric trucks, the extra consumption rises by about 1.17 kWh/100 km for every °C below 15 °C. A water film or snow on the road adds 7–8 kWh/100 km regardless of the temperature [22]. Hence, part of the measured winter penalty comes from rolling resistance, which thermal control does not reduce.

The effect of the factor of 1.5 on the battery size is listed in Table 3, comparing a battery sized on the average saving with one sized on the winter saving.

*Table 3. Battery reduction for the reference truck, sized on the average saving and on the winter saving.*

| Annual average improvement | Battery reduction if sized on the average | Battery reduction if sized on the winter saving |
| --- | ---: | ---: |
| 2% | 12.5 kWh / 80 kg | about 19 kWh / 120 kg |
| 4% | 25 kWh / 156 kg | about 36 kWh / 230 kg |

For the same annual improvement, sizing on the winter saving removes about half as much battery again as sizing on the average. Therefore, the value of thermal control depends on whether its winter saving is taken into account when the battery is sized.

I also assume that keeping the cells closer to their ideal temperature slows their degradation. With this effect, a 4% improvement leaves the battery with about 1.6 percentage points more health after eight years. Together, the winter sizing and the slower ageing raise the value of a 4% improvement for mixed freight from about €16,100 to €21,300 per truck. The main figures in [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) do not include these effects. [Part 4](/writing/control-software-electric-trucks-part-4-design/) analyses them in detail, together with the shorter charging stops obtained by preconditioning.

## 6. Bringing it together: how an efficiency gain compounds

Sections 2 to 5 followed an energy saving back to the battery size. Since a smaller battery changes the mass, the cost and the charging of the truck, a 2–4% efficiency improvement compounds through three channels of very different size:

- **Physical compounding:** a smaller battery makes the truck lighter, which lowers consumption a little further. This feedback is small, and the equivalent improvement is about 1.07 times the original. The reason is that the battery is only an eighth of the operating mass of the truck, and aerodynamic drag does not depend on weight. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) derives this feedback.
- **Economic compounding:** the saving passes through the battery cost, the payload and the charging time before it reaches the operator, and its value is 1.2–2.5 times the electricity saved. Because margins are thin, operating profit rises by between a quarter and almost double. [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) presents the cost model, its assumptions and the breakdown of the value by channel.
- **Sizing case:** thermal management saves the most in the worst-case scenario, which is the scenario the battery is sized for (section 5). [Part 4](/writing/control-software-electric-trucks-part-4-design/) shows that, when this saving is used in the design, the same 3% average gain is worth almost twice as much.

The size of the three channels is plotted in Figure 6, as the value of the improvement divided by the value of the electricity it saves.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part1-fig6-value-multiplier.png" alt="Bar chart: the value of the improvement is 1.00 times the electricity saved alone, 1.07 times with the battery downsizing, 1.23–2.46 times with the economic compounding and 3.25–4.58 times when designed into the vehicle." loading="lazy" />
	<figcaption>Figure 6. Value of a 3% efficiency improvement as a multiple of the electricity it saves, for the reference long-haul truck and each compounding channel. The diamonds indicate the scenarios A, B and C of Part 3 and the two design cases of Part 4; the bars span their range. The dotted line indicates the electricity saved alone.</figcaption>
</figure>

The physical feedback of the downsized battery raises the value only from 1.00 to 1.07 times the electricity saved. The economic channels raise it to 1.23–2.46 times, and designing the vehicle around the software raises it to 3.25–4.58 times. This is because the battery is a small share of the operating mass of the truck, whereas each kilowatt-hour removed is also a saving in purchase price and, on weight-limited routes, a gain in payload. Hence, most of the value of thermal control comes from the business case and from the sizing decision, and the physical feedback adds little. This amplification is specific to the heavy truck, as the comparison with passenger cars shows.

## 7. Trucks vs cars

The same thermal management methods save energy in passenger cars. However, the percentages are not directly comparable, because the duty cycles and the thermal loads are different, and the economic context differs even more. In a car, a few per cent of efficiency gives a few more kilometres of range, which the buyer weighs against comfort and price. In a heavy truck, the same gain changes the cost per tonne-kilometre and the total cost of ownership (TCO, i.e. the purchase and operating costs over the life of the vehicle), on which the purchase decision is based. The two vehicles are compared in Table 4; the last row gives the value of the same few per cent of efficiency.

*Table 4. Passenger car and long-haul truck compared.*

|  | Passenger car | Long-haul truck |
| --- | --- | --- |
| Distance per year | about 15,000 km | 100,000–150,000 km |
| Battery | 60–100 kWh | 500–800 kWh |
| Battery mass vs payload | Not monetised | Every kilogram competes with cargo |
| Purchase decision | Range, comfort, price | Cost per tonne-kilometre, TCO, return on investment |
| Value of a few per cent efficiency | A few more kilometres of range | €5,000–20,000 per truck; operating profit up by a quarter or more |

The truck drives several times further each year with a battery several times larger, and its battery mass is priced in lost cargo. Therefore, the same percentage saving that gives a car a few kilometres of range is worth thousands of euros per truck.

## 8. Summary and conclusions

An electric long-haul truck carries 4–5 tonnes of battery, and that battery sets its mass, its price, its range and its charging time. Since road freight runs on margins of about 2%, every kilogram and every euro of battery competes with the haulier's profit. The battery is sized for the worst-case scenario the truck must handle: a Nordic winter or a southern summer, with a battery aged eight years, on the required daily range. In these conditions, the battery temperature decides how much power the battery can deliver and accept, and keeping it within its window costs energy taken from the same battery.

Thermal control software therefore acts on the quantity that sizes the battery. **Predictive and optimisation-based control reduces the energy consumption of the truck by 2–4%** against well-tuned conventional control, and the saving is largest in cold weather, i.e. in the scenario the battery is sized for; [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) explains how these methods decide how and when the thermal energy is spent. The saving then compounds through channels of very different size. The lighter truck adds only about 7% to it, because the battery is an eighth of the operating mass. However, through the battery cost, the payload and the charging time, **it raises its value to 1.2–2.5 times the electricity saved**, and [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) follows this value channel by channel. Using the saving to size the battery raises the value of a 3% gain to 3.3–4.6 times, i.e. from 0.6% to 2.0–2.8% of the total cost of ownership (TCO) of the truck, as [Part 4](/writing/control-software-electric-trucks-part-4-design/) shows for trucks and buses. In a passenger car, the same percentage gives a few kilometres of range; **in a truck, it is worth €5,500–21,500 per vehicle and raises operating profit by between a quarter and almost double.**

Hence, the value of a few percent of efficiency in a heavy vehicle depends on three questions: whether the saving occurs in the conditions that size the hardware, through which channels it reaches the cost of the vehicle, and whether it is known before the hardware is fixed. The first and the last questions are answered in the design of the control software: by what it optimises in the worst-case scenario, and by how early and how reliably its performance is validated. In my work, I develop the control strategies that achieve this efficiency increase of 2–4%, already tested on production trucks.

## References

1. European Commission, Lorries, buses and coaches: CO₂ emission standards (Regulation (EU) 2019/1242 as amended by Regulation (EU) 2024/1610). https://climate.ec.europa.eu/areas-action/transport-decarbonisation/road-transport/lorries-buses-and-coaches_en
2. BloombergNEF, Lithium-ion battery pack prices fall to $108 per kilowatt-hour despite rising metal prices, December 2025. https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/
3. Daimler Truck, Mercedes-Benz Trucks hands over first series-produced eActros 600 to customers in Germany, December 2024. https://www.daimlertruck.com/en/newsroom/pressrelease/mercedes-benz-trucks-hands-over-first-series-produced-eactros-600-to-customers-in-germany-52938275
4. electrive, Volvo Trucks boosts net battery capacity to record level, June 2026. https://www.electrive.com/2026/06/11/volvo-trucks-boosts-net-battery-capacity-to-record-level/
5. electrive, New generation MAN eTGX unveiled with 720 km range, September 2026. https://www.electrive.com/2026/09/14/new-generation-man-etgx-unveiled-with-720-km-range/
6. Scania, Scania enables electric long-haul with up to 720 km range. https://www.scania.com/group/en/home/newsroom/press-releases/press-release-detail-page.html/5424916-scania-enables-electric-long-haul-with-up-to-720-km-range
7. European Commission, Weights and dimensions (Directive 96/53/EC as amended, including Regulation (EU) 2019/1242). https://transport.ec.europa.eu/transport-modes/road/weights-and-dimensions_en
8. ICCT, A total cost of ownership comparison of truck decarbonization pathways in Europe, 2023. https://theicct.org/publication/total-cost-ownership-trucks-europe-nov23/
9. Optimization of thermal and structural design in lithium-ion batteries to obtain energy-efficient battery thermal management system: a critical review, *Archives of Computational Methods in Engineering*, 2022. https://doi.org/10.1007/s11831-021-09571-0
10. Temperature, ageing and thermal management of lithium-ion batteries, *Energies*, 2021. https://doi.org/10.3390/en14051248
11. AAA, Cold weather reduces electric vehicle range, 2019. https://newsroom.aaa.com/2019/02/cold-weather-reduces-electric-vehicle-range/
12. Upply Market Insights, Transport routier français : le bilan 2023 révèle l'érosion des marges (Banque de France data), 2024. https://market-insights.upply.com/fr/transport-routier-fran%C3%A7ais-le-bilan-2023-revele-lerosion-des-marges
13. European Commission, DG MOVE, Driving time and rest periods (Regulation (EC) No 561/2006). https://transport.ec.europa.eu/transport-modes/road/social-provisions/driving-time-and-rest-periods_en
14. W. Shoman, S. Yeh, F. Sprei, P. Plötz, D. Speth, Public charging requirements for battery electric long-haul trucks in Europe: a trip chain approach, Fraunhofer ISI Working Paper S01/2023.
15. J. Le Corguillé, F. Hacker, K. Göckeler, M. Mottschall, T. Dolinga, Real-world data analysis of energy consumption, activity and charging patterns of battery electric trucks operating in Germany, Öko-Institut, 2025. https://www.oeko.de/fileadmin/oekodoc/Real-world-data-analysis-of-battery-electric-trucks.pdf
16. M. Vehviläinen et al., Setting up and operating electric city buses in harsh winter conditions, *Applied Sciences*, 12(6), 2762, 2022. https://doi.org/10.3390/app12062762
17. Y. Preger et al., Degradation of commercial lithium-ion cells as a function of chemistry and cycling conditions, *Journal of The Electrochemical Society*, 167, 120532, 2020. https://doi.org/10.1149/1945-7111/abae37
18. D. Göhlich, T.-A. Fay, D. Jefferies, E. Lauth, A. Kunith, X. Zhang, Design of urban electric bus systems, *Design Science*, 4, e15, 2018. https://doi.org/10.1017/dsj.2018.10
19. D. Jefferies, D. Göhlich, A comprehensive TCO evaluation method for electric bus systems based on discrete-event simulation including bus scheduling and charging infrastructure optimisation, *World Electric Vehicle Journal*, 11(3), 56, 2020. https://doi.org/10.3390/wevj11030056
20. P. Lokur, N. Murgovski, Energy-optimal thermal management of heat-pump battery electric vehicles, arXiv preprint 2605.29104, 2026. https://arxiv.org/abs/2605.29104
21. Shiledar et al., Assessing geographical and seasonal influences on energy efficiency of electric drayage trucks, arXiv preprint 2504.02575, 2025. https://arxiv.org/abs/2504.02575
22. Hiltunen et al., Weather-aware energy prediction for battery electric trucks from fleet telematics and road weather data, SSRN preprint, 2026. https://doi.org/10.2139/ssrn.7602714

*The thermal management system is described in general terms common to electric vehicles; no specific system layout is disclosed. The economic figures and the winter and ageing effects come from my own model of a normalised truck (Part 3). The winter factor is based on the sources [18–22].*
