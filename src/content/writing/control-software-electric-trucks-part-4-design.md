---
title: "The Value of Control Software in Electric Heavy-Duty Trucks, Part 4"
subtitle: "Designing the Vehicle Around the Software"
description: "Using the control software's performance to design the vehicle, a sensitivity analysis across trucks and buses, and the parameters that decide the value."
teaser: "How the performance of the software changes the design of the vehicle, for trucks and buses."
publishDate: 2026-11-02
readingTime: 29 min read
category: Physical Systems Engineering
tags:
  - Electric trucks
  - Vehicle design
  - Sensitivity analysis
  - Control software
  - V-model
series:
  id: control-software-electric-trucks
  part: 4
keyFigure:
  value: "€21,600–30,500"
  label: "per truck over 8 years for a 3% gain, when the vehicle is designed around the software"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part4-social.png"
  alt: "Part 4 of 4 of the series on control software in electric heavy-duty trucks: Designing the vehicle around the software. €21,600–30,500 per truck over 8 years for a 3% gain."
featured: false
draft: true
---

## From operating the truck to designing it

The battery of an electric heavy-duty truck is sized for the worst-case scenario the vehicle must handle: a set of extreme operating conditions such as cold weather, full load, an aged battery and a long route. The battery capacity, the size of the heater and the compressor, the charging specification and the battery's operating limits are fixed for these conditions at the concept stage, whilst the thermal control software usually arrives later, when these decisions have already been taken. Consequently, whatever the software achieves in the worst-case scenario, the hardware has already been sized without it, and the software is valued only for the electricity it saves in daily operation.

In the first three parts of this series, the control software had this usual role, and [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) valued it mainly as electricity saved, with a smaller battery as an option.

This sequence leaves four questions open for vehicle development. The first is how much more the same software is worth when its performance is used as a design input (when the software is *designed in*). The second is which parameters decide that value, and whether the software parameters weigh as much as the market parameters. The third is in which vehicles and climates the value is largest, including buses. The fourth is whether the result holds under combined uncertainty and with the higher charging power of megawatt chargers.

To answer them, I extended the model from Part 3 with the effects of thermal control on design decisions and ran a sensitivity analysis across trucks and buses. In the model, the same software improvement is worth almost twice as much when it is designed in, and the parameters set by the software rank alongside the largest market parameters. The argument starts with the design decisions the software can influence and the way they are modelled, continues with the value of designing the software in, the parameters and applications that decide it and the charging and uncertainty cases, and ends with the consequences for vehicle development.

This sequence is illustrated in Figure 1 within the V model, the development process most used in the automotive industry, formalised in Automotive SPICE [20] and, for functional safety, in ISO 26262 [21]. On its left branch, the vehicle is specified and designed from the top down, from the vehicle requirements to the control software; on its right branch, it is integrated and verified from the bottom up. The battery and the thermal hardware are sized near the top of the left branch, whilst the performance of the control software is first measured on the vehicle, near the top of the right branch. Designing the software in closes this gap with a prediction: its worst-case performance, estimated with models and simulation, becomes an input to the sizing.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig1-v-model.svg" alt="V-model diagram of vehicle development. Left branch, from top to bottom: vehicle requirements; system design and sizing of the battery, thermal hardware and charging; thermal system design; control software design. Bottom: implementation. Right branch, from bottom to top: software verification in model- and software-in-the-loop; thermal system integration with hardware-in-the-loop; system verification with vehicle tests in worst-case conditions; vehicle validation in customer operation. Today, the control performance is first measured at system verification, after the hardware is sized, and the software is credited for its average gain only: 1.8–2.5 times the electricity saved, €12,200–16,300 per truck. Designed in, the worst-case control performance predicted with models and simulation is an input to the system sizing, and the same software is worth 3.3–4.6 times the electricity saved, €21,600–30,500 per truck." loading="lazy" />
	<figcaption>Figure 1. Thermal control software in the V model of vehicle development. Blue: today, the control performance is first measured at system verification, after sizing. Orange: designed in, the predicted worst-case performance is an input to the system sizing. Values per long-haul truck over 8 years for a 3% average gain, as a multiple of the electricity saved (€6,640) and in euros; ranges span mixed to heavy freight, and are derived in section 3.1 and Figure 4.</figcaption>
</figure>

## 1. What changes when the software is part of the design

Only the decisions that the software can influence can carry its value beyond daily operation, so the first step is to identify them. Besides the energy it saves, thermal control software influences five design decisions. Each of them is listed in Table 1 with the mechanism through which the software acts on it.

*Table 1. Design decisions influenced by the thermal control software.*

| Design decision | What the thermal control software contributes |
| --- | --- |
| Battery capacity | The battery is sized for the worst-case scenario. Thermal management saves the most in exactly these conditions, through predictive heating, waste-heat use and better use of the heat pump. |
| End-of-life margin | The battery must still cover the route after eight years. Keeping the cells closer to their ideal temperature slows ageing, so less extra capacity is needed at the start. |
| Thermal component sizing | Heaters, compressors and radiators are sized for peak demand. Predictive control spreads heating and cooling over time and can reduce the peaks. |
| Charging specification | The charging power a battery accepts depends on its temperature. Preconditioning before a charging stop makes high charging power usable in practice. |
| Battery operating limits | Tighter temperature control allows the battery to use a slightly wider part of its capacity safely. |

All five effects act on decisions taken before the vehicle enters service. Hence, they are invisible when the truck is valued in daily operation only. Therefore, to value them, the model must represent each effect as a separate design parameter, which is the purpose of the methodology below.

## 2. Methodology

To quantify the five effects, the [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) model was extended so that the software's performance acts on the battery size, the thermal hardware and the charging specification, in addition to the energy cost. The method consists of four elements (the model, the calculation of the gain, the battery sizing rule and the ranges of the levers), applied to seven vehicles and analysed in five ways.

### 2.1 The model

The analysis uses the same life-cycle cost model and assumptions as Part 3 (described in its section 9), extended in three ways:
- **Software levers:** the five design effects above, each as a separate parameter.
- **Applications:** seven vehicles, from long-haul trucks to city buses.
- **Climates:** Nordic, Central and Southern Europe.

With only the efficiency gain switched on, the extended model reproduces the Part 3 results exactly (€8,140, €12,215 and €16,311 per truck for a 3% gain in scenarios A, B and C). Therefore, any difference from Part 3 in the results below comes from the new levers alone.

### 2.2 How the software's gain is modelled

Every lever scales with the efficiency gain, so the gain must first be set for each vehicle and climate. In [Part 2](/writing/control-software-electric-trucks-part-2-engineering/), the gain is an absolute saving of 2–4% of the total energy consumption of the vehicle, measured against well-tuned conventional control. This saving does not follow from the share of energy used for heating and cooling alone, because the control also reduces the losses of the battery, improves the operating point of the actuators and reuses the heat already available on the truck. Therefore, the model sets the gain directly within the measured range, and does not derive it from a thermal share.

The average gain is placed within the 2–4% range according to the application and the climate:
- **Application:** 3.0% for long-haul, regional and construction trucks in Central Europe, the middle of the range. Urban trucks, coaches and city buses are set at 3.5%, because they spend more time per kilometre at low speed with the cab or the passenger space heated or cooled, which gives the control more opportunities to buffer and reuse heat.
- **Climate:** the gain is 0.5 percentage points lower in Southern Europe and 0.5 points higher in Nordic countries. Hence, all cases stay within 2.5–4.0%.

The gain is larger in the worst-case scenario than on average, because the heating and cooling demand peaks in these conditions. As in [Part 1](/writing/control-software-electric-trucks-part-1-context/), the gain in the worst-case scenario (the *worst-case gain*) is set at 1.5 times the average gain, i.e. 4.5% for the reference long-haul truck. The model uses the average gain for energy costs and the worst-case gain for battery sizing.

To check these orders of magnitude, they were compared with published results for truck heating in the cold:
- **Truck heating strategies:** they increase range by up to 7% at −20 °C [1].
- **Motor waste-heat recovery:** it adds 4.4–6.6% range at 0 to −20 °C [2].

Both results are above the 4.5% worst-case gain of the model, so the model stays on the conservative side in cold weather. Published studies of optimised thermal control also report savings of 8–34% of the targeted thermal energy [3–6]. However, these figures refer to the thermal system only, and they are not converted into a vehicle gain here.

The factor of 1.5 is also below the ratios found in measurements. On an urban electric bus at −10 °C, about 24 kW of heating adds 1.3 kWh/km at 18 km/h on top of the 1.2 kWh/km used for traction and the other auxiliaries [16]. Similarly, a 12 m bus at −10 °C uses 0.73 kWh/km for traction and 1.51 kWh/km in total [17]. Heating is therefore about half of the energy in these conditions, about twice its average share. On a heat-pump passenger car, the energy saved by predictive control grows about 1.8 times from −5 to −10 °C, from 460 to 840 Wh [18] (a preprint). However, the average winter difference for trucks can be small. For electric drayage trucks, battery heating is 60–80% of the auxiliary power in the coldest weather, but the seasonal difference in total consumption is only 3–10% in mild climates [19] (also a preprint). Hence, the worst-case factor of 1.5 is a modelling assumption for the conditions investigated, and its range is tested in section 2.4.

### 2.3 How the battery is sized

Since the worst-case gain creates value only through a smaller battery, the sizing rule decides how much of that gain reaches the design. In the design scenarios, the battery is sized to deliver the same range as the original truck in the worst-case scenario, at the end of its life:

> E₁ = E₀ × (c_d,1 / c_d,0) × (SoH₀ / SoH₁)

- *E₀* and *E₁* are the original and new battery capacities.
- *c_d* is the dimensioning consumption, i.e. the consumption in the worst-case scenario, before and after the improvement.
- *SoH* is the battery's state of health at the end of its life.

The smaller the battery, the lighter the truck and the lower its consumption. A smaller battery also cycles differently, which changes its ageing. The model therefore solves the sizing by iteration until the capacity, the mass and the ageing are consistent, so the battery savings reported in section 3 include both feedbacks.

Figure 2 shows how each lever reaches the value. It extends the value channels of Part 3 with the levers that feed them. The average gain acts on the electricity only, which is the value if the software is added to a finished truck. The worst-case gain, the slower ageing, the sizing for the end of life and the thermal operating limits act through the sizing rule, and therefore on the battery and on the payload or range. Preconditioning and thermal hardware downsizing act directly on charging time and component cost.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig2-value-channels.svg" alt="Diagram in four columns: software levers, battery sizing, value channels and value over the life. Each lever shows its contribution per long-haul truck over 8 years as a multiple of the electricity saved and in euros, from mixed to heavy freight: average gain 1.8–2.5 times (€12,200–16,300), worst-case gain +0.3–0.6 times (+€2,100–4,200), slower ageing +0.4 times (+€2,700), sizing for the end of life +0.3–0.7 times (+€2,300–4,700), thermal operating limits not included, preconditioning +0.15 times (+€1,000) and thermal hardware downsizing +0.15 times (+€1,000). The average gain goes directly to the electricity channel. Four levers feed a battery sizing loop that keeps the same worst-case range at the end of life and is iterated through a smaller battery, a lighter truck and a lower consumption, which adds +0.05–0.08 times (+€300–500); the loop feeds the battery and the payload or range channels. Preconditioning feeds the time channel and hardware downsizing the thermal hardware channel. The average gain alone is worth 1.8–2.5 times the electricity saved (€12,200–16,300); all levers designed in are worth 3.3–4.6 times (€21,600–30,500)." loading="lazy" />
	<figcaption>Figure 2. Software levers, the channels through which they reach the value, and the value per long-haul truck over 8 years with a 3% average gain. The value channels extend those of <a href="/writing/control-software-electric-trucks-part-3-business-case">Part 3</a>, Figure 1. The contribution of each lever is given as a multiple of the electricity saved (€6,640) and in euros; ranges span mixed to heavy freight, and a single value means both are equal. The battery sizing loop keeps the worst-case range at the end of life and is iterated until capacity, mass and ageing are consistent. The step-by-step build-up is shown in Figure 4 and the uncertainty in Figure 7.</figcaption>
</figure>

### 2.4 The software levers and their ranges

The levers other than the average gain cannot yet be calibrated from measurements on the vehicle. For this reason, each one is given a reference value and a range wide enough to show its effect on the result, as summarised in Table 2.

*Table 2. Software levers, reference values and ranges tested.*

| Lever | Reference value | Range tested |
| --- | --- | --- |
| Average gain | 3.0–3.5% (Central Europe) | 2–4% |
| Worst-case gain | 1.5 × the average gain | 1–2 × average |
| Slower ageing | 10% lower fade rate | 0–15% |
| Battery sized for end of life | On | On / off |
| Preconditioning | +3% effective charging power | 0–5% |
| Thermal operating limits | Off | 0–2 percentage points of usable capacity |
| Thermal hardware downsizing | €1,000 (truck), €2,000 (bus) | €0–1,500 |

The ageing, preconditioning, operating-limit and hardware values are assumptions for the sensitivity analysis, chosen to be conservative. For reference, a predictive battery thermal management study for fast charging reported a 4.5% reduction in charging time [7], and battery degradation over 260 cycles was three times higher at 55 °C than at 25 °C in laboratory tests [8]. Therefore, the conclusions in section 3 are only as firm as their behaviour across these ranges, which the tornado and Monte Carlo analyses test.

### 2.5 Applications and climates

Since the value follows the energy throughput, the payload and the business model, the same software is evaluated in seven applications that differ in all three. Their battery size, consumption, annual distance, service life and gain are shown in Figure 3.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig3-applications.png" alt="Three panels for seven vehicles: four EU trucks and three buses. Panel a: battery capacity and consumption, from 250 kWh for the opportunity-charged city bus to 640 kWh for the long-haul truck, and from 0.95 kWh/km for the urban truck to 1.40 kWh/km for the construction truck. Panel b: distance over the service life, from 50,000 km per year over 8 years for the urban truck to 100,000 km per year over 10 years for the coach and 120,000 km per year over 8 years for the long-haul truck. Panel c: average and worst-case gain in Central Europe, 3.0% and 4.5% for the long-haul, regional and construction trucks, and 3.5% and 5.3% for the urban truck, the coach and the city buses." loading="lazy" />
	<figcaption>Figure 3. The seven applications: (a) battery capacity, with the consumption in kWh/km; (b) distance over the service life, labelled with the annual distance and the service life; (c) average and worst-case gain of the software in Central Europe. The long-haul truck is the Part 3 truck; the buses are 12 m, except the 13 m coach.</figcaption>
</figure>

The gains differ by at most 0.5 percentage points between applications, whilst the annual distance differs by a factor of more than two and the service life ranges from 8 to 12 years. Hence, the value differs between applications mainly through the way each vehicle is used, which is examined in section 3.3.

Electricity costs €0.22/kWh for long-haul trucks and coaches, €0.20 for regional and construction trucks, and €0.18 for urban trucks and city buses, which charge mostly at the depot. The long-haul value is the ICCT's charging cost excluding VAT [14]; the others are my assumptions, lower because depot electricity is cheaper. The mass sensitivity ranges from 0.3 for the urban truck to 0.65 for city buses, which stop and start often.

The higher gain of the urban truck, the coach and the city buses is my estimate. It is supported by the larger heating and cooling demand measured on electric city buses:
- **Tampere, Finland:** the winter energy consumption of electric city buses was 40–45% higher than in summer [9].
- **European demonstration:** the winter consumption was up to 65% higher in some cases [10].
- **Valencia:** air-conditioning reduced range by 15–20% in hot summer weather [11].
- **Vehicle size:** Mercedes-Benz's eCitaro carries up to 88 passengers with batteries of up to 666 kWh [12].

However, the 2–4% was measured on trucks only. Hence, the gains of coaches and buses are an extrapolation, and they are kept within the measured range.

### 2.6 The analyses

Each of the four questions of the introduction requires a different analysis. I ran five:
1. **One-at-a-time sensitivity (tornado):** each parameter is varied across its range whilst the others stay at their reference values, to rank the parameters.
2. **Cumulative stack:** the software levers are added one at a time, to show the contribution of each one to the value of designing the software in.
3. **Application and climate matrix:** the value is calculated for all 21 combinations of application and climate.
4. **Charging regimes:** the charging time is compared for cases where the charger, the truck or the battery limits the charging power.
5. **Monte Carlo simulation:** 5,000 random combinations of all market and software parameters, drawn uniformly from their ranges, are evaluated to check whether the conclusions hold under combined uncertainty.

All values are per vehicle over its life, in euros, undiscounted.

## 3. Results

The results follow the order of the four questions in the introduction, with the linearity of the value added before the uncertainty test.

### 3.1 Designed in, the same gain is worth almost twice as much

The first question is how much more the same software is worth when it is designed in; most of the difference turns out to come from battery sizing. To separate the contribution of each lever, the software levers were added one at a time to the long-haul truck, with the battery downsized. In Figure 4, each step adds one lever to the step on its left, for mixed and heavy freight.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig4-lever-stack.png" alt="Waterfall chart of the value per long-haul truck over 8 years as the design levers are added one at a time, for mixed freight (blue) and heavy freight (orange). The efficiency gain alone (Part 3) is worth €12,200 and €16,300. The mass feedback adds €300 and €500, the worst-case gain €2,100 and €4,200, slower ageing €2,700 in both cases, sizing for end of life €2,300 and €4,700, preconditioning €1,000 and thermal hardware €1,000. The totals are €21,619, 3.3 times the electricity saved, and €30,454, 4.6 times. The battery capacity saved grows from 19 to 40 kWh. A dotted line marks the electricity saved, €6,640." loading="lazy" />
	<figcaption>Figure 4. Value of the same 3% average gain as the design levers are added one at a time, for the long-haul truck with mixed and heavy freight. The labels give the increment of each step; the grey line under each step gives the battery capacity saved (−40 kWh corresponds to 255 kg). The final values are given at the right, with the multiple of the electricity saved (dotted line).</figcaption>
</figure>

The same software, delivering the same 3% on average, is worth €12,200 per truck when it is added to a finished design and €21,600 when the design takes it into account. For heavy freight, the value rises from €16,300 to €30,500. The battery reduction more than doubles, from 19 to 40 kWh, and the cost per tonne-kilometre falls by 2.0% instead of 1.2% (2.6% instead of 1.4% with heavy freight). As a share of the 8-year TCO of about €1.10 million, the electricity saved is 0.6%, whilst the designed-in value is 2.0% with mixed freight and 2.8% with heavy freight. The TCO itself falls by 1.5–1.6%; the rest of the value is the revenue of the extra freight. Therefore, a 3% saving in energy becomes a value of up to 2.8% of the cost of the truck, 4.6 times the electricity it saves.

The two largest contributions come from sizing: the larger gain in the worst-case scenario, and a healthier battery at the end of its life. Both are invisible when the software is evaluated in daily operation, because they affect a decision that has already been taken. Since these contributions come from software levers, the next step is to compare their weight with that of the market parameters, which set the value in [Part 3](/writing/control-software-electric-trucks-part-3-business-case/).

### 3.2 Parameter ranking

In Part 3, the value of the software was set mainly by market parameters such as electricity price and annual distance. With the design levers included, the software parameters rank alongside them: five of the top eleven parameters are set by the thermal control software. The ranking comes from a tornado analysis, shown in Figure 5. Its starting point, the reference case, is the Part 3 truck in scenario B: the EU long-haul truck with a 3% average gain, mixed freight and the battery downsized, with all the design levers of section 2.4 switched off. Its value is €12,215, the result of Part 3 that the extended model reproduces (section 2.1). From this reference, one parameter at a time is moved to the low and then to the high end of its range, whilst all the others stay at their reference values. Each bar spans the two values obtained, so its length (the swing, written next to it) measures how much the result depends on that parameter, and the longest bars are at the top. A market parameter such as electricity price can raise or lower the value, so its bar extends on both sides of the reference line. A software lever starts from "off" in the reference case, so its bar extends only to the right: it can add value but not remove it.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig5-tornado.png" alt="Tornado chart of 19 parameters around the reference value of €12,215 for the long-haul truck with a 3% gain, mixed freight and the battery downsized. Software parameters are in orange and bold, market and vehicle parameters in blue. Efficiency gain, 2 to 4%: swing €7,900. Slower ageing used in sizing, off to on: €7,726, to the right only. Electricity price, €0.15 to 0.35 per kWh: €6,317. Vehicle life, 6 to 10 years: €5,390. Annual distance, 90,000 to 150,000 km: €5,198. Slower ageing, resale only: €4,064. Thermal operating limits, 0 to 2 points: €2,735. Then baseline consumption, paid share of charging time, share of weight-limited freight and worst-case gain, €1,950 to €2,365. Preconditioning, battery price, smaller thermal hardware, extra-payload rate, charger power and energy density, €864 to €1,690. Battery cycle life and mass sensitivity, about €300." loading="lazy" />
	<figcaption>Figure 5. Tornado analysis of the value of a 3% gain for the long-haul truck with mixed freight and the battery downsized. The vertical line is the reference case (€12,215, Part 3 scenario B, with the design levers off). Each bar spans the value with the parameter at the low and the high end of the range given in brackets, all other parameters at their reference; the number is the swing. Orange and bold: parameters set by the thermal control software.</figcaption>
</figure>

The two largest parameters are software parameters, because the two groups act on different quantities. The market parameters, such as distance, electricity price and vehicle life, decide what a kilowatt-hour is worth. The software decides how many kilowatt-hours are needed, how large the battery must be and how long it lasts.

However, the ranking above is for the reference case, and it changes with the use case:
- **Heavy freight:** the thermal operating limits (€5,700) and the worst-case gain (€3,900) move up the ranking, because every kilogram saved becomes cargo.
- **Charger power:** a more powerful charger reduces the value of the efficiency gain, because each kilowatt-hour saved represents less charging time. Section 3.5 shows how this effect changes with megawatt charging.
- **Battery kept:** electricity price is the largest single parameter (€6,000). The design levers that act through battery size then have no effect.

Therefore, the weight of the software parameters depends on the payload, the charging power and whether the battery is downsized, which makes the value a function of the application.

### 3.3 Applications and climates

With gains of 3.0–3.5% in all applications, the differences in value come from the way each vehicle is used. The value per vehicle in each application is shown in Figure 6; the quantities to compare are the value designed in and its multiple of the electricity saved.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig6-value-by-application.png" alt="Dumbbell chart of the value of the software per vehicle over its life for seven applications. Battery kept (open marker) against designed in, Central Europe (filled marker), with a whisker from Southern Europe to Nordic countries. EU long-haul: €8,100 to €21,600, 3.3 times the electricity saved, €2,700 per year. EU regional: €4,700 to €13,200, 3.4 times, €1,700 per year. EU urban: €2,900 to €8,900, 3.9 times, €1,100 per year. EU construction: €5,000 to €19,600, 5.0 times, €2,400 per year. Coach: €11,100 to €27,000, 3.3 times, €2,700 per year. City bus, depot: €5,400 to €18,800, 3.9 times, €1,600 per year. City bus, opportunity: €8,700 to €21,800, 4.2 times, €1,800 per year." loading="lazy" />
	<figcaption>Figure 6. Value of the software per vehicle over its life, with the battery kept (open marker) and designed in, in Central Europe (filled marker). The whiskers span the designed-in value from Southern Europe to Nordic countries. The labels give the designed-in value as a multiple of the electricity saved and per year of service.</figcaption>
</figure>

Each of the quantities in Figure 6 follows a different vehicle property:
- **Value and energy throughput:** long-haul trucks and coaches drive the most kilometres, so each percent of efficiency is worth the most. Urban trucks have a slightly larger gain, but they drive less, and their value is the lowest.
- **Multiplier and payload constraint:** construction trucks are always weight-limited. Their electricity saving is smaller than for long-haul, but every kilogram of battery avoided becomes cargo, and the total value reaches 5.0 times the electricity saved.
- **Multiplier and battery cost:** city buses pay more per kilowatt-hour of battery than trucks and use cheaper depot electricity. Hence, the battery avoided weighs more against the electricity saved, and the multiplier reaches 3.9–4.2.

The climate moves the gain within the measured range. For a long-haul truck, the value with the design-stage levers included is €19,300 in Southern Europe, €21,600 in Central Europe and €23,900 in Nordic countries. This is because a cold climate increases the average gain and, through the worst-case gain, the battery reduction.

Hence, designing the software in multiplies the electricity saving by 3.3–5.0 in every application, and the largest absolute values appear where a high throughput or a binding payload constraint meets a long service life. City buses combine the longest service life with a different business model, which is treated next.

### 3.4 Buses

City buses have the largest heating and cooling demand of all applications, but they are operated and paid differently from trucks. The physical mechanism is the same, and the way the gain becomes value depends on the charging concept:
- **Depot-charged buses:** these buses carry a battery large enough for a full day of service in winter. On a 12 m bus, the battery mass reduces the number of passengers the bus can legally carry. In the model, a 3.5% average gain (5.3% in the worst-case scenario) removes 39 kWh and 260 kg of battery. This mass is equivalent to about 4 more passenger places on a full bus, in addition to €18,800 of value over 12 years.
- **Opportunity-charged buses:** these buses have small batteries, charged at the end of the line. The battery saving is smaller, and capacity is no longer limited by weight in the model. However, every minute at the charger is driver and timetable time, so the value comes from energy and charging time. For this reason, the value with the battery unchanged (€8,700) is higher than for the depot bus (€5,400).

The economic indicator is also different. Bus operators are usually paid per kilometre under public service contracts, so the relevant figure is the cost per vehicle-kilometre (0.9–1.1% lower in the model), together with fleet size and passenger capacity. Cost per tonne-kilometre does not apply.

Published results confirm that the thermal system of a bus offers room for improvement. Model predictive control of a bus air-conditioning system saved 8% of its energy [5], and HVAC optimisation based on fleet data saved up to 24% [6]. These savings refer to the thermal system only, so they are not converted into a vehicle gain here. Therefore, for buses the software's gain is converted into passenger capacity or charging time, and charging time is also the lever that changes most for trucks as charging power rises.

### 3.5 A smaller battery does not always charge faster

Part 3 assumed that a smaller battery leads to shorter charging stops, because there is less energy to put back. This assumption holds only as long as something other than the battery limits the charging power, and megawatt charging moves that limit to the battery. Currently, the limit is either the charger or the truck: current trucks accept up to about 750 kW on a megawatt charger [15]. When the charger and the truck can both deliver more than the battery accepts, the battery sets the power. A smaller battery then accepts proportionally less power, and the charging time hardly changes. The charging hours saved by a 3% gain are listed in Table 3 for each limiting element.

*Table 3. Charging hours saved by a 3% gain, by the element that limits the charging power.*

| Case | What limits the charging power | Charging hours saved over the vehicle's life (3% gain) |
| --- | --- | ---: |
| Long-haul truck, 400 kW charger (8 years) | Charger | 93 h |
| Long-haul truck, 1,000 kW megawatt charger, truck accepts 750 kW (8 years) | Truck | 50 h |
| Future long-haul truck accepting 1,200 kW (8 years) | Battery | 2 h |
| City bus, 450 kW opportunity charger (12 years) | Charger, close to the limit | 71 h |

The higher the charging power the truck accepts, the more the battery's own acceptance becomes the limit, and that acceptance depends strongly on temperature. In light-duty fleet data, a 30-minute fast charge at 0 °C delivered 22–36% less charge than at 25 °C [13]. Hence, with megawatt charging, the charging time saving shifts from the battery's size to its temperature, and preconditioning, which is purely a function of the thermal control software, becomes the main lever for charging time.

### 3.6 Each percent of gain is worth about the same

For development, the size of the improvement needed before the software has value also has to be known. In the model, the value is almost proportional to the gain, so no minimum improvement is needed. Across all seven applications, a 10% gain is worth 91–92% of ten times the value of a 1% gain, so each additional percent is worth almost as much as the first.

However, there is one physical threshold: on a vehicle that is already built, the battery can only shrink by a whole pack (Part 3, section 2.3). This threshold does not exist at the design stage, when the pack configuration is still open. Therefore, small gains are worth capturing, and they are captured in full only when the software is included at that stage.

### 3.7 The conclusion holds under uncertainty

The results above vary one parameter at a time, so they do not show whether the main conclusion survives when all parameters are uncertain at once. To test this, the Monte Carlo simulation drew 5,000 combinations of all parameters: electricity price, distance, battery price, freight rates, weight-limited share, mass sensitivity, average gain between 2 and 4%, worst-case factor, ageing and preconditioning. Figure 7 shows the 10th percentile (P10), the median and the 90th percentile (P90) of the value; the comparison of interest is between the battery-kept and the designed-in cases.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig7-monte-carlo.png" alt="Whisker chart of the Monte Carlo results for four cases, from P10 to P90 with the median. Long-haul, battery kept: €8,100 to €16,600, median €11,800, 1.6 times the electricity saved. Long-haul, designed in, mixed freight: €14,100 to €28,600, median €20,200, 2.8 times. Long-haul, designed in, heavy freight: €19,300 to €39,300, median €28,200, 3.8 times. City bus, depot, designed in: €10,200 to €20,800, median €14,900, 3.2 times. A dashed line marks the median of the battery-kept case; the P10 of both long-haul designed-in cases lies to its right." loading="lazy" />
	<figcaption>Figure 7. Value per vehicle over its life in 5,000 Monte Carlo combinations of all market and software parameters. The whiskers span P10 to P90 and the marker is the median, with its multiple of the electricity saved. The dashed line marks the median with the battery kept.</figcaption>
</figure>

In all 5,000 combinations with the battery downsized, the value exceeded 1.5 times the electricity saved. Furthermore, the low estimate for a long-haul truck with the software designed in (€14,100) is higher than the median for the same software added to a finished truck (€11,800). Therefore, in the ranges tested, the advantage of designing the software in is larger than the combined uncertainty of the market and software parameters.

## 4. Engineering parameters and their link to control software

To use the values per vehicle in development, they must be traced back to the engineering parameters that a development team specifies. Each parameter is fixed at one level of the left branch of the V model in Figure 1, as illustrated in Figure 8.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part4-fig8-parameters-v-model.svg" alt="Diagram in four horizontal bands, one per level of the left branch of the V model: vehicle requirements, system design and sizing, thermal system design and control software design. Each band contains the engineering parameters fixed at that level, with the control function that sets it and the business effect. Shaded parameters are set by the control software; white parameters are set by the vehicle and its use. Vehicle requirements (white): climate and duty cycle set the thermal demand, with a larger gain in buses and cold climates; payload constraint, more freight per kilogram saved; charger power, where the battery limits megawatt charging. System design and sizing (shaded): worst-case consumption, through predictive heating and waste heat, for a smaller battery and lower cost; battery temperature over life, with no hot soaks and no cold charging, for slower ageing and higher resale; charging power acceptance, through preconditioning, for shorter charging time; usable battery window, through temperature-aware limits, for more usable kWh per installed kWh. Chemistry and energy density (white): LFP needs more heating in the cold, and saves more kilograms per kWh. Thermal system design (shaded): heating and cooling demand, through heat buffering and reuse, for lower demand and the 2–4% gain; thermal component sizing, through peak reduction and control allocation, for smaller, cheaper and lighter parts. The control software design band holds the worst-case control performance, predicted with models and validated with a stated confidence, which is needed at the levels above. An orange arrow labelled designed in runs from control software design up to the two design levels." loading="lazy" />
	<figcaption>Figure 8. Engineering parameters grouped by the level of the V model (Figure 1) at which they are fixed. Each parameter lists the control function that sets it and its business effect. Shaded parameters are set by the control software, and the orange arrow marks their worst-case performance designed in at the concept stage; white parameters are set by the vehicle and its use and decide how much of the software's effect becomes value.</figcaption>
</figure>

Six of the ten parameters are set by a thermal control function, and all of them are fixed at the system and thermal design levels, before the control software is designed. Hence, the worst-case control performance must be known at these levels, from models, if it is to enter the vehicle specification.

## 5. What this means for vehicle development

Since these parameters are fixed early, the software's value is captured only if the control performance is known when they are specified. Based on the results, five steps are proposed for the development of electric trucks and buses:
1. **Dimensioning consumption with the control strategy included:** the battery is sized from the expected consumption in the worst-case scenario. If that figure assumes conventional control, the battery is sized for a less efficient vehicle than the one that will be built. A control strategy validated under these extreme operating conditions, with a stated confidence, can be used as a sizing input.
2. **Thermal hardware and control sized together:** heaters, compressors and radiators sized for peak demand without predictive control are larger than needed with it. Designing them together reduces cost and mass on both sides.
3. **Ageing included in the battery sizing:** thermal control affects how much capacity the battery loses over its life. If the end-of-life margin is calculated with the controlled temperature profile, part of that margin can be removed at the start.
4. **Charging time treated as a thermal problem:** with megawatt charging, the time at the charger depends more on the battery's temperature on arrival than on its size. Preconditioning should therefore be part of the charging specification.
5. **Design adapted to the application and the climate:** a Nordic city bus, a Southern European long-haul truck and a construction tipper benefit from the same software in different ways. Variants that use the margin differently (capacity, payload or charging time) capture more of the value.

All five steps depend on how reliably the control performance and its design effects are known, which sets the limits of this analysis.

## 6. Limitations of the analysis

The values in this article rest on assumptions of different reliability:
- **Gains by application and climate:** the 2–4% was measured on trucks. The position of each application and climate within that range, and the gains of coaches and buses, are my estimates.
- **Design levers:** the values for ageing, preconditioning, operating limits and hardware downsizing are set for the sensitivity analysis, not measured. Their ranges are shown so that each can be judged separately. The operating-limits lever moves the operating point within the battery limits set by the functional safety concept (ISO 26262 [21]); it does not widen those limits.
- **Bus economics:** these results are indicative, since bus prices, service life, mileage and driver costs vary widely between cities and contracts.
- **Development cost:** validating a control strategy to the level required for sizing takes engineering effort, and that effort is not subtracted from the figures.

Therefore, the absolute values are indicative, whilst the comparison between software added to a finished design and software designed in is less sensitive to these assumptions, as the Monte Carlo simulation in section 3.7 shows.

## Summary and conclusions

The battery, the thermal hardware and the charging specification of an electric truck are sized for the worst-case scenario at the concept stage, usually before the performance of the thermal control software is known. The software is then valued only for the electricity it saves, as in the business case of [Part 3](/writing/control-software-electric-trucks-part-3-business-case/). This article quantified what changes when that performance is a design input, with a life-cycle cost model of seven trucks and buses in three European climates.

**Designed in, the same software is worth almost twice as much.** For a long-haul truck with a 3% average gain, the value rises from €12,200 to €21,600 per truck over 8 years, and from €16,300 to €30,500 with heavy freight, mainly because the battery shrinks by 40 kWh instead of 19 kWh. As a share of the TCO, the value grows from 1.1–1.5% to 2.0–2.8%, against 0.6% for the electricity alone. The two largest contributions come from sizing: the larger gain in the worst-case scenario, which [Part 1](/writing/control-software-electric-trucks-part-1-context/) identifies as the scenario that sizes the battery, and a healthier battery at the end of its life. Five of the eleven most influential parameters are set by the software, and the two largest rank ahead of the electricity price. In every application, the designed-in value is 3.3–5.0 times the electricity saved, highest where the throughput, the service life or the payload constraint is high. With megawatt charging, the battery itself limits the charging power, so preconditioning replaces battery size as the main lever for charging time. In 5,000 Monte Carlo combinations, the low estimate for the designed-in truck (€14,100) exceeded the median with the battery kept (€11,800).

**Hence, the value of control software depends on when its performance is known as much as on its size.** When a vehicle is specified, the control performance in the worst-case scenario, validated with a stated confidence through the staged process described in [Part 2](/writing/control-software-electric-trucks-part-2-engineering/), can be used as an input to the battery capacity, the ageing margin, the thermal hardware and the charging specification. The absolute values rest on assumed design levers and on gains measured on trucks only; the comparison between software added afterwards and software designed in is less sensitive to them. **Consequently, control engineering should be part of the concept stage of the vehicle, next to the sizing of the battery and the thermal hardware.**

## References

1. S. Ramesh Babu, S. Sebben, Z. Chronéer, S. Etemad, Heating-load strategies for battery-electric trucks in cold climates, *Thermal Science and Engineering Progress*, 2025. https://doi.org/10.1016/j.tsep.2025.103417
2. Song et al., Motor waste-heat recovery for battery heating in a heavy-duty electric truck, *Batteries*, 2024. https://doi.org/10.3390/batteries10090328
3. S. Ramesh Babu, S. Sebben, Z. Chronéer, Adaptive cabin air recirculation in an electric truck, *International Journal of Heat and Mass Transfer*, 2023. https://doi.org/10.1016/j.ijheatmasstransfer.2023.125056
4. Hadzovic, Kampker, Heimes et al., Predictive control for cabin heating in fuel cell trucks, *World Electric Vehicle Journal*, 2025. https://doi.org/10.3390/wevj16100568
5. Yan, He, Jia, Li, Model predictive control of the air-conditioning system for electric bus, *Energy Procedia*, 2017. https://doi.org/10.1016/j.egypro.2017.03.694
6. Hossain et al., Electric bus energy consumption and HVAC optimisation from fleet data, *Future Transportation*, 2025. https://doi.org/10.3390/futuretransp5030092
7. Predictive battery thermal management for fast charging, *Automotive and Engine Technology*, 2025. https://doi.org/10.1007/s41104-025-00157-7
8. F. Leng, C. M. Tan, M. Pecht, Effect of temperature on the aging rate of Li-ion battery operating above room temperature, *Scientific Reports* 5:12967, 2015. https://doi.org/10.1038/srep12967
9. Vehviläinen, Lavikka, Rantala, Paakkinen, Setting up and operating electric city buses in harsh winter conditions, *Applied Sciences*, 2022. https://doi.org/10.3390/app12062762
10. Al-Saadi et al., Electric bus and truck demonstrations in Europe, *World Electric Vehicle Journal*, 2022. https://doi.org/10.3390/wevj13010020
11. Viana-Fons, Payá, HVAC energy in electric city buses in a Mediterranean climate, *Energy*, 2024. https://doi.org/10.1016/j.energy.2024.131151
12. Daimler Buses, Mercedes-Benz eCitaro. https://www.mercedes-benz-bus.com/int/en/models/ecitaro.html
13. Y. Motoaki, W. Yi, S. Salisbury, Empirical analysis of electric vehicle fast charging under cold temperatures, *Energy Policy* 122, 2018. https://doi.org/10.1016/j.enpol.2018.07.036
14. ICCT, A total cost of ownership comparison of truck decarbonization pathways in Europe, 2023. https://theicct.org/publication/total-cost-ownership-trucks-europe-nov23/
15. electrive, New generation MAN eTGX unveiled with 720 km range, September 2026. https://www.electrive.com/2026/09/14/new-generation-man-etgx-unveiled-with-720-km-range/
16. D. Göhlich, T.-A. Fay, D. Jefferies, E. Lauth, A. Kunith, X. Zhang, Design of urban electric bus systems, *Design Science* 4:e15, 2018. https://doi.org/10.1017/dsj.2018.10
17. D. Jefferies, D. Göhlich, A comprehensive TCO evaluation method for electric bus systems based on discrete-event simulation including bus scheduling and charging infrastructure optimisation, *World Electric Vehicle Journal* 11(3):56, 2020. https://doi.org/10.3390/wevj11030056
18. P. Lokur, N. Murgovski, Energy-optimal thermal management of heat-pump battery electric vehicles, arXiv preprint 2605.29104, 2026. https://arxiv.org/abs/2605.29104
19. Shiledar et al., Assessing geographical and seasonal influences on energy efficiency of electric drayage trucks, arXiv preprint 2504.02575, 2025. https://arxiv.org/abs/2504.02575
20. VDA QMC, Automotive SPICE Process Reference and Assessment Model, version 4.0, 2023. https://vda-qmc.de/en/automotive-spice/
21. ISO 26262:2018, Road vehicles: Functional safety, Parts 1–12, International Organization for Standardization, 2018. https://www.iso.org/standard/68383.html
*The analysis uses my own life-cycle cost model, an extension of the Part 3 model. The position of the gain by application and climate and the design levers are modelling assumptions, and their ranges are shown in section 2.4. No confidential data, control algorithm or system layout is disclosed.*
