---
title: "Control software performance as a vehicle design input"
subtitle: "Control software performance as a vehicle design input"
seoTitle: "When control software changes vehicle sizing"
description: "A model of seven electric trucks and buses shows how validated thermal-control performance can change battery sizing, charging and lifetime value."
teaser: "Why the timing of a control gain determines which hardware benefits a vehicle can capture."
publishDate: 2026-11-02
updatedDate: 2026-11-17
readingTime: 17 min read
category: Physical Systems Engineering
tags:
  - Electric trucks
  - Vehicle design
  - Sensitivity analysis
  - Control software
  - V-model
keyFigure:
  value: "21,600–30,500 €"
  label: "modelled value of a 3% gain per long-haul truck over 8 years when considered during design"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part4-social.png"
  alt: "Part 4 of 4. Control software performance as a vehicle design input. A 3% gain is worth 21,600–30,500 euros per truck over eight years in the model with further design assumptions."
featured: false
draft: false
series:
  id: control-software-electric-trucks
  part: 4
---

The battery and thermal hardware of an electric truck are chosen before its final control software can be tested on the vehicle. The battery must still cover the cold, fully loaded route near the end of its life, as [Part 1](/writing/control-software-electric-trucks-part-1-context/) shows. A gain discovered after the specification is frozen saves electricity in service, but it cannot recover the capacity already installed. **Used early enough to inform the design, a 3% average energy gain is worth 21,600–30,500 € per long-haul truck over eight years in my extended cost model.** The same gain is worth about 8,100 € when the battery is kept.

[Part 3](/writing/control-software-electric-trucks-part-3-business-case/) compared that battery-kept truck (A) with two designs that use the *average* gain to specify a smaller battery, for mixed freight (B) and heavy freight (C). Here I extend the same model to ask what a larger saving in the worst-case conditions, slower battery ageing and other possible control effects would add to B and C. Those further effects are design assumptions that have not been measured on trucks.

The sequence of specification and verification is illustrated in Figure 1 using the automotive V model, under Automotive SPICE [1] and ISO 26262 [2]. The left side fixes the requirements and hardware, and the vehicle tests sit on the right. To use predicted control performance for sizing, its worst-case effect must be supported before the left-side decisions are closed, then checked as the vehicle is developed.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part4-fig1-v-model-mobile.svg" width="360" height="760" />
		<img src="/images/blog/control-software-electric-trucks/part4-fig1-v-model.png" width="2172" height="1200" alt="V-model of vehicle development: hardware is sized before control-software vehicle tests. At a 3% average gain, modelled eight-year value is about 8,100 euros with the battery kept, 12,200 to 16,300 euros with average-gain sizing, and 21,600 to 30,500 euros when further assumed design effects are included." loading="lazy" />
	</picture>
	<figcaption>Figure 1. Thermal control in the vehicle-development V model. Blue is the battery-kept case A after late tests. Orange uses predicted worst-case performance in system sizing, with further assumed effects. Values are model results for a long-haul truck over eight years at a 3% average gain. Part 3's B and C already include battery sizing for the average gain.</figcaption>
</figure>

The B and C values in Figure 1 already include average-gain battery sizing, so only the step from them to the orange case comes from *further* assumed design effects at the reference conditions. Those effects act through hardware decisions.

## 1. Hardware decisions that thermal control can change

Thermal control can change a hardware decision only if its behaviour is known before that decision is taken. Table 1 lists five such decisions, with the mechanism and the condition for each. **Because the conditions differ, an average energy saving alone says nothing about the heating peak, the ageing rate or the usable capacity.**

*Table 1. Design decisions affected by thermal control.*

| Decision | Mechanism and condition |
| --- | --- |
| Battery capacity | Lower consumption on the route that sets the range requirement permits a smaller pack, provided its reserve, power and charging needs still hold. |
| End-of-life margin | Better cell-temperature control can slow ageing, leaving more usable capacity after years of service, if the temperature and cycling evidence supports it. |
| Thermal hardware | Lower *peak* heating or cooling demand can reduce heater, compressor or radiator size. A lower average alone cannot. |
| Charging specification | Preconditioning can raise the power the battery accepts at a stop, but uses energy and only shortens the stop when the battery is the limit. |
| Battery operating limits | Better temperature control may increase capacity available *within* limits set by the safety concept. The limits themselves are not relaxed. |

The first two decisions determine battery size, and the next two affect component cost and charging time. I keep the last one switched off in the model, because safety-related limits need their own justification under the safety concept [2]. Battery size is the largest of the decisions. It depends on the saving on the route that sets the range, and that saving can differ from the average.

### Battery sizing uses the worst-case saving

[Part 2](/writing/control-software-electric-trucks-part-2-engineering/) reports a 2–4% reduction in *total truck energy* against well-tuned conventional thermal control, tested on trucks at −30 to 40 °C. I use that vehicle-level gain for electricity costs. For the reference long-haul truck, I set the average to 3%. **Battery sizing, however, uses the cold, loaded route, so I set the *worst-case gain* on that route to 1.5 times the average, or 4.5%.** No truck measurement of this factor exists, so I vary it from 1 to 2.

The factor is above one because heating and battery conditioning take a larger share of the energy in the cold, which gives thermal control more to influence. Truck studies point in the same direction, with up to 7% more range from heating strategies at −20 °C [3] and 4.4–6.6% more range from motor waste-heat recovery at 0 to −20 °C [4]. Neither measures this model's worst-case *total-energy* gain, because a saving in one thermal function cannot be substituted for a percentage of total vehicle energy.

This worst-case gain enters the sizing because the battery must provide the original worst-case range at its end of life. Required capacity therefore follows consumption on the dimensioning route and remaining battery health. A smaller pack changes mass and cycling, so the model recalculates capacity, mass and ageing together. The result is only a sizing candidate. Long-haul pack studies also consider the route and the charging strategy together [5]. Before a winter gain removes any battery capacity, the route, load, reserve, charging power and end-of-life capacity have to be checked against the *same* conditions.

### Ageing, charging and hardware gains are model assumptions

The reference calculation assumes 10% slower battery fade, 3% more effective charging power from preconditioning and 1,000 € less thermal hardware per truck. Published results support the direction of two of them. A laboratory study found three times more degradation after 260 cycles at 55 °C than at 25 °C [6], and a fast-charging study reported 4.5% less charging time with predictive battery thermal management [7]. However, neither calibrates these effects on this truck.

The ageing and hardware gains hold only if the temperature history and the peak loads change in the required direction. Appendix A lists the reference values and the ranges tested.

## 2. What the gain is worth when considered during design

The extended model first has to reproduce Part 3 on the European long-haul reference truck. With the new effects off, at a 3% average gain over eight years, it gives about 8,100 € with the battery kept, 12,200 € for mixed freight and 16,300 € for heavy freight. The electricity saved is about 6,600 € in all three. I then add the further effects one at a time, keeping the other inputs at their reference values. The cumulative values for mixed and heavy freight are plotted in Figure 2.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part4-fig2-lever-stack-mobile.svg" width="360" height="960" />
		<img src="/images/blog/control-software-electric-trucks/part4-fig2-lever-stack.png" width="3125" height="1416" alt="Cumulative model value of a 3% average gain per long-haul truck over eight years. Starting with average-gain battery sizing at 12,200 euros for mixed freight and 16,300 euros for heavy freight, further assumed sizing, ageing, charging and hardware effects bring the totals to 21,619 and 30,454 euros. The battery reduction grows from 19 to 40 kWh." loading="lazy" />
	</picture>
	<figcaption>Figure 2. Cumulative eight-year model value for the same long-haul truck as further design effects are added to Part 3's average-gain battery sizing. Blue is mixed freight, orange heavy freight. Labels give each step's increment. The grey line gives the battery capacity saved, and the dotted line marks electricity saved alone. Other inputs remain at their reference values.</figcaption>
</figure>

With mixed freight, the steps raise value from about 12,200 to 21,600 €, or 9,400 € more. With heavy freight, they raise it from 16,300 to 30,500 €, or 14,200 € more. Worst-case sizing adds about 2,100–4,200 €, slower ageing about 2,700 €, and sizing explicitly for end of life about 2,300–4,700 €, depending on the freight case. Mass feedback, preconditioning and smaller thermal hardware supply the remainder. These additions to B and C are calculated at *reference conditions*, and their uncertainty is discussed with Figure 4.

The modelled battery reduction grows from 19 to 40 kWh, equivalent to about 255 kg at the final step, and on weight-limited work that mass can carry freight. **In total, the value is 3.3–4.6 times the electricity saved and 2.0–2.8% of the eight-year total cost of ownership (TCO) of the reference truck.** Part of it is *freight revenue*, which does not lower the TCO, so its effect shows in the cost per tonne-kilometre instead. For mixed freight, this cost falls by 2.0% with the further effects, compared with 1.2% under average-gain sizing.

### Which inputs move the result most

Figure 2 adds the effects in one order and at their reference values. A one-input-at-a-time sensitivity calculation for the mixed-freight B case, starting at 12,215 € with the further effects off, shows which inputs matter most. Across their chosen ranges, the average gain swings the value by 7,900 € and slower ageing in sizing by 7,726 €. An electricity price from 0.15 to 0.35 €/kWh swings it by 6,317 €. **Five of the eleven largest swings come from software-dependent inputs.** The ranking shows how far the *chosen ranges* move the model. It carries no information about how likely each change is.

The software inputs rank this high because they act on a different quantity. Electricity price sets the value of each kilowatt-hour saved. A validated sizing gain changes the battery capacity as well. After the battery is installed, that path closes and electricity price ranks first. In my view, the large possible ageing effect calls for temperature and cycle histories before it enters the sizing decision. Appendix B distinguishes this ranking from the uncertainty calculation.

## 3. Distance and payload set the value across applications

The same assumed control gain is valued differently when the vehicle's distance, payload and charging pattern change. I evaluated seven applications in Nordic, Central and Southern European conditions: four kinds of truck, a coach and two city-bus charging concepts. In Central Europe I assign 3.0% average gain to long-haul, regional and construction trucks and 3.5% to urban trucks and buses. The 0.5-point difference and the climate shift of −0.5 or +0.5 percentage points are assumptions. The measured 2–4% vehicle-energy gain comes from trucks only.

The higher bus gain rests on the larger thermal demand of buses. Winter bus consumption was 40–45% higher in a Tampere study [8], and air-conditioning cut summer range by 15–20% in a Valencia study [9]. Both studies measure thermal demand. Neither measures a vehicle-level gain from control, so the 3.5% for buses remains my assumption. Electricity prices also differ. Long-haul charging costs 0.22 €/kWh in the model, from the ICCT [10], and the prices for the other applications are assumptions. The resulting lifetime values, with the battery kept and designed in, are compared in Figure 3.

<figure class="article-figure article-figure--inspect-mobile" style="--figure-inspect-width: 1050px">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect the plot, or <a href="/images/blog/control-software-electric-trucks/part4-fig3-value-by-application.png" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 3: scroll horizontally to inspect the chart">
		<img src="/images/blog/control-software-electric-trucks/part4-fig3-value-by-application.png" width="3125" height="1593" alt="Seven applications compared with battery kept versus designed in. Central European lifetime model values rise from 8,100 to 21,600 euros for long-haul trucks, 4,700 to 13,200 for regional, 2,900 to 8,900 for urban, 5,000 to 19,600 for construction, 11,100 to 27,000 for coaches, 5,400 to 18,800 for depot buses and 8,700 to 21,800 for opportunity-charged buses. Vertical whiskers cover assumed Southern to Nordic climates." loading="lazy" />
	</div>
	<figcaption>Figure 3. Total model value per vehicle over its own service life, with the battery kept (open symbols) or the further design effects included (filled symbols) in Central Europe. Whiskers give the designed-in values under assumed Southern and Nordic climates. Labels in the plot give the value as a multiple of the electricity saved and per year of service. Applications have different lifetimes.</figcaption>
</figure>

**Long-haul trucks and coaches travel farther than the other vehicles in Figure 3, so each percent they save has more value.** On shorter routes, payload sets the multiplier instead. A construction truck reaches 19,600 € designed in, or 5.0 times the electricity saved, because a lighter battery leaves room for paid cargo. The *assumed* climate gain moves the value less, changing long-haul value from 19,300 € in Southern Europe to 23,900 € in Nordic countries, against 21,600 € in Central Europe. Those gains have not been measured across these climates and applications.

For buses, the charging concept decides the channel. In the model, a depot bus must cover the whole winter day, so it carries a large battery. A 3.5% average gain with further design effects removes 39 kWh and 260 kg of that battery and gives 18,800 € over 12 years. The 260 kg corresponds roughly to four passenger places on a full bus, although the model assigns no additional revenue to that illustration. An opportunity-charged bus, by contrast, has a smaller pack and charges at route ends. Its battery-kept value is 8,700 €, against 5,400 € for the depot bus, because charging time has a larger role. Bus cost is reported per *vehicle*-kilometre, since operators are commonly paid by distance.

### Charging time depends on what limits power

Part 3 counted shorter charging stops as a benefit of a smaller battery. A smaller pack requires fewer kilowatt-hours to recharge, but it may also accept less power. When the charger or the truck sets the power limit, less energy shortens the stop. When the battery sets it, reducing the pack can reduce power in similar proportion. The hours saved over the vehicle life for a 3% gain are listed in Table 2 for four modelled charging regimes.

*Table 2. Modelled charging hours saved over the vehicle life for a 3% gain.*

| Vehicle and charging regime | Limiting element | Hours saved |
| --- | --- | ---: |
| Long-haul truck, 400 kW charger (8 years) | Charger | 93 h |
| Long-haul truck, 1,000 kW charger, truck accepts 750 kW (8 years) | Truck | 50 h |
| Future long-haul truck accepting 1,200 kW (8 years) | Battery | 2 h |
| City bus, 450 kW opportunity charger (12 years) | Charger, close to the limit | 71 h |

The 93 h and 2 h cases show the limit of inferring charging-time value from battery capacity alone. The truck limit in the second row already applies today, since a current truck accepts about 750 kW on a megawatt charger [11]. Battery temperature can impose another limit. In light-duty charging data, a 30-minute stop at 0 °C delivered 22–36% less charge than at 25 °C [12]. Preconditioning may restore some of that power, but it consumes energy, so its net route benefit must include both the shorter stop and the energy spent preparing the battery.

## 4. The value range when inputs vary together

The one-at-a-time swings in Appendix B do not show what happens when inputs move together. I therefore ran 5,000 combinations, uniformly sampling the specified market, vehicle and software bounds. Uniform sampling covers the *assumed ranges* evenly and carries no information about real fleets. Figure 4 plots the 10th percentile (P10), median and 90th percentile (P90) of *total* lifetime model value for battery-kept and fully designed-in cases.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part4-fig4-monte-carlo-mobile.svg" width="360" height="836" />
		<img src="/images/blog/control-software-electric-trucks/part4-fig4-monte-carlo.png" width="3125" height="1200" alt="P10 to P90 intervals and medians of total model value from 5,000 uniformly sampled combinations. Long-haul battery kept: 8,100 to 16,600 euros, median 11,800. Long-haul designed in: 14,100 to 28,600 euros with mixed freight, median 20,200, and 19,300 to 39,300 euros with heavy freight, median 28,200. Depot bus designed in: 10,200 to 20,800 euros, median 14,900. The long-haul intervals overlap." loading="lazy" />
	</picture>
	<figcaption>Figure 4. P10 to P90 (whiskers) and median (symbols) of total model value per vehicle over its life from 5,000 combinations sampled uniformly over selected input ranges. The dashed line marks the battery-kept long-haul median. Each case total is computed separately, so the plot gives no percentiles for the additional benefit over Part 3's B and C.</figcaption>
</figure>

The long-haul median is 11,800 € with the battery kept, 20,200 € designed in for mixed freight and 28,200 € for heavy freight. Even the designed-in mixed-freight P10 of 14,100 € exceeds the battery-kept median, but the distributions overlap: the battery-kept P90 is 16,600 €. **Across all 5,000 battery-downsizing cases, including the lowest-value one, total value exceeds 1.5 times the electricity saved.** That bound covers every run, including those below the P10 shown in Figure 4.

However, Figure 4 gives total values only. The roughly 9,400 and 14,200 € *increments* in Figure 2 were calculated at the reference conditions, and their uncertainty has not been calculated. Subtracting separate percentile totals would not supply it. A B or C value and its fully designed-in counterpart would first have to be evaluated with the *same* sampled inputs, and only then could the differences be summarised [13]. Those paired outputs are unavailable. The range in Figure 4 therefore supports a comparison of total values under the chosen bounds, but no probability claim about the benefit of the extra effects over B or C.

## 5. Evidence needed before hardware freeze

The extra design value rests on assumptions, so it can be used only if evidence for them exists when the hardware is decided. The vehicle programme sets its routes, payload, chargers and battery chemistry. Six other parameters depend on the thermal control strategy. Four concern the battery (worst-case consumption, temperature and ageing, charging acceptance, and usable capacity within the safety concept), and two the thermal hardware (peak heating and cooling demand, and the component size chosen for it). The controller influences each of these, but cannot choose the vehicle's duty or its available chargers.

System sizing needs evidence for the first four before the battery specification is frozen. A smaller pack must still cover the cold, loaded route at end of life and accept the required charging power. Thermal design needs the last two, because a reduction in *average* energy does not prove that the heater, compressor or radiator can be smaller if their peak demand stays the same. **Once the hardware is fixed, control can still save operating energy, but cannot recover the mass and purchase cost of a battery pack already installed.** In one thermal system I worked on, a radiator was added alongside the heat pump for extreme conditions. Vehicle tests showed that the heat pump alone covered them, but the radiator, with its valve, control logic and production cost, was removed only in the next generation.

I would start with the dimensioning route and its worst-case range requirement. Baseline and proposed control are compared against that requirement, including the reserves and the charging opportunities along the route. The peak thermal load and the temperature and cycle histories come next, because the hardware and ageing decisions depend on them. Charging-time value enters the buyer's metric only after the element that limits charging power is known and the preconditioning energy is counted.

Only the 2–4% vehicle-energy result in this model comes from truck tests. The worst-case factor, the slower ageing, the application and climate gains and the hardware effects are assumptions, and these checks exist to replace them. The value also excludes development and validation cost. Heavy-duty ageing work adds charging and storage conditions to what the ageing check must record [14].

## Summary and conclusions

With the battery kept, a 3% gain is worth about 8,100 € over eight years in the reference model. With assumed worst-case sizing, slower ageing, preconditioning and smaller thermal hardware, the value rises to **21,600–30,500 € per long-haul truck**, about 9,400–14,200 € beyond [Part 3](/writing/control-software-electric-trucks-part-3-business-case/)'s average-gain sizing cases, and the battery shrinks by 19–40 kWh. Across seven applications, the value follows distance and payload, and charging time counts only where the charger or the truck limits the power. The bus gains are extrapolated from truck measurements, no development cost is deducted, and the simulated ranges overlap without an interval for the increment over Part 3.

The predicted worst-case effect can therefore inform battery and hardware decisions only once range, ageing, peak-demand and charging-power evidence exists before the hardware freeze.

## Appendix: assumptions and sensitivity

### A. Sizing and reference inputs

The model compares one vehicle over its service life with and without the control gain. In the battery-kept case, its capacity stays fixed. In the design cases, the capacity is set so the *same dimensioning range* is available at the end of life. The rule is

$$
E_1 = E_0 \cdot \frac{c_{d,1}}{c_{d,0}} \cdot \frac{\mathrm{SoH}_0}{\mathrm{SoH}_1}
$$

Here $E_0$ and $E_1$ are original and redesigned battery capacity, $c_{d,0}$ and $c_{d,1}$ are consumption on the dimensioning route before and after the gain, and $\mathrm{SoH}_0$ and $\mathrm{SoH}_1$ are battery state of health at the end of life. Mass and cycling change when capacity changes, so the model iterates them to consistency. This assumes a selectable battery configuration. An existing fixed-pack truck cannot remove fractional packs.

*Table 3. Reference values and tested ranges for the design parameters.*

| Input | Reference | Range tested |
| --- | --- | --- |
| Average gain | 3.0–3.5% in Central Europe, by application | 2–4% |
| Worst-case gain | 1.5 × average | 1–2 × average |
| Slower ageing | 10% lower fade rate | 0–15% |
| Battery sized for end of life | On | On / off |
| Preconditioning | +3% effective charging power | 0–5% |
| Thermal operating limits | Off | 0–2 percentage points of usable capacity |
| Thermal hardware downsizing | 1,000 € per truck, 2,000 € per bus | 0–1,500 € |

Table 3 lists the reference value and tested range of each input. The gain changes by −0.5 percentage points for Southern Europe and +0.5 points for Nordic countries, giving application and climate cases from 2.5 to 4.0% average gain. The reference vehicle is the 640 kWh, 120,000 km/year long-haul truck of Part 3. Its long-haul electricity price is 0.22 €/kWh [10]. I assume 0.22 €/kWh for coaches, 0.20 €/kWh for regional and construction trucks, and 0.18 €/kWh for urban trucks and city buses. Money in the comparison is per vehicle over its life and is undiscounted. No cost of developing or validating the control software is subtracted.

### B. Sensitivity analysis of the design parameters

The one-at-a-time ranking uses Part 3's mixed-freight B case, 12,215 €, as its reference, with the further effects off. Each input is taken to the ends of its specified range whilst the others stay fixed. Figure 5 plots the resulting lifetime-value swing for each parameter. The orange bars mark the parameters that depend on thermal control.

<figure class="article-figure article-figure--inspect-mobile">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect the plot, or <a href="/images/blog/control-software-electric-trucks/part4-fig5-tornado.png" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 5: scroll horizontally to inspect the sensitivity chart">
		<img src="/images/blog/control-software-electric-trucks/part4-fig5-tornado.png" width="3125" height="1806" alt="Tornado chart around the 12,215 euro mixed-freight reference: average gain over 2 to 4% changes lifetime value by 7,900 euros, assumed slower ageing used in sizing by 7,726 euros, and electricity price over 0.15 to 0.35 euros per kWh by 6,317 euros. Orange bars identify control-dependent inputs, blue bars market and vehicle inputs; other bars are smaller under their selected ranges." loading="lazy" />
	</div>
	<figcaption>Figure 5. One-at-a-time sensitivity of eight-year value for the mixed-freight truck with a downsized battery (Part 3, B). The vertical line is the 12,215 € reference with the further design effects off. Bars span the specified input ranges with other inputs held fixed; labels give the total swing. Orange and bold labels indicate control-dependent inputs. The bars are model results and give no frequencies of real-world outcomes.</figcaption>
</figure>

The 2–4% average-gain range moves value by 7,900 €, assumed slower ageing used in sizing by 7,726 €, and an electricity price from 0.15 to 0.35 €/kWh by 6,317 €. The first two depend on control performance, yet their ranking changes with the vehicle's use: if the battery is kept, battery sizing no longer contributes and electricity price ranks first. These swings measure sensitivity to the *chosen ranges*. They give neither the likelihood of each outcome nor proof of the assumed ageing benefit.

The 5,000-run calculation instead changes selected market, vehicle and software inputs together. The plotted quantiles in Figure 4 are totals for each case. A paired test of the *increment* beyond B and C would require retaining a baseline and an extended result for every identical sampled input set [13]. The paired outputs have not been retained, so neither the quantile overlap nor a difference between medians gives an interval for that increment.

## References

1. VDA QMC, Automotive SPICE Process Reference and Assessment Model, version 4.0, 2023. https://vda-qmc.de/en/automotive-spice/
2. ISO 26262:2018, Road vehicles: Functional safety, Parts 1–12, International Organization for Standardization, 2018. https://www.iso.org/standard/68383.html
3. S. Ramesh Babu, S. Sebben, Z. Chronéer, S. Etemad, Heating-load strategies for battery-electric trucks in cold climates, *Thermal Science and Engineering Progress*, 2025. https://doi.org/10.1016/j.tsep.2025.103417
4. Song et al., Motor waste-heat recovery for battery heating in a heavy-duty electric truck, *Batteries*, 2024. https://doi.org/10.3390/batteries10090328
5. Park et al., Drive cycles, battery pack scaling, and usage considerations for long-haul and regional-haul electric trucks, *Journal of Power Sources*, 2026. https://doi.org/10.1016/j.jpowsour.2026.239662
6. F. Leng, C. M. Tan, M. Pecht, Effect of temperature on the aging rate of Li-ion battery operating above room temperature, *Scientific Reports* 5:12967, 2015. https://doi.org/10.1038/srep12967
7. Predictive battery thermal management for fast charging, *Automotive and Engine Technology*, 2025. https://doi.org/10.1007/s41104-025-00157-7
8. Vehviläinen, Lavikka, Rantala, Paakkinen, Setting up and operating electric city buses in harsh winter conditions, *Applied Sciences*, 2022. https://doi.org/10.3390/app12062762
9. Viana-Fons, Payá, HVAC energy in electric city buses in a Mediterranean climate, *Energy*, 2024. https://doi.org/10.1016/j.energy.2024.131151
10. ICCT, A total cost of ownership comparison of truck decarbonization pathways in Europe, 2023. https://theicct.org/publication/total-cost-ownership-trucks-europe-nov23/
11. electrive, New generation MAN eTGX unveiled with 720 km range, September 2026. https://www.electrive.com/2026/09/14/new-generation-man-etgx-unveiled-with-720-km-range/
12. Y. Motoaki, W. Yi, S. Salisbury, Empirical analysis of electric vehicle fast charging under cold temperatures, *Energy Policy* 122, 2018. https://doi.org/10.1016/j.enpol.2018.07.036
13. NIST/SEMATECH, e-Handbook of Statistical Methods, Comparing paired observations, updated 2022. https://www.itl.nist.gov/div898/handbook/prc/section3/prc311.htm
14. Shiledar et al., Daily operational impacts on battery degradation in heavy-duty electric drayage trucks, *eTransportation*, 2026. https://doi.org/10.1016/j.etran.2026.100567

*The life-cycle model extends the Part 3 model. The design effects and the application and climate gains are assumptions. The figures disclose no internal vehicle data, control algorithm or system layout.*
