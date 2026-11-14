---
title: "How thermal limits set the battery size of an electric truck"
seoTitle: "Thermal limits on electric truck battery size"
subtitle: "How thermal limits set the battery size of an electric truck"
description: "How cold-weather energy demand and battery limits set an electric truck's range, mass and cost, and how thermal control can change the capacity required."
teaser: "How thermal limits set an electric truck's battery size, payload and cost."
publishDate: 2026-11-02
updatedDate: 2026-11-14
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

## A winter route decides the battery carried all year

To size the battery for an electric truck, start with the cold, fully loaded route it must complete near the end of its working life. Heating draws energy from the same battery that drives the wheels. In one passenger-car test, the loss of range in the cold reached around 40% [1]. A long-haul electric truck carries a 600–800 kWh battery weighing roughly 4–5 tonnes. **The battery is therefore sized for a difficult day, but its mass and purchase cost are carried on every day.**

The battery must provide energy for traction and heating, accept power at charging stops and deliver the required power in the cold. The thermal management system regulates its temperature, whilst its control software decides when to heat, cool or recover heat. In my work on electric trucks, predictive and optimisation-based thermal control reduced total vehicle energy use by 2–4% against production feedback control in truck tests across −30 to 40 °C. That result gives the physical starting point for this series. It does not, by itself, prove how much battery a manufacturer can remove.

The sizing question follows a chain: freight and route requirements set the range, temperature changes the energy available for it, and control changes how much the thermal system consumes. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) develops the control methods, [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) converts the saving to the haulier's cost per tonne-kilometre, and [Part 4](/writing/control-software-electric-trucks-part-4-design/) examines what happens when the saving is known before the truck is specified.

## 1. Battery capacity trades range against mass and cost

European heavy-duty vehicle CO₂ standards require manufacturers to cut average emissions of new vehicles by 45% in 2030, 65% in 2035 and 90% in 2040 [2]. Series-produced electric long-haul trucks from Mercedes-Benz, Volvo, MAN and Scania offer approximately 500–720 km of range under their respective stated conditions [3–6]. For the operator, the question is whether a truck completes its own route with the available charging and cargo. Its cost per tonne-kilometre is the cost of moving one tonne of freight over one kilometre. In 2022–2023, French road hauliers made pre-tax margins of only 1.4–2.2% [7], so the cost and payload of a battery matter alongside range.

The route, the load, charging opportunities, weather and battery ageing set the capacity required at the end of the truck's working life. On a weight-limited trip, extra battery mass displaces freight. The EU permits zero-emission trucks up to 2 tonnes of additional gross weight [8], but that allowance does not cancel the weight of a long-haul pack. Figure 1 illustrates the connection between these constraints and the thermal control decisions. Its return arrow represents a design possibility: a validated saving can change the battery specification if it is known early enough.

<figure class="article-figure article-figure--inspect-mobile" style="--figure-inspect-width: 1050px">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect the diagram, or <a href="/images/blog/control-software-electric-trucks/part1-fig1-battery-dimensioning.svg" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 1: scroll horizontally to inspect the battery-sizing diagram">
		<img src="/images/blog/control-software-electric-trucks/part1-fig1-battery-dimensioning.svg" width="1050" height="560" alt="Route and weather, payload, cost and an eight-year-old battery constrain its size. Thermal hardware controls battery temperature; software selects operating modes and can feed a validated energy saving back into battery sizing." loading="lazy" />
	</div>
	<figcaption>Figure 1. Battery-sizing constraints and the thermal-control feedback path. The dashed arrow indicates software commands to thermal hardware. The orange arrow is the possible effect of improved control on battery sizing. The arrangement is a general illustration, not a specific manufacturer's circuit.</figcaption>
</figure>

The diagram puts the thermal system between the operating battery and the sizing decision. A smaller battery follows from the orange arrow only if the energy saved is available in the conditions that set capacity. Otherwise, the same control improvement gives the existing truck more range, but does not reduce its purchase price.

Pack prices average about $108/kWh across battery applications [9]. The commercial-vehicle range used for the illustration below is 150–220 €/kWh [10]. Pack mass and cost are plotted against capacity in Figure 2 using illustrative pack densities of 145 and 175 Wh/kg and that commercial-vehicle price range. These are comparison bounds, not measurements of one truck.

<figure class="article-figure article-figure--inspect-mobile article-figure--print" style="--figure-max: 52rem; --figure-inspect-width: 1050px">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect both plots, or <a href="/images/blog/control-software-electric-trucks/part1-fig2-mass-cost-vs-capacity.png" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 2: scroll horizontally to inspect pack mass and cost">
		<img src="/images/blog/control-software-electric-trucks/part1-fig2-mass-cost-vs-capacity.png" width="3125" height="1563" alt="Two line plots. At 600–800 kWh, assumed pack densities of 145–175 Wh/kg give 3.4–5.5 tonnes; at 150–220 euros per kWh, pack cost is 90,000–176,000 euros." loading="lazy" />
	</div>
	<figcaption>Figure 2. Pack mass (a) and cost (b) versus capacity. Mass bounds use assumed LFP (145 Wh/kg, solid) and NMC811 (175 Wh/kg, dashed) pack densities. Cost bounds use 220 €/kWh (solid) and 150 €/kWh (dashed) [10]. The shaded band marks 600–800 kWh. The dotted line marks the 2-tonne gross-weight allowance [8].</figcaption>
</figure>

Across the plotted bounds, 600–800 kWh requires 3.4–5.5 tonnes of pack and 90,000–176,000 € of pack expenditure. One additional kilowatt-hour adds 5.7–6.9 kg and 150–220 €. The 2-tonne allowance covers only 36–58% of that modelled long-haul pack mass, so its remaining mass can reduce payload on weight-limited work. The exact pack price depends on procurement and chemistry. A capacity decision therefore has both a purchase-cost and a freight consequence.

## 2. Battery temperature changes range, charging and life

Lithium-ion cells have a preferred operating window of roughly 15–35 °C [11]. Below it, the battery supplies less power and accepts less charging power. Heating restores capability, but uses energy from the same battery that must complete the route. Above the window, fast charging and high loads require cooling, whilst high cell temperature accelerates ageing [12]. Ageing reduces usable capacity, so the route must remain possible after years of use, not only when the pack is new.

Temperature affects the battery through these three paths, illustrated in Figure 3. It is a qualitative operating guide, not a plot of measured capacity or an instruction to keep every cell at one exact set-point.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part1-fig3-temperature-window-mobile.svg" width="360" height="535" />
		<img src="/images/blog/control-software-electric-trucks/part1-fig3-temperature-window.png" width="3125" height="991" alt="Qualitative temperature scale from −30 to 50 °C. Below the preferred 15–35 °C window, power and charging power fall; above it, cooling and control of ageing become more demanding." loading="lazy" />
	</picture>
	<figcaption>Figure 3. Qualitative effect of lithium-ion cell temperature on available power, charging and ageing. Grey lines delimit the approximate preferred window [11]. The cold and hot regions show different constraints. Cell ageing evidence is described in [12].</figcaption>
</figure>

The cold side of Figure 3 limits both departure power and fast charging. The hot side calls for heat removal and affects the capacity left after repeated use. Lithium iron phosphate (LFP) and nickel manganese cobalt (NMC) cells have different density and cold-weather characteristics, but no one chemistry eliminates the temperature constraint. The illustrative assumptions behind the mass bounds in Figure 2, and their limits, are listed in Appendix A.

For battery sizing, temperature changes both sides of the calculation: the route can demand more energy on a cold day, whilst the battery may provide less of its nominal energy and charge more slowly. A thermal controller can reduce heating electricity and prepare the pack for a stop. Its benefit depends on which of those losses the hardware can actually address.

## 3. Connected thermal circuits give the controller choices

A truck's thermal system serves the battery, the electric drivetrain and the cab. Liquid circuits move heat between components. Pumps set coolant flow, valves select flow paths, and radiators reject heat. A refrigerant circuit can cool below ambient temperature or operate as a heat pump to supply heat. These components are common to electric vehicles, although their arrangement varies between manufacturers.

The source of winter heat determines a large part of the electricity used by the system. Under favourable conditions, a heat pump supplies roughly two to three units of heat for one unit of electricity. An electric resistance heater supplies one unit for one. The heat pump's ratio, called the *coefficient of performance*, falls as outside temperature drops. The drivetrain also produces heat during operation. If that heat can reach the battery or cab, the truck can use less electrical heating.

Separate circuits keep each subsystem's operation straight-forward, but they cannot share that waste heat. Connected circuits make heat recovery possible at the cost of more valves, flow paths and operating modes. Control software must decide which components to connect, when to heat the pack before charging and when to cool it before a climb. If it selects the wrong path or starts too late, the additional hardware does not deliver its possible saving. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) explains feedback, optimisation-based control allocation and predictive control in more detail.

To decide which thermal circuits a truck needs, check the heat sources available on the route that sets the battery size. A heat pump's favourable-condition coefficient cannot be applied unchanged to a Nordic winter. The choice of circuits sets which strategies are possible, whilst the controller determines the energy they use under actual conditions.

## 4. Winter sets capacity whilst summer sets cooling

Cold weather increases energy demand as battery capability falls. The cab and the battery need heat. Denser air and stiffer tyres raise driving resistance, whilst the heat pump supplies less heat per unit of electricity. Only part of that extra demand can be reduced by thermal control. Figure 4 compares the reported winter effects for several electric vehicle types, with each source's metric and evidence type next to its marker. These are different duty cycles, not a measurement of one truck fleet.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part1-fig4-winter-penalty-mobile.svg" width="360" height="642" />
		<img src="/images/blog/control-software-electric-trucks/part1-fig4-winter-penalty.png" width="3125" height="1203" alt="Winter comparison with different metrics: tested car range loss about 40%; measured Finnish city-bus energy increase 40–45%; measured German regional-truck energy increase about 25% from 20 to 0 °C; simulated mild-climate drayage-truck increase 3–10%." loading="lazy" />
	</picture>
	<figcaption>Figure 4. Winter consumption increase or range loss by application. Passenger-car tests [1], German truck operating data [13], Finnish city-bus measurements [14] and mild-climate drayage-truck simulations [15] use different baselines and metrics. Bars indicate reported ranges and dots single values. These results do not give a truck-specific winter penalty.</figcaption>
</figure>

For the German trucks in Figure 4, measured consumption rose by about 0.13 kWh/km for each 10 °C drop, equivalent to roughly 25% more energy at 0 °C than at 20 °C for the regional trucks studied [13]. The Finnish buses used 40–45% more in winter than summer [14], whilst the simulated mild-climate drayage trucks differed by 3–10% [15]. Trucks whose batteries were preconditioned in the German data showed no clear temperature dependence [13]. Preconditioning is one possible explanation, but this observation does not isolate a controlled trial of the thermal software. A winter correction transferred from a bus, a car or a mild-climate drayage truck would therefore give the wrong battery-sizing input.

### The worst-case gain needs its own evidence

*Predictive control* uses the expected route and next charging stop to schedule heating, cooling and heat recovery. In winter it may heat the battery for charging when drivetrain waste heat is available. In summer it may cool the pack before a long climb or a fast-charging stop, using the battery's thermal mass to delay a temperature limit. Summer heat also increases battery ageing: laboratory tests of commercial cells found temperature-dependent calendar fade for several chemistries and increased LFP cycling fade between 15 and 35 °C [12]. Thus winter influences the capacity needed for a route, whilst summer influences cooling capacity and the usable battery left after years of service.

Evidence from other vehicles supports the *direction* of a larger absolute thermal saving in winter, but does not establish a multiplier for long-haul trucks. At −10 °C, one urban-bus analysis assigned about 24 kW to heating at 18 km/h, which is 1.3 kWh/km on top of 1.2 kWh/km for traction and other auxiliaries [16]. In a passenger-car heat-pump study, nonlinear model predictive control saved 20.2% of thermal energy at −5 °C and 27.8% at −10 °C against rule-based control. The absolute saving rose from 460 to 840 Wh, or about 1.8 times [17]. The bus and car figures refer to thermal loads and thermal energy, not the 2–4% reduction in *total truck energy* measured in my work.

For the sizing illustration, I use a winter efficiency improvement of 1.5 times the annual average. This is a modelling assumption below the car study's 1.8 ratio, not a result measured on a long-haul truck. In the 640 kWh reference truck of [Part 3](/writing/control-software-electric-trucks-part-3-business-case/), the effect is summarised in Table 1. The model defines an improvement *g* as new consumption equal to old consumption divided by $(1+g)$. At unchanged range, battery capacity falls by the same ratio. Therefore, a 2% improvement removes $640 \times 0.02/1.02$, or 12.5 kWh, not exactly 2% of 640 kWh. Appendix B gives the full calculation.

*Table 1. Modelled battery reduction when the same annual improvement is available in winter.*

| Annual average efficiency improvement | Sized on the annual average | Sized on 1.5× the average in winter |
| --- | ---: | ---: |
| 2% | 12.5 kWh / 80 kg | about 19 kWh / 120 kg |
| 4% | 25 kWh / 156 kg | about 36 kWh / 230 kg |

Table 1 shows about half as much battery again removed when the winter gain, rather than the annual average, determines capacity. This result requires evidence that the gain holds on the actual cold route and that battery modules can be resized at specification. Telematics from Nordic electric trucks also attribute 7–8 kWh/100 km to a water film or snow on the road [18]. Thermal control cannot remove that rolling-resistance penalty. Before you use a winter saving in a battery specification, separate heating from the road and route effects in the data.

## 5. A small energy saving can change the truck's economics

A smaller battery makes a truck lighter and reduces its traction energy slightly. For the reference vehicle, [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) calculates a physical feedback of about 1.07 times the original saving. The battery is only about an eighth of the operating mass, and aerodynamic drag does not fall with mass. Most of the additional *value* therefore comes from what a smaller battery costs and, on weight-limited work, the freight its mass frees.

In the normalised truck used in [Part 3](/writing/control-software-electric-trucks-part-3-business-case/), the battery is about 32% of the purchase price. The model values less electricity, reduced battery cost, possible extra payload and paid time at the charger separately. It gives 5,500–21,500 € per truck over eight years for its 2–4% improvement scenarios, or 1.23–2.46 times the electricity saved, depending on how the gain is used. The charging-time and ageing limits are detailed in Appendix C. A truck already built keeps its pack: in the trucks analysed in Part 3, removing a whole battery module would require at least a 12% improvement. Thus the hardware and payload channels belong to a new vehicle or a selectable battery variant, not to an automatic retrofit saving.

Figure 5 plots these value multiples for a *3% modelled efficiency improvement*, which under the model's definition means about 2.9% less energy use. They are the ratios of the respective model scenarios to electricity saved, not the percentages by which a truck's total cost of ownership falls.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part1-fig5-value-multiplier-mobile.svg" width="360" height="646" />
		<img src="/images/blog/control-software-electric-trucks/part1-fig5-value-multiplier.png" width="3125" height="1234" alt="For a 3% modelled gain, value relative to electricity saved is 1.00 times for electricity alone, 1.07 with lighter-battery energy feedback, 1.23–2.46 with economic channels and 3.25–4.58 when further design effects are included." loading="lazy" />
	</picture>
	<figcaption>Figure 5. Modelled value of a 3% efficiency improvement divided by the electricity saving in the reference long-haul truck. The diamonds mark Part 3's operating scenarios and Part 4's design cases. The bars span their ranges, and the dotted line marks electricity alone. The Part 4 cases add winter sizing and other design effects and are separate from Part 3's base scenarios.</figcaption>
</figure>

The value moves from 1.00 to 1.07 times with battery-mass feedback, then to 1.23–2.46 times with the haulier's cost and freight channels. [Part 4](/writing/control-software-electric-trucks-part-4-design/) models additional design levers, including winter sizing and slower ageing, raising that *modelled* value to 3.25–4.58 times. Those higher ratios depend on assumed winter performance and ageing, so they cannot be inferred from the 2–4% truck test alone. In particular, extra freight is revenue, not a reduction in total cost of ownership.

## Summary and conclusions

The route must remain achievable with a cold or aged battery and with the charging stops available to a haulier. In the 600–800 kWh illustration, pack mass is 3.4–5.5 tonnes and pack cost is 90,000–176,000 €. Battery temperature alters available power, fast charging and ageing, whilst heating the cells consumes energy needed for the same route. A better thermal control strategy has value only where the hardware gives it choices of heat source, flow path and timing.

In my truck work, predictive and optimisation-based thermal control reduced total vehicle energy use by **2–4% against production feedback control in tests across −30 to 40 °C**. In the sizing model, *assuming* the winter improvement is 1.5 times the annual average changes the 640 kWh reference truck's possible battery reduction from 12.5–25 kWh to about 19–36 kWh. That multiplier comes from bus and car evidence for thermal demand and saving, not a truck test of the winter multiplier. The road surface, the route and whether the battery can be resized remain independent constraints.

For the reference truck, [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) values the improvement at **5,500–21,500 € over eight years**, depending on how the vehicle is used and specified. [Part 4](/writing/control-software-electric-trucks-part-4-design/) evaluates additional winter and battery-life assumptions separately. A technical lead can begin with one cold-route test against the production controller, separating heating energy from rolling resistance, before allowing a control gain to change the battery specification.

## Appendix: assumptions and source boundaries

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

The thermal circuit in section 3 is described with components common to electric vehicles. No manufacturer-specific layout, calibration or internal control mechanism is implied by Figure 1.

### B. The winter sizing calculation

The comparison in Table 1 uses the 640 kWh battery and 157.5 Wh/kg pack density of the [Part 3 reference model](/writing/control-software-electric-trucks-part-3-business-case/). Its efficiency-improvement parameter *g* changes consumption by the factor $1/(1+g)$, and a battery that retains its original modelled range changes from $E_0$ to $E_0/(1+g)$. Thus the capacity removed is $E_0g/(1+g)$, rather than exactly $E_0g$. At a 2% average improvement this is 12.55 kWh, or about 80 kg. At 4% it is 24.62 kWh, or about 156 kg. Multiplying *g* by 1.5 gives winter cases of 18.64 kWh and 36.23 kWh (about 120 and 230 kg, respectively). A 3% parameter corresponds to 2.91% less energy use under this definition; it must not be substituted as an exact 3% measured consumption reduction.

The 1.5 multiplier is a bounded *model choice*. The −10 °C bus analysis gives a heating share of roughly half of 2.5 kWh/km [16], and the passenger-car heat-pump study gives a 1.8 ratio of absolute thermal savings between −10 and −5 °C [17]. Neither is a long-haul truck comparison of winter and annual *total-vehicle* control savings. The truck data in Figure 4 mix field measurements [13, 14], passenger-car tests [1] and simulated drayage duty cycles [15]. Nordic telematics separately identify a water-film or snow penalty of 7–8 kWh/100 km [18]. The Part 4 winter and ageing results therefore depend on hypotheses to validate for the intended truck and route.

### C. Charging and ageing limits

A driver must take a 45-minute break after 4.5 hours of driving under the EU driving-time rules [19]. Some long-haul trucks accept up to about 750 kW on a megawatt charger [5], and around 30 minutes of charging can fit within a break [20]. Charger availability, battery temperature and the charging-power curve still limit the real stop. A shorter charge becomes paid time saved only if the stop delays the work. [Part 3](/writing/control-software-electric-trucks-part-3-business-case/) counts only part of that time in its model.

The comparison in Figure 5 includes Part 4's additional effects but does not assign them to the Part 3 base case. Laboratory cell ageing depends on temperature and cycling conditions [12]; a modelled battery-health improvement is not a measured lifetime result for the tested trucks. The cost values exclude the development and validation cost of the software and are for a normalised reference truck, not a quoted price or a forecast for a fleet.

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
