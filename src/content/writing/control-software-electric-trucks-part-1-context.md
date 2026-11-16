---
title: "How thermal limits set the battery size of an electric truck"
seoTitle: "Thermal limits on electric truck battery size"
subtitle: "How thermal limits set the battery size of an electric truck"
description: "How cold-weather energy demand and battery limits set an electric truck's range, mass and cost, and how thermal control can change the capacity required."
teaser: "How thermal limits set an electric truck's battery size, payload and cost."
publishDate: 2026-11-02
updatedDate: 2026-11-17
readingTime: 15 min read
category: Physical Systems Engineering
tags:
  - Electric trucks
  - Battery sizing
  - Thermal management
  - Heavy-duty vehicles
relatedProject: electric-truck-thermal-management
keyFigure:
  value: "About 32%"
  label: "of the reference truck's purchase price is its battery"
  frame: "Why it matters"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part1-social.png"
  alt: "Part 1 of 4. How thermal limits set the battery size of an electric truck. The battery accounts for about 32% of the reference truck's purchase price."
featured: false
draft: false
series:
  id: control-software-electric-trucks
  part: 1
---

A diesel truck heats its cab with waste heat from the engine. An electric truck has far less waste heat, so its heating draws on the same battery that drives the wheels. In one passenger-car test, the range lost in the cold reached about 40% [1]. A long-haul electric truck carries a 600–800 kWh battery of roughly 4–5 tonnes, and must still complete its fully loaded route on a cold day near the end of its working life. **The battery is therefore sized for that difficult day, but its mass and purchase cost are carried on every other day as well.**

On that day, the battery's temperature also limits the power it can deliver and the charging power it accepts. The thermal management software decides where the heat comes from and when, and so how much stored energy goes into heating instead of driving. In my work on electric trucks, predictive and optimisation-based thermal control reduced total vehicle energy use by 2–4% against production feedback control in truck tests across −30 to 40 °C. Whether this saving also allows a smaller battery depends on when and where it is saved.

This first part follows that question from the route to the battery size. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) develops the control methods, [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) converts the saving into the haulier's cost per tonne-kilometre, and [Part 4](/writing/control-software-electric-trucks-part-4-design/) examines what happens when the saving is known before the truck is specified.

## 1. What a kilowatt-hour of battery costs

Regulation is moving electric trucks into long-haul freight. The European CO₂ standards require manufacturers to cut the average emissions of their new heavy-duty vehicles by 45% in 2030, 65% in 2035 and 90% in 2040 [2]. Mercedes-Benz, Volvo, MAN and Scania now produce electric long-haul trucks with approximately 500–720 km of range under their stated conditions [3–6]. For the operator, the question is whether a truck completes its route, and at what cost per tonne-kilometre (the cost of moving one tonne of freight over one kilometre). With French road hauliers making pre-tax margins of only 1.4–2.2% in 2022–2023 [7], that cost has little room to rise. Therefore, the battery's cost and payload weigh on the purchase decision as much as its range.

The capacity a truck needs is set by its route, load, charging opportunities, weather and battery ageing at the end of its working life. Each added kilowatt-hour also adds mass that displaces freight on a weight-limited trip. The EU allows zero-emission trucks 2 tonnes of extra gross weight [8]. A long-haul pack weighs more than that. How thermal control enters this sizing problem is illustrated in Figure 1. Its return arrow marks a design possibility, because a validated saving can change the battery specification if it is known early enough.

<figure class="article-figure article-figure--inspect-mobile" style="--figure-inspect-width: 1050px">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect the diagram, or <a href="/images/blog/control-software-electric-trucks/part1-fig1-battery-dimensioning.svg" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 1: scroll horizontally to inspect the battery-sizing diagram">
		<img src="/images/blog/control-software-electric-trucks/part1-fig1-battery-dimensioning.svg" width="1050" height="560" alt="Route and weather, payload, cost and an eight-year-old battery constrain its size. Thermal hardware controls battery temperature; software selects operating modes and can feed a validated energy saving back into battery sizing." loading="lazy" />
	</div>
	<figcaption>Figure 1. Battery-sizing constraints and the thermal-control feedback path. The dashed arrow indicates software commands to thermal hardware. The orange arrow is the possible effect of improved control on battery sizing. The arrangement is a general illustration, not a specific manufacturer's circuit.</figcaption>
</figure>

A control improvement reaches the battery size only through the orange arrow of Figure 1, and only if the energy is saved in the conditions that set the capacity. Otherwise, it gives the existing truck more range without reducing its purchase price.

The price of each kilowatt-hour lies in the pack mass and pack cost, both plotted against capacity in Figure 2. Battery packs average about $108/kWh across all applications [9], but commercial-vehicle packs cost more, so the figure uses their range of 150–220 €/kWh [10]. Two pack densities, 145 and 175 Wh/kg, bound the effect of the cell chemistry.

<figure class="article-figure article-figure--inspect-mobile article-figure--print" style="--figure-max: 52rem; --figure-inspect-width: 1050px">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect both plots, or <a href="/images/blog/control-software-electric-trucks/part1-fig2-mass-cost-vs-capacity.png" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 2: scroll horizontally to inspect pack mass and cost">
		<img src="/images/blog/control-software-electric-trucks/part1-fig2-mass-cost-vs-capacity.png" width="3125" height="1563" alt="Two line plots. At 600–800 kWh, assumed pack densities of 145–175 Wh/kg give 3.4–5.5 tonnes; at 150–220 euros per kWh, pack cost is 90,000–176,000 euros." loading="lazy" />
	</div>
	<figcaption>Figure 2. Pack mass (a) and cost (b) versus capacity. Mass bounds use assumed LFP (145 Wh/kg, solid) and NMC811 (175 Wh/kg, dashed) pack densities. Cost bounds use 220 €/kWh (solid) and 150 €/kWh (dashed) [10]. The shaded band marks 600–800 kWh. The dotted line marks the 2-tonne gross-weight allowance [8].</figcaption>
</figure>

Both quantities grow linearly with capacity. **Each additional kilowatt-hour adds 5.7–6.9 kg and 150–220 €.** Across the plotted bounds, a 600–800 kWh pack weighs 3.4–5.5 tonnes and costs 90,000–176,000 €. The 2-tonne allowance covers only 36–58% of that mass, and the rest reduces payload on weight-limited work. Hence, a smaller battery lowers the purchase price and, on weight-limited work, returns its mass to the freight.

## 2. Battery temperature changes range, charging and life

The kilowatt-hours bought in section 1 are only fully usable when the cells are at the right temperature, roughly 15–35 °C for lithium-ion cells [11]. Below this window, the battery supplies less power and accepts less charging power, and heating restores that capability with energy from the same battery that must complete the route. Above it, fast charging and high loads require cooling, and a high cell temperature accelerates ageing [12], which reduces the capacity left for the route after years of use.

Figure 3 sketches these effects against the cell temperature, with the edge of each region marking where its constraint starts to tighten.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part1-fig3-temperature-window-mobile.svg" width="360" height="535" />
		<img src="/images/blog/control-software-electric-trucks/part1-fig3-temperature-window.png" width="3125" height="991" alt="Qualitative temperature scale from −30 to 50 °C. Below the preferred 15–35 °C window, power and charging power fall; above it, cooling and control of ageing become more demanding." loading="lazy" />
	</picture>
	<figcaption>Figure 3. Qualitative effect of lithium-ion cell temperature on available power, charging and ageing. Grey lines delimit the approximate preferred window [11]. The cold and hot regions show different constraints. Cell ageing evidence is described in [12].</figcaption>
</figure>

On the cold side of Figure 3, the battery limits the power at departure and the fast-charging speed. On the hot side, it needs heat removal, and its temperature affects the capacity left after repeated use. Cell chemistry shifts these limits without removing them. For example, lithium iron phosphate (LFP) cells are cheaper and longer-lived than nickel manganese cobalt (NMC) cells, but weaker below 0 °C (Appendix A).

**For battery sizing, temperature therefore changes both sides of the calculation, because on a cold day the route demands more energy from a battery that may provide less and charge more slowly.** A thermal controller can reduce the heating electricity and prepare the pack before charging, but only with the heat sources and flow paths that the thermal circuits provide.

## 3. Thermal circuits and the choices they allow

A truck's thermal system serves three consumers with different temperature needs: the battery, the electric drivetrain and the cab. Coolant circuits carry heat between them through pumps, valves and radiators, and a refrigerant circuit cools below ambient or runs as a heat pump. This is a common arrangement in electric vehicles, although the way the circuits are connected varies between manufacturers.

In winter, the heat source sets much of the electricity the system uses. Under favourable conditions, a heat pump supplies roughly two to three units of heat per unit of electricity, whereas a resistance heater supplies one. This ratio (the *coefficient of performance*) falls with the outside temperature, so the heat pump's advantage shrinks on the coldest days. Drivetrain waste heat is a third source. It reduces electrical heating whenever it can reach the battery or the cab.

Whether that waste heat can reach the battery depends on how the circuits are connected. Separate circuits keep each subsystem simple to control, but the drivetrain heat is then rejected to the air whilst an electric heater warms the battery. Connected circuits make heat recovery possible at the cost of more valves and operating modes (combinations of flow paths and active components). The software must then decide, for example, when to heat the pack before charging or cool it before a climb, and a wrong path or a late start loses the saving. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) explains how feedback and predictive optimisation take these decisions.

How far to connect the circuits depends on the heat sources available on the route that sets the battery size. In a Nordic winter, the heat pump's favourable coefficient no longer holds. In my opinion, **the circuit layout and the control strategy should be chosen together, since the layout sets which strategies are possible and the controller sets how much energy they use.**

## 4. The cold route sets the battery capacity

The most demanding route condition is a cold day, which raises the truck's energy demand and lowers what the battery can deliver. The cab and the battery need more heat just when the heat pump supplies less of it per unit of electricity. Denser air and stiffer tyres also raise the driving resistance. Thermal control can reduce only the heating part of this extra demand.

The size of this winter penalty depends on how much of a vehicle's energy goes into heating. Reported effects for several electric vehicle types are compared in Figure 4, with each source's metric and evidence type next to its marker. Because duty cycles and metrics differ, the comparison gives orders of magnitude only.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part1-fig4-winter-penalty-mobile.svg" width="360" height="642" />
		<img src="/images/blog/control-software-electric-trucks/part1-fig4-winter-penalty.png" width="3125" height="1203" alt="Winter comparison with different metrics: tested car range loss about 40%; measured Finnish city-bus energy increase 40–45%; measured German regional-truck energy increase about 25% from 20 to 0 °C; simulated mild-climate drayage-truck increase 3–10%." loading="lazy" />
	</picture>
	<figcaption>Figure 4. Winter consumption increase or range loss by application. Passenger-car tests [1], German truck operating data [13], Finnish city-bus measurements [14] and mild-climate drayage-truck simulations [15] use different baselines and metrics. Bars indicate reported ranges and dots single values. These results do not give a truck-specific winter penalty.</figcaption>
</figure>

The Finnish city buses in Figure 4, with a large passenger space to heat, used 40–45% more energy in winter than in summer [14]. Propulsion dominates a heavy truck's energy use, so its relative penalty is smaller but still large. The German regional trucks consumed about 0.13 kWh/km more for each 10 °C drop, roughly 25% more at 0 °C than at 20 °C [13]. In the mild-climate drayage-truck simulations, the difference was only 3–10% [15]. **A winter correction transferred from a bus, a car or a mild-climate truck would therefore give the wrong sizing input for a long-haul truck.**

In the same German data, trucks with preconditioned batteries (heated before departure or charging) showed no clear temperature dependence [13], although fleet data do not isolate the effect of the software. In my winter tests, preconditioning also decides whether the truck leaves on time, because a cold battery limits the departure power and very cold coolant can turn to slush and block a circuit. Done whilst the truck is plugged in, it draws its energy from the grid instead of the range.

### The saving in winter

Since the worst-case conditions set the battery size, the gain of thermal control in those conditions decides how much battery it can save. *Predictive control*, examined in this series, uses the expected route and the next charging stop to plan heating and cooling ahead. In winter, it can heat the battery for charging when drivetrain waste heat is available. In summer, it can pre-cool the pack before a long climb or a fast-charging stop, using its thermal mass to delay a temperature limit. Summer heat also accelerates ageing, with laboratory tests finding temperature-dependent calendar fade (capacity lost at rest) for several chemistries and increased LFP cycling fade between 15 and 35 °C [12]. Summer therefore matters mostly for the cooling capacity and for the battery health left after years of service, whereas the capacity itself is set on the cold route.

For sizing, the decisive number is how much larger the saving is in winter than on average. No long-haul truck study reports that ratio. Bus and car studies show its direction. At −10 °C, one urban-bus analysis assigned about 24 kW to heating at 18 km/h, adding 1.3 kWh/km to the 1.2 kWh/km for traction and other auxiliaries [16]. Heating is then about half of the energy use. The same fractional thermal saving is therefore largest in absolute terms in winter.

In a passenger-car heat-pump study, nonlinear model predictive control saved 20.2% of the thermal energy at −5 °C and 27.8% at −10 °C against rule-based control [17]. In absolute terms, the saving rose from 460 to 840 Wh, about 1.8 times. Both studies, however, measure thermal energy, whereas the 2–4% from my work is a reduction in *total truck energy*.

To bridge that gap, I use a winter improvement of 1.5 times the annual average, a modelling choice kept below the car study's 1.8 because no truck measurement confirms it yet. The model defines an improvement *g* so that the new consumption equals the old consumption divided by $(1+g)$, and at unchanged range the battery capacity falls by the same ratio. For the 640 kWh reference truck of [Part 3](/writing/control-software-electric-trucks-part-3-business-case/), a 2% improvement removes $640 \times 0.02/1.02$, or 12.5 kWh, slightly less than 2% of the capacity (Appendix B). The reductions sized on the annual average and on the winter improvement are listed in Table 1.

*Table 1. Modelled battery reduction when the same annual improvement is available in winter.*

| Annual average efficiency improvement | Sized on the annual average | Sized on 1.5× the average in winter |
| --- | ---: | ---: |
| 2% | 12.5 kWh / 80 kg | about 19 kWh / 120 kg |
| 4% | 25 kWh / 156 kg | about 36 kWh / 230 kg |

**When the winter improvement sets the capacity, about half as much battery again is removed.** This requires the gain to be confirmed on the cold route that sizes the battery, and the modules to be still resizable at specification. Nordic truck telematics attribute 7–8 kWh/100 km of the winter penalty to water or snow on the road [18], a rolling resistance that thermal control cannot remove. Before a winter saving enters a battery specification, the heating energy has to be separated from the road and route effects in the data.

## 5. A small energy saving can change the truck's economics

A saving that reaches the battery size spreads beyond the energy bill. A smaller battery makes the truck lighter and slightly reduces its traction energy, a feedback that [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) calculates at about 1.07 times the original saving. It is small because the battery is only about an eighth of the operating mass and aerodynamic drag does not fall with mass. Most of the additional *value* therefore comes from the lower battery cost and, on weight-limited work, the freight its mass frees.

[Part 3](/writing/control-software-electric-trucks-part-3-business-case/) values these channels in a normalised truck whose battery is about 32% of the purchase price: electricity, battery cost, extra payload and paid charging time (limits in Appendix C). For a 3% improvement, in the middle of the measured range, they total 8,100 € per truck over eight years with the battery kept and up to 16,300 € with a smaller battery, or 1.23–2.46 times the electricity saved. The battery and payload channels, however, need the saving at specification, because a truck already built keeps its pack and removing a whole module would take at least a 12% improvement. A software update therefore does not deliver them to an existing fleet, only to a new vehicle or a selectable battery variant.

To compare the channels on one scale, Figure 5 plots the value of a *3% modelled efficiency improvement* (about 2.9% less energy use) as a multiple of the electricity it saves. This multiple is not a fall in total cost of ownership.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part1-fig5-value-multiplier-mobile.svg" width="360" height="646" />
		<img src="/images/blog/control-software-electric-trucks/part1-fig5-value-multiplier.png" width="3125" height="1234" alt="For a 3% modelled gain, value relative to electricity saved is 1.00 times for electricity alone, 1.07 with lighter-battery energy feedback, 1.23–2.46 with economic channels and 3.25–4.58 when further design effects are included." loading="lazy" />
	</picture>
	<figcaption>Figure 5. Modelled value of a 3% efficiency improvement divided by the electricity saving in the reference long-haul truck. The diamonds mark Part 3's operating scenarios and Part 4's design cases. The bars span their ranges, and the dotted line marks electricity alone. The Part 4 cases add winter sizing and other design effects and are separate from Part 3's base scenarios.</figcaption>
</figure>

In Figure 5, the battery-mass feedback moves the value only from 1.00 to 1.07 times the electricity saved. The haulier's cost and freight channels raise it to 1.23–2.46 times, although extra freight is revenue and not a lower cost. [Part 4](/writing/control-software-electric-trucks-part-4-design/) adds design effects, including winter sizing and slower ageing, which raise the *modelled* value to 3.25–4.58 times on assumptions that the 2–4% truck tests alone do not support. As I see it, **most of this value is decided at the battery specification, so validated control performance has to reach the vehicle design before the battery is fixed.**

## Summary and conclusions

The battery of an electric long-haul truck is sized so that the route remains achievable with a cold or aged battery and the haulier's charging stops. At 600–800 kWh, it weighs 3.4–5.5 tonnes and costs 90,000–176,000 €, carried on every day of the year. Cold limits its power and fast charging, and heat accelerates its ageing. Heating the cells consumes route energy, which thermal control can reduce only as far as the hardware lets it choose the heat source and the flow path.

In my truck work, predictive and optimisation-based thermal control reduced total vehicle energy use by **2–4% against production feedback control in tests across −30 to 40 °C**. Because the battery is sized for the worst case, the winter value of this saving decides how much battery it can remove. With 1.5 times the annual improvement in winter, the reduction for the 640 kWh reference truck grows from 12.5–25 kWh to about 19–36 kWh. That factor rests on bus and car evidence and still needs a truck winter test, and the road surface and the freedom to resize the battery remain separate constraints.

Beyond the battery, the value of the saving exceeds the electricity it saves. [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) values a 3% gain at **8,100–16,300 € over eight years** for the reference truck, and [Part 4](/writing/control-software-electric-trucks-part-4-design/) evaluates the winter and battery-life effects separately. The first number in this chain to replace with a measurement is the winter factor of 1.5. One cold-route test against the production controller, with the heating separated from the rolling resistance, would provide it before a control gain changes the battery specification.

## Appendix: assumptions and data limitations

### A. The battery comparison is an illustration

Figure 2 uses 145 Wh/kg for LFP and 175 Wh/kg for NMC811 at *pack* level. Dividing 600–800 kWh by those densities gives the 3.4–5.5 tonne bounds, and multiplying capacity by 150–220 €/kWh gives 90,000–176,000 €. The 150–220 €/kWh range is the commercial-vehicle pack-cost range [10], not BloombergNEF's $108/kWh average across all applications [9]. A 2-tonne allowance divided by the end-point pack masses gives the 36–58% coverage quoted in section 1.

Table A1 compares further chemistries using rounded scenario inputs for a *trade-off illustration*. They are not independently sourced pack specifications, current market quotes or a prediction of which chemistry a truck maker will choose. Sodium-ion and solid-state are outlook cases. The 130 €/kWh assumed for LFP in this table is not the 150–220 €/kWh market range used in Figure 2, and [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) uses a separate 154 €/kWh pack price.

*Table A1. Illustrative pack-level comparison assumptions, not product measurements.*

| Chemistry | Wh/kg | Wh/L | Assumed €/kWh | Assumed cycles to 80% health | Indicative cold behaviour |
| --- | ---: | ---: | ---: | ---: | --- |
| NMC811 | 175 | 330 | 165 | 3,000 | Good; sensitive to heat |
| NMC622 | 155 | 290 | 160 | 3,500 | Good |
| LMFP | 160 | 285 | 135 | 4,500 | Moderate |
| LFP | 145 | 260 | 130 | 6,000 | Weaker below 0 °C; needs heating |
| Sodium-ion (outlook) | 115 | 210 | 125 | 4,000 | Very good |
| Solid-state (outlook) | 250 | 500 | 200 | 2,000 | To be confirmed |

The thermal circuits in section 3 are described with components common to electric vehicles. No manufacturer-specific layout, calibration or internal control mechanism is implied by Figure 1.

### B. The winter sizing calculation

The comparison in Table 1 uses the 640 kWh battery and 157.5 Wh/kg pack density of the [Part 3 reference model](/writing/control-software-electric-trucks-part-3-business-case/). Its efficiency-improvement parameter *g* changes consumption by the factor $1/(1+g)$, and a battery that retains its original modelled range changes from $E_0$ to $E_0/(1+g)$. Thus the capacity removed is $E_0g/(1+g)$, rather than exactly $E_0g$. At a 2% average improvement this is 12.55 kWh, or about 80 kg. At 4% it is 24.62 kWh, or about 156 kg. Multiplying *g* by 1.5 gives winter cases of 18.64 kWh and 36.23 kWh (about 120 and 230 kg, respectively). A 3% parameter corresponds to 2.91% less energy use under this definition, so it is not the same as an exact 3% measured consumption reduction.

The 1.5 multiplier is a bounded *model choice*. The −10 °C bus analysis gives a heating share of roughly half of 2.5 kWh/km [16], and the passenger-car heat-pump study gives a 1.8 ratio of absolute thermal savings between −10 and −5 °C [17]. Neither is a long-haul truck comparison of winter and annual *total-vehicle* control savings. The truck data in Figure 4 mix field measurements [13, 14], passenger-car tests [1] and simulated drayage duty cycles [15]. Nordic telematics separately identify a water-film or snow penalty of 7–8 kWh/100 km [18]. The Part 4 winter and ageing results therefore depend on hypotheses to validate for the intended truck and route.

### C. Charging and ageing limits

A driver must take a 45-minute break after 4.5 hours of driving under the EU driving-time rules [19]. Some long-haul trucks accept up to about 750 kW on a megawatt charger [5], and around 30 minutes of charging can fit within a break [20]. Charger availability, battery temperature and the charging-power curve still limit the real stop. A shorter charge becomes paid time saved only if the stop delays the work. [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) counts only part of that time in its model.

The comparison in Figure 5 includes Part 4's additional effects but does not assign them to the Part 3 base case. Laboratory cell ageing depends on temperature and cycling conditions [12], so a modelled battery-health improvement is not a measured lifetime result for the tested trucks. The cost values exclude the development and validation cost of the software and are for a normalised reference truck, not a quoted price or a forecast for a fleet.

## References

1. AAA, Cold weather reduces electric vehicle range, 2019. https://newsroom.aaa.com/2019/02/cold-weather-reduces-electric-vehicle-range/
2. European Commission, Lorries, buses and coaches: CO₂ emission standards (Regulation (EU) 2019/1242 as amended by Regulation (EU) 2024/1610). https://climate.ec.europa.eu/areas-action/transport-decarbonisation/road-transport/lorries-buses-and-coaches_en
3. Daimler Truck, Mercedes-Benz Trucks hands over first series-produced eActros 600 to customers in Germany, December 2024. https://www.daimlertruck.com/en/newsroom/pressrelease/mercedes-benz-trucks-hands-over-first-series-produced-eactros-600-to-customers-in-germany-52938275
4. electrive, Volvo Trucks boosts net battery capacity to record level, June 2026. https://www.electrive.com/2026/06/11/volvo-trucks-boosts-net-battery-capacity-to-record-level/
5. electrive, New generation MAN eTGX unveiled with 720 km range, September 2026. https://www.electrive.com/2026/09/14/new-generation-man-etgx-unveiled-with-720-km-range/
6. Scania, Scania enables electric long-haul with up to 720 km range. https://www.scania.com/group/en/home/newsroom/press-releases/press-release-detail-page.html/5424916-scania-enables-electric-long-haul-with-up-to-720-km-range
7. Upply Market Insights, Transport routier français : le bilan 2023 révèle l'érosion des marges (Banque de France data), 2024. https://market-insights.upply.com/fr/transport-routier-fran%C3%A7ais-le-bilan-2023-revele-lerosion-des-marges
8. European Commission, Weights and dimensions (Directive 96/53/EC as amended, including Regulation (EU) 2019/1242). https://transport.ec.europa.eu/transport-modes/road/weights-and-dimensions_en
9. BloombergNEF, Lithium-ion battery pack prices fall to $108 per kilowatt-hour despite rising metal prices, December 2025. https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/
10. ICCT, A total cost of ownership comparison of truck decarbonization pathways in Europe, 2023. https://theicct.org/publication/total-cost-ownership-trucks-europe-nov23/
11. Optimization of thermal and structural design in lithium-ion batteries to obtain energy-efficient battery thermal management system: a critical review, *Archives of Computational Methods in Engineering*, 2022. https://doi.org/10.1007/s11831-021-09571-0
12. Y. Preger et al., Degradation of commercial lithium-ion cells as a function of chemistry and cycling conditions, *Journal of The Electrochemical Society*, 167, 120532, 2020. https://doi.org/10.1149/1945-7111/abae37
13. J. Le Corguillé, F. Hacker, K. Göckeler, M. Mottschall, T. Dolinga, Real-world data analysis of energy consumption, activity and charging patterns of battery electric trucks operating in Germany, Öko-Institut, 2025. https://www.oeko.de/fileadmin/oekodoc/Real-world-data-analysis-of-battery-electric-trucks.pdf
14. M. Vehviläinen et al., Setting up and operating electric city buses in harsh winter conditions, *Applied Sciences*, 12(6), 2762, 2022. https://doi.org/10.3390/app12062762
15. Shiledar et al., Assessing geographical and seasonal influences on energy efficiency of electric drayage trucks, arXiv preprint 2504.02575, 2025. https://arxiv.org/abs/2504.02575
16. D. Göhlich, T.-A. Fay, D. Jefferies, E. Lauth, A. Kunith, X. Zhang, Design of urban electric bus systems, *Design Science*, 4, e15, 2018. https://doi.org/10.1017/dsj.2018.10
17. P. Lokur, N. Murgovski, Energy-optimal thermal management of heat-pump battery electric vehicles, arXiv preprint 2605.29104, 2026. https://arxiv.org/abs/2605.29104
18. Hiltunen et al., Weather-aware energy prediction for battery electric trucks from fleet telematics and road weather data, SSRN preprint, 2026. https://doi.org/10.2139/ssrn.7602714
19. European Commission, DG MOVE, Driving time and rest periods (Regulation (EC) No 561/2006). https://transport.ec.europa.eu/transport-modes/road/social-provisions/driving-time-and-rest-periods_en
20. W. Shoman, S. Yeh, F. Sprei, P. Plötz, D. Speth, Battery electric long-haul trucks in Europe: Public charging, energy, and power requirements, *Transportation Research Part D*, 121, 103825, 2023. https://doi.org/10.1016/j.trd.2023.103825

*The comparisons use published vehicle studies, generalised thermal-system descriptions and a separate normalised-truck cost model. No employer-specific circuit, calibration or unpublished engineering result is disclosed.*
