---
title: "The value of control software in electric heavy-duty trucks, Part 3"
subtitle: "The business case of a 3% efficiency gain"
description: "What the energy saving of Part 2 is worth to the operator of an electric truck, in cost per tonne-kilometre, profit and return on investment."
teaser: "What a 2–4% energy saving is worth to the haulier, per tonne-kilometre and per truck."
publishDate: 2026-11-02
readingTime: 34 min read
category: Physical Systems Engineering
tags:
  - Electric trucks
  - Total cost of ownership
  - Energy efficiency
  - Fleet economics
series:
  id: control-software-electric-trucks
  part: 3
keyFigure:
  value: "5,500–21,500 €"
  label: "of value per truck over 8 years"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part3-social.png"
  alt: "Part 3 of 4 of the series on control software in electric heavy-duty trucks: The business case of a 3% efficiency gain. 5,500–21,500 € of value per truck over 8 years."
featured: false
draft: true
---

## A truck is a production asset

Thermal control software is evaluated in kilowatt-hours, whilst an electric truck is bought on its cost. A private car buyer asks how far the car can go. A haulier asks what it costs to move one tonne of freight over one kilometre. This figure (the *cost per tonne-kilometre*) is the price hauliers compete on, and it collects every cost of the truck together with the freight it delivers:
- the truck and its battery;
- the driver;
- the electricity;
- the maintenance;
- the freight the truck can carry.

In [Part 2](/writing/control-software-electric-trucks-part-2-engineering/), I described how predictive and optimisation-based control of the thermal management system can reduce the truck's energy consumption by 2–4% compared with well-tuned conventional control. In engineering units, this is a modest figure, and translating it into the buyer's units faces three challenges. First, energy is only a fraction of the cost of a truck, so the electricity saved alone moves the cost per tonne-kilometre little. Second, the rest of the value (a smaller battery, more payload and shorter charging) only exists if the truck is specified with the improvement in mind, and the battery is the most expensive single component of the truck. Third, road freight runs on thin margins, so the effect of a small cost saving on profit depends on how thin the margin is.

Once these three effects are accounted for, the improvement is worth between 1.2 and 2.5 times the electricity it saves, and most of that value is captured when the vehicle is specified. The argument starts from the metrics and the channels through which an efficiency gain reaches the cost, quantifies them on fifteen trucks and on one normalised long-haul truck, and then turns to how the value is captured. The limits of the estimate and the model behind it are given in the appendix.

## 1. How the business case of an electric truck is analysed

To value an efficiency gain in the buyer's units, two things have to be defined first: the units themselves, and the paths through which an energy saving reaches them.

### 1.1 The economic metrics

A truck investment is evaluated with five economic metrics [1]. Each one describes the same truck from a different angle, from the money it consumes over its life to the value today of the money it will earn. They are listed in Table 1.

*Table 1. Economic metrics used to evaluate a truck investment.*

| Indicator | What it measures |
| --- | --- |
| Total cost of ownership (TCO) | All costs over the truck's life (purchase, energy, driver, maintenance, insurance), minus resale value. It is the money the truck consumes to deliver its transport work. |
| Cost per tonne-kilometre | TCO divided by the transport work delivered (tonnes carried multiplied by kilometres driven); the figure hauliers compete on |
| Operating profit (EBIT, earnings before interest and taxes) | Revenue minus operating costs, per year. It is what remains of the freight revenue once the truck and its operation are paid. |
| Return on investment (ROI) | Profit over the truck's life relative to the investment, i.e., the profit returned by each euro spent on the truck |
| Net present value (NPV) | Future cash flows discounted to today; accounts for the fact that money now is worth more than money later. A positive NPV means that the truck earns more than the cost of the capital tied up in it. |

The first two metrics describe what the truck costs; the last three describe what it earns, and they show the effect of a thin margin. To isolate the effect of energy efficiency during operation, this series only considers engineering and operating effects. Tolls, subsidies, carbon prices and comparisons with diesel trucks depend on policy and are left out. Therefore, the main metric used is the cost per tonne-kilometre, since it combines the cost of the truck with the transport work it delivers.

### 1.2 The four channels of an efficiency improvement

With the metrics defined, the next question is how an energy saving reaches them. Once the energy efficiency is improved through the optimal operation of the thermal management system, the most direct use of the energy saved is an increase in range, i.e., more kilometres per charge. However, the improvement reaches the cost per tonne-kilometre through four channels:
1. **Electricity:** less energy is bought per kilometre.
2. **Battery:** the same range can be delivered with a smaller battery, which costs less to buy.
3. **Payload:** a smaller battery weighs less. A truck that reaches its legal weight limit before its cargo space is full (a *weight-limited* truck) can therefore carry more freight.
4. **Time:** less energy to recharge the battery means shorter charging stops.

The first channel applies to any truck as soon as the control is installed. The other three only appear when the improvement is taken into account at the moment the truck is specified, i.e., when its battery size, mass and payload are decided. Hence, most of the economic effect of control software is captured at the specification stage, and the size of each channel depends on the truck and its application.

The four channels, the moment at which each one becomes available and the metrics each one reaches are summarised in Figure 1, together with the three challenges of the introduction.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig1-value-channels.svg" alt="Diagram: a 2–4% efficiency gain spreads, through a broad arrow, over four channels. Electricity and time are available on any truck in service (scenario A) and are worth 1.2 times the electricity saved; battery and payload only when a new model is specified (scenarios B and C), worth 1.8–2.5 times. The channels converge on the cost per tonne-kilometre and the TCO (−0.5 to −1.9%) and, through the thin margin, on the operating profit, ROI and NPV (profit +24 to +96%). The three challenges are marked where they act." loading="lazy" />
	<figcaption>Figure 1. The four channels through which an efficiency improvement reaches the buyer's metrics. Electricity and time reach any truck in service; battery and payload are only captured when the truck is specified. The challenges of the introduction are marked where they act. The 2–4% gain is derived in<em> <a href="/writing/control-software-electric-trucks-part-2-engineering"></em>Part 2<em></a></em>. The values are those of the normalised truck in section 4: the value as a multiple of the electricity saved in Figure 9, the cost per tonne-kilometre and TCO in Figure 7, and the operating profit in Figure 8.</figcaption>
</figure>

The diagram also sets the order of the rest of the article: section 2 quantifies the channels on fifteen trucks, section 4 on one normalised truck, and section 5 reads the results against the three challenges.

## 2. The wider study: fifteen trucks, six applications

The four channels depend on the share of energy in the cost, on the battery mass and on the payload, and these quantities differ between applications. To quantify this spread, I analysed fifteen electric trucks currently on the market in six applications: European long-haul, regional, urban and construction trucks, and US long-haul and regional trucks. Each truck was modelled over 8 years with its battery chemistry, consumption and use profile. The battery chemistries are LFP (lithium iron phosphate) and NMC or NCA (nickel-based cathodes, where the digits give the ratio of nickel, manganese and cobalt).

### 2.1 The baseline

The baseline shows where an efficiency gain can act, namely on the energy share of the cost and on the battery mass. The modelled baseline of each truck is plotted in Figure 2: the battery and its chemistry, the range with the consumption, and the battery mass next to the payload.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig2-fleet-baseline.png" alt="Three horizontal bar panels for fifteen trucks grouped by application. Panel a: battery capacity from 280 kWh (Volvo FL Electric) to 900 kWh (Tesla Semi), with the four Mercedes trucks on LFP and the rest on NMC or NCA. Panel b: range at full load from 288 km to 764 km, with consumption from 0.85 to 1.40 kWh/km. Panel c: battery mass from 1.6 to 5.1 tonnes stacked with the payload, from 8.8 tonnes in urban trucks to 24.6 tonnes in long-haul trucks." loading="lazy" />
	<figcaption>Figure 2. Modelled baseline of the fifteen trucks, grouped by application: (a) battery capacity by chemistry; (b) range at full load, with the consumption in kWh/km; (c) battery mass and payload in tonnes. The NMC batteries are NMC811 in the Volvo trucks and NMC622 in the MAN, Scania and Freightliner trucks. The capacities and ranges are modelling inputs, not manufacturer specifications; the range is calculated at full load and with usable capacity. Newer generations exist: the MAN eTGX and Scania's long-haul truck now offer up to 720 km [2, 3], and the Tesla Semi has 822 kWh [4].</figcaption>
</figure>

The figure shows the spread that the rest of the analysis has to cover. The long-haul trucks carry 534–900 kWh and 3.4–5.1 tonnes of battery next to 19–25 tonnes of payload, whilst the urban trucks carry 280–416 kWh and 1.6–2.7 tonnes next to 9–10 tonnes. The consumption sits between 0.85 and 1.20 kWh/km on the road and rises to 1.40 kWh/km in construction.

The share of the cost spent on energy and on the driver is plotted per application in Figure 3, pooled over the trucks of each application.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig3-tco-breakdown.png" alt="Stacked horizontal bars of the 8-year TCO for six applications. Energy is 20% of the cost in EU long-haul and 21% in US long-haul, 15% in regional, 13% in construction and 10% in urban use. The driver is the largest share in every application, from 38% in EU long-haul to 53% in EU urban." loading="lazy" />
	<figcaption>Figure 3. Breakdown of the 8-year TCO by application, pooled over the trucks of each application in Figure 2. Undiscounted; residual value and tolls excluded. The labels give the energy and driver shares.</figcaption>
</figure>

Two observations shape the rest of the analysis:
- **Cost shares:** energy is about a fifth of the cost of a long-haul truck, and about a tenth in urban use. The driver is the largest cost in every application. Therefore, an efficiency improvement has its largest direct effect on the TCO in long-haul.
- **Battery mass:** batteries weigh 1.6–5.1 tonnes. In weight-limited applications, every kilogram of battery takes the place of a kilogram of payload.

These two quantities confirm the first challenge of the introduction: the electricity channel alone acts on at most a fifth of the cost, whilst the battery mass offers a second channel through the payload.

### 2.2 How much of the TCO an efficiency improvement saves

Given these cost shares, the next step is to calculate how much of the TCO a given improvement removes, and how much this depends on the use given to the improvement. For each truck, I calculated the TCO reduction for efficiency improvements of 1, 3, 5 and 10%, in two cases:
- **Realistic case:** the better of keeping the battery or downsizing it, with the typical share of weight-limited freight for each application.
- **Best case:** the battery is downsized to the original range and all the saved mass becomes payload.

The TCO reduction of a 3% improvement in each application is plotted in Figure 4, for both cases and for the best case with the driver cost removed from the TCO.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig4-tco-reduction-cases.png" alt="Vertical ranges for six applications at a 3% gain, from the realistic case to the best case. The realistic case ranges from 0.62% in EU urban to 1.12% in EU and US long-haul; the best case from 1.47% to 1.67%. The ratio between the two cases is 1.3–1.5 in long-haul and construction, 1.8–1.9 in regional and 2.5 in urban use. With the driver cost excluded, the best case reaches 2.5–3.3%, close to the 3% gain." loading="lazy" />
	<figcaption>Figure 4. TCO reduction of a 3% efficiency improvement per application, from the realistic case (open marker) to the best case (filled marker); the labels give the ratio between the two. The diamonds give the best case with the driver cost excluded from the TCO; the dotted line marks the 3% improvement.</figcaption>
</figure>

Figure 4 shows two trends:
- **Use of the improvement:** in urban and regional applications, the value roughly doubles between the realistic and the best case. In these applications, using the improvement for battery sizing and payload therefore adds as much value as the energy saving itself. In long-haul and construction, where energy is already a larger share of the cost, the best case adds 30–50%.
- **Driver cost:** the driver is a share of the cost that efficiency cannot influence. When it is excluded, the best-case TCO reduction is close to or above the efficiency gain.

The difference between the two cases comes from the battery. The mass that a 3% improvement removes from the battery, or the range it adds if the battery is kept, is plotted in Figure 5.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig5-battery-mass-range.png" alt="Bars of the battery mass saved at a 3% gain in six applications: 118 kg in EU long-haul, 82 kg in EU regional, 64 kg in EU urban, 90 kg in EU construction, 150 kg in US long-haul and 88 kg in US regional. The labels give the range gained if the battery is kept instead, from 10 km to 23 km." loading="lazy" />
	<figcaption>Figure 5. Battery mass saved by a 3% efficiency improvement per application, when the battery is downsized to the original range. The labels give the alternative: the range gained if the battery is kept.</figcaption>
</figure>

The two uses exclude each other: a truck either carries 64–150 kg less battery or drives 10–23 km further on the same battery. The largest values appear in long-haul, where the batteries are largest.

Finally, the TCO reduction was calculated for improvements from 1 to 10% to check whether larger improvements keep their value. The result for EU long-haul is plotted in Figure 6.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig6-linearity-longhaul.png" alt="TCO reduction in EU long-haul against the efficiency gain of 1, 3, 5 and 10%. The realistic case reaches 3.49% and the best case 4.97% at a 10% gain, both 92% of a strictly linear increase from the value at 1%." loading="lazy" />
	<figcaption>Figure 6. TCO reduction in EU long-haul for efficiency improvements of 1–10%, in the realistic case (open markers) and the best case (filled markers). The dotted lines extend the value at 1% linearly.</figcaption>
</figure>

Between 1 and 10%, the relationship is almost linear. A 10% improvement delivers about nine times the value of a 1% improvement, 92% of a strictly linear increase. The small diminishing return comes from the definition of efficiency: consumption becomes *c*₀/(1+*g*), where *c*₀ is the baseline consumption and *g* the efficiency improvement (Appendix B.1).

Battery sizing therefore carries most of the value beyond the electricity. This result assumes that the battery can be resized freely, which is examined next.

### 2.3 Battery packs come in fixed sizes

The previous analysis assumes that battery capacity can be removed in any amount. However, batteries are installed as packs of fixed capacity. On a truck that is already designed, an efficiency improvement only removes a pack when the improvement is large enough to cover the whole pack. For the trucks on the market, the improvement needed to remove one pack is listed in Table 2.

*Table 2. Battery pack sizes and the efficiency improvement needed to remove one pack.*

| Truck | Installed kWh | Pack size (kWh) | Number of packs | Improvement needed to remove one pack | Mass of one pack (kg) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mercedes eActros 600 | 621 | 207 | 3 | 50% | 1,428 |
| Volvo FH Aero Electric | 780 | 130 | 6 | 20% | 743 |
| MAN eTGX | 534 | 89 | 6 | 20% | 574 |
| Scania 40R BEV | 624 | 69 | 9 | 12% | 445 |
| Mercedes eActros 400 | 448 | 112 | 4 | 33% | 772 |
| Volvo FL Electric | 280 | 70 | 4 | 33% | 400 |

The smallest improvement needed is 12%, well above the 2–4% that thermal control delivers. Consequently, the value of an efficiency improvement reaches existing and new trucks through different channels:
- **Trucks already on the road:** they receive the efficiency improvement as lower consumption, more range and shorter charging. They cannot shrink their battery.
- **New models and variants:** the battery and payload value is captured when new models and variants are specified, when the module sizes are chosen, or when a fleet chooses between battery options.

This answers the second challenge of the introduction in qualitative terms: the efficiency that control software can deliver has to be known at the concept stage of a vehicle, before the hardware is fixed. Quantifying that value requires a single reference truck, defined in section 3.

## 3. The normalised truck

The fifteen trucks differ in battery, consumption and payload, so their results spread over a wide range. To follow the value of the improvement through every metric on one consistent case, I built a *normalised truck*: a European 40-tonne long-haul truck that averages the Mercedes-Benz eActros 600, the Volvo FH Aero Electric, the MAN eTGX and Scania's long-haul electric truck [2, 3, 5, 6]. Its parameters and baseline results are summarised in Table 3; the last four rows are the baseline against which the improvement is measured.

*Table 3. Parameters and baseline results of the normalised truck.*

| Parameter | Value |
| --- | ---: |
| Battery | 640 kWh (90% usable), 157.5 Wh/kg at pack level, 4.06 tonnes |
| Energy consumption at 40–42 t | 1.08 kWh/km (eActros 600 measured: 1.03 kWh/km over 15,000 km [5]) |
| Range | 533 km new, about 443 km after 8 years |
| Payload | 23.8 tonnes |
| Purchase price | about 305,000 €, of which the battery is about 32% (640 kWh × 154 €/kWh ≈ 98,600 €) |
| Use | 120,000 km/year, 8 years |
| Electricity | 0.22 €/kWh, the long-haul charging cost excluding VAT used by the ICCT [1] |
| Battery cost | 154 €/kWh at pack level [1, 7] |
| Charging | 1,000 kW megawatt charger; the truck accepts up to 750 kW [2]; about 640 kW on average |
| Freight revenue | 1.17 € per km driven (1.37 € per loaded km), set to give a 2% operating margin [9, 10] |
| 8-year TCO | about 1.10 million € |
| Energy share of TCO | about 21% |
| Cost per tonne-kilometre | 7.8 euro cents |
| Lifetime ROI | about 7% |

The TCO is close to the ICCT's estimate for a 2023 European electric long-haul truck: about 1.14 € per kilometre here, against about 1.26 € per kilometre in the ICCT study, with energy at 21% and 23% of the cost [1]. The margin was set low on purpose, to match the sector. French hauliers made a pre-tax margin of 1.4–2.2% in 2022–2023, and 40% of them made a loss [10]. At a 2% margin and a 7% cost of capital, the baseline truck does not quite pay back its capital: its net present value is about −69,000 €, i.e., it earns slightly less than the 7% return the same money is expected to earn elsewhere.

Small cost changes therefore have a large effect on profit, which is the third challenge of the introduction. The model behind these figures, its assumptions and the sensitivity of the results to them are described in Appendix B.

## 4. Results

The normalised truck makes it possible to compare, on one case, how much each use of the improvement is worth. The three scenarios below differ in how many of the four channels of section 1.2 they activate:
- **A, keep the battery:** the truck uses less electricity, gains range (also with an aged battery) and spends less time charging. This scenario applies to any truck already in service.
- **B, smaller battery with mixed freight:** the battery is downsized to the original range, so the truck becomes cheaper and lighter. 30% of the work is weight-limited.
- **C, smaller battery with heavy freight:** as B, but on weight-limited work such as building materials, liquids, timber or bulk goods, where every kilogram saved becomes cargo.

### 4.1 Key results

The results per truck are summarised in two figures, one for what the truck costs and one for what it earns, following the metrics of section 1.1. In both, the marker or bar gives the value for a 3% improvement, and the whiskers give the values for 2% and 4%. The value in euros, and how it compares with the electricity saved, follows in section 4.2.

The effect on the costs and on the physical quantities of the truck is plotted in Figure 7.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig7-costs-physical.png" alt="Dot plot of the change per truck in seven quantities for scenarios A, B and C. The TCO, the cost per tonne-kilometre and the purchase price fall by 0.5–1.9%. The battery capacity, the energy per tonne-kilometre and the charging time fall by 2.0–4.5%. The range with an aged battery rises by 2.2–4.4% in scenario A and is unchanged in B and C." loading="lazy" />
	<figcaption>Figure 7. Change in costs and physical quantities per truck for the three scenarios, at 3% (marker) and at 2–4% (whiskers). The battery capacity is the capacity removed relative to 640 kWh (13, 19 and 25 kWh). Open markers indicate quantities that do not change in that scenario.</figcaption>
</figure>

Every cost falls by less than the efficiency improvement, and the TCO by at most 1.2%. The physical quantities, by contrast, follow the improvement almost one to one: the battery, the energy per tonne-kilometre and the charging time fall by 2.0–4.5%. Only scenario A gains range, since in B and C the improvement is used to remove battery capacity and the range is held constant by design.

The effect on what the truck earns is plotted in Figure 8, on scales an order of magnitude larger.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig8-profit-roi.png" alt="Two bar charts for scenarios A, B and C. Left: operating profit per year rises by 36%, 55% and 73% at 3%, about 1,000 €, 1,500 € and 2,000 € per year, with a range of 24–96% between 2 and 4%. Right: the lifetime ROI rises by 2.7, 4.1 and 5.5 percentage points from the 7% baseline, with an NPV of 6,000 €, 9,900 € and 13,000 €." loading="lazy" />
	<figcaption>Figure 8. Effect on what the truck earns, at 3% (bars) and at 2–4% (whiskers): (a) increase in operating profit per year, with the value in euros per year; (b) change in lifetime ROI from the 7% baseline, in percentage points (pt), with the NPV at a 7% discount rate.</figcaption>
</figure>

Read together, the two figures show the third challenge at work. The TCO falls by at most 1.2% in every scenario, whilst operating profit rises by 24–96% and the lifetime ROI by 1.8–7.3 points. The value grows from scenario A to C, because each scenario activates more channels. Therefore, the small cost change becomes a large profit change, as the thin margin of section 3 anticipated.

### 4.2 Where the value comes from

To explain why the scenarios differ, the value of a 3% improvement is broken down by source in Figure 9, per truck over 8 years, together with the totals for 2% and 4%. The negative ageing contribution in scenarios B and C is explained in Appendix B.1 (step 5).

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig9-value-by-source.png" alt="Stacked bars of the value of a 3% improvement per truck over 8 years. The electricity saved, 6,600 €, is the same in the three scenarios. Scenario A adds driver time and a small ageing benefit, to 8,100 €, 1.23 times the electricity saved. Scenarios B and C add the smaller battery and the extra freight, which grows from 1,900 € to 6,300 €, to 12,200 € (1.84 times) and 16,300 € (2.46 times). The whiskers span the totals at 2% and 4%." loading="lazy" />
	<figcaption>Figure 9. Value of a 3% efficiency improvement per truck over 8 years, by source, for the three scenarios. The bars below zero are the faster battery ageing in scenarios B and C (Appendix B.1, step 5). The diamonds give the net total and the whiskers the totals at 2% and 4%; the dotted line marks the electricity saved alone. In scenario C, the parts add up to 16,400 €; the difference from the total is rounding.</figcaption>
</figure>

The electricity saved is the same in the three scenarios, 6,600 €, and the driver time at the charger adds 1,100 € in each of them. The difference between the scenarios comes from the smaller battery, 2,900 € in B and C, and, above all, from the extra freight, which more than triples from 1,900 € in B to 6,300 € in C. The ageing contribution is small in every case: +400 € in A and −600 € in B and C. Hence, payload is the channel that separates the scenarios, and its weight in the result is discussed in section 5.

## 5. Reading the results

The results of section 4 can now be read against the three challenges of the introduction: the specification of the truck, the small share of energy in the cost and the thin margin.

The more the efficiency improvement is used in the specification of the truck, the more it is worth. Kept as extra range (scenario A), a 3% improvement returns 1.23 times its electricity value. Used to specify a smaller battery for heavy freight (scenario C), it returns 2.46 times. Expressed as a share of the 8-year TCO of about 1.10 million €, the electricity saved is 0.6%, whilst the value is 0.7% in scenario A and 1.5% in scenario C. The TCO itself falls by less (0.7–0.9%, Figure 7), because the extra freight earns revenue instead of reducing a cost; its effect appears in the cost per tonne-kilometre. Payload is the largest single multiplier, because each kilogram of battery avoided becomes a kilogram of freight, and that freight earns revenue on every trip for eight years.

The cost per tonne-kilometre falls by less than the efficiency gain, but the battery channel doubles the effect. Electricity is about a fifth of the total cost of the truck over its life. A 2% saving in energy therefore lowers the cost of moving one tonne over one kilometre by only about 0.5%. If the same 2% is used to fit a smaller battery and carry more freight, the cost reduction rises to 0.8–1.0%. Since hauliers compete on price per tonne-kilometre, this reduction is the change that reaches the customer.

Operating profit rises by much more than the efficiency gain. In the model, the truck earns about 140,000 € per year and keeps 2% of it, about 2,800 €, as operating profit, in line with the margins the sector reports [10, 11]. A 2% improvement in mixed freight is worth about 1,000 € per year, which raises operating profit by more than a third. With heavy freight, the increase is about half. The value in euros does not depend on the margin; the percentage change in profit does. Hence, the thinner the margin, the larger the share of the profit that a given cost saving represents.

This dependence on the margin is plotted in Figure 10 for a 3% improvement.

<figure class="article-figure">
	<img src="/images/blog/control-software-electric-trucks/part3-fig10-margin-leverage.png" alt="Three curves of the increase in operating profit against the baseline operating margin, from 1 to 10%. At the 2% margin of the model, a 3% improvement raises profit by 36% in scenario A, 55% in B and 73% in C. At a 10% margin, the same euros raise profit by less than 15%. The sector margins of 1.4–2.2% are shaded." loading="lazy" />
	<figcaption>Figure 10. Increase in operating profit from a 3% efficiency improvement, as a function of the baseline operating margin. The value in euros per year is fixed for each scenario; only the margin changes. The shaded band is the pre-tax margin of French hauliers in 2022–2023 [10].</figcaption>
</figure>

The curves are steepest where hauliers actually operate. Around a 2% margin, 1,000–2,000 € per year raises profit by 36–73%; at a 6% margin, the same euros would raise it by 12–24%. The thin margin is therefore a challenge for the haulier, but it is also what makes a small efficiency improvement visible in the profit.

The physical and economic effects of the improvement are different in size. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) showed that the mass feedback (a lighter truck needs less energy, which allows a lighter battery) multiplies an efficiency gain by about 1.07. The economic multiplier, 1.2–2.5, comes almost entirely from the battery, payload and time channels. These channels are hardware and freight that the operator does not have to buy or gives up carrying, whilst the improvement itself is software, and this difference changes how its cost scales.

## 6. The cost and impact of developing efficient control software

Since the value of the improvement comes largely from battery hardware that is not bought, the cost of obtaining it has to be compared with the cost of that hardware. Every kilowatt-hour of battery is paid for on every truck built, and every kilogram of it is paid for again as lost payload over the truck's life. Control software, by contrast, takes a large engineering effort to develop, validate and maintain, as described in [Part 2](/writing/control-software-electric-trucks-part-2-engineering/). However, once released, the same strategy runs on every truck in the fleet at almost no additional cost per vehicle, and it can be improved over the air during the vehicle's life.

The value of the software therefore grows with the number of trucks, whilst most of its cost is paid once. At fleet scale, across 10,000 trucks, a 2–4% improvement corresponds to:
- **Value for operators:** 80–215 million € over the trucks' life, when the gain is used to size the battery.
- **Battery hardware:** 19–38 million € that does not need to be bought.
- **Battery capacity:** 125–246 MWh that does not need to be manufactured.

At this scale, the improvement replaces tens of millions of euros of battery hardware. Consequently, control software belongs in the decisions where the battery is sized and the truck is sold.

## 7. Bringing control software into the business conversation

The previous sections show that the value of the improvement depends on when its size is known and on how it is used. This has three consequences for how electric trucks are developed and sold.

1. **Know the control performance early:** battery size is decided at the concept stage, from the expected consumption in the worst-case scenario. If the efficiency that the thermal control will deliver is only known after the hardware is fixed, the battery is sized for a less efficient truck than the one that will be built.
2. **Value the software in the buyer's units:** kilowatt-hours are the engineer's unit. Cost per tonne-kilometre, operating profit and return on investment are the buyer's. Presented as "5,000–20,000 € per truck", a thermal control improvement can be compared directly with the other items of the purchase decision, which is not the case when it is presented as "2–4% energy".
3. **Match the use of the margin to the application:** routes with few chargers gain most from the extra range and the shorter charging time. Price-sensitive fleets gain most from a cheaper battery, and heavy freight gains most from the extra payload.

These consequences rely on the figures of a cost model, and they hold only within its limits. The limits and the model itself are described in the appendix, after the conclusions.

## Summary and conclusions

An efficiency gain from thermal control software, such as the 2–4% obtained with the predictive methods of [Part 2](/writing/control-software-electric-trucks-part-2-engineering/), is measured in kilowatt-hours, whilst a haulier buys a truck on its cost per tonne-kilometre (the cost of moving one tonne of freight over one kilometre). The gain reaches that cost through four channels: less electricity, a smaller battery, more payload on weight-limited routes and shorter charging stops. Only electricity and charging time reach a truck already in service; the battery and payload channels exist only if the truck is specified with the gain in mind.

**For a European 40-tonne long-haul truck over 8 years, a 2–4% gain is worth 5,500–21,500 € per truck.** Since electricity is about a fifth of the life cost, the cost per tonne-kilometre falls by only 0.5–1.0% when the battery is kept, and by up to 1.9% when the battery is downsized and the mass saved becomes cargo. The value is then 1.23 times the electricity saved with the battery kept, and up to 2.46 times with heavy freight, where payload is the largest channel: at 3%, 0.7–1.5% of the TCO, against 0.6% for the electricity alone. **With an operating margin of about 2%, a haulier earns about 2,800 € per truck and year; the same savings add 700–2,700 € to that profit, an increase of 24–96%.**

Hence, three quantities decide the value of an efficiency gain in a commercial vehicle: the share of energy in its total cost, whether the gain is known when the vehicle is specified, and the margin of the operator. The euros saved do not depend on the margin, but their weight in the profit does. The second quantity is decided by the engineering of the control software: a gain that is predicted and validated before the truck is specified reaches the battery and payload channels, whilst a gain found afterwards reaches only the electricity bill. Control strategies are usually evaluated in kilowatt-hours, whilst their customer evaluates them in euros per tonne-kilometre; I built this cost model to evaluate the strategies I develop in both units, from the control decision to the value it creates for the haulier. The figures exclude the development cost of the software and the cold-weather effects, which [Part 4](/writing/control-software-electric-trucks-part-4-design/) adds together with ageing. [Part 1](/writing/control-software-electric-trucks-part-1-context/) places these figures in the wider context of the electrification of heavy freight.

## Appendix: limits and model

The appendix collects the limits of the estimate and the model behind the figures of this article. They are not needed to follow the argument, but they make each figure traceable.

### A. Limits of the estimate

Each figure in this article is an estimate, and its validity depends on five choices made in the model. They are listed below with their effect on the result.

- **Cost model:** the economic figures come from my own cost model. They estimate the scale of the value; they do not forecast it for a specific vehicle or fleet. The baseline is close to an independent study: about 1.14 € per kilometre and an energy share of 21%, against about 1.26 € per kilometre and 23% in the ICCT's analysis of a 2023 electric long-haul truck [1].
- **Revenue:** the revenue is calibrated to the margins the sector reports. French hauliers made a pre-tax margin of 1.4–2.2% in 2022–2023 [10], and Daimler Truck describes the margins of its customers as being in the low single-digit percent range [11]. The model sets the revenue so that the baseline truck makes a 2% operating margin. This gives 1.37 € per loaded kilometre, within the 1.23–2.22 € contract rates on the main European lanes [9]. The value per truck does not depend on this choice; the percentage change in profit does.
- **Charging time:** the charging-time saving holds under specific conditions. Current trucks accept about 700–750 kW on a megawatt charger [2, 5], and charging sessions deliver on average about 85% of the charger's nominal power [8]. On these chargers, the truck limits the power, and this limit does not change when the battery is slightly smaller, so a smaller battery charges in proportionally less time. However, the time saved only has value if it changes the driver's schedule. A 45-minute break is mandatory after 4.5 hours of driving [12], and about 30 minutes of megawatt charging fits within it [13]. The model therefore counts only half of the charging time as paid driver time.
- **Development cost:** the cost of developing the software is not deducted. I found no public data on the cost per vehicle of energy or thermal management software. The same software runs on every truck of a model, so its cost per truck falls with volume (section 6).
- **Thermal effects:** effects specific to thermal management are not included here. Measured data from electric trucks in Germany shows consumption rising by about 0.13 kWh/km for every 10 °C drop in ambient temperature, with no clear temperature dependence in the trucks that preconditioned their battery [14]. The larger saving in winter and the slower battery ageing are discussed in [Part 1](/writing/control-software-electric-trucks-part-1-context/) and add to these figures. [Part 4](/writing/control-software-electric-trucks-part-4-design/) quantifies them, together with preconditioning and thermal hardware sizing, in a sensitivity analysis.

Two of these limits act in opposite directions: the development cost, which is not deducted, reduces the net value, whilst the thermal effects, which are not included, add to it. To make each figure traceable, the model itself is described in Appendix B.

### B. The model and its assumptions

The figures in sections 3 to 6 come from a cost model of one truck over its life. The model is simple by design, so that every result can be traced back to a few physical and economic relationships. This part of the appendix describes those relationships, the values I chose and the reasons for them, and how much the results move when the values change.

#### B.1 Model structure

The model calculates the truck's costs and revenue year by year, for a baseline truck and for a truck with an efficiency improvement *g*. The difference between the two is the value of the improvement. The calculation runs in six steps, following the path of the energy saving from consumption to profit.

##### Step 1: energy consumption

An efficiency improvement *g* means that the truck does the same work with less energy:

> c₁ = c₀ / (1 + g)

where c₀ = 1.08 kWh/km. A 2% improvement therefore reduces consumption by 1.96%, and a 10% improvement by 9.1%. This definition causes the small diminishing return seen in section 2.2.

##### Step 2: battery size

In scenario A, the battery stays at 640 kWh. In scenarios B and C, it is reduced until the range of the new truck equals the original range:

> E₁ = E₀ × c₁ / c₀

The model treats the battery as continuously sizeable. As section 2.3 shows, real trucks use fixed pack sizes, so this step applies to the specification of new models and variants, not to individual trucks already in service.

##### Step 3: mass and payload

Battery mass is the capacity divided by the pack energy density (157.5 Wh/kg). Payload is what remains of the 42-tonne gross combination weight after the tractor (7.1 t), the trailer (7.0 t) and the battery. A smaller battery has one of two effects, depending on the trip:
- **Weight-limited trip:** the saved mass is filled with extra cargo. The truck weighs the same and earns more.
- **Any other trip:** the truck is lighter and uses less energy. Consumption falls in proportion to the mass saved, scaled by a mass sensitivity ε = 0.5 relative to the average operating mass of 32 tonnes. Measured data from heavy trucks puts ε at about 0.4–0.65 [14, 15, 16]. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) explains this feedback in detail.

##### Step 4: charging time

Charging power is the lowest of three limits: the charger (a 1,000 kW megawatt charger), the truck (750 kW, the acceptance of current trucks [2, 5]) and the battery (1.4 times its capacity per hour, i.e., a charging rate of 1.4 C, about 900 kW). An average factor of 0.85 accounts for the power reduction towards full charge, consistent with the effective power measured in charging sessions [8]. The result is about 640 kW. Charging hours per year are the annual energy divided by this power. Half of the charging time is assumed to cost driver time at 45 €/h, because the other half overlaps with the mandatory breaks [12, 13].

##### Step 5: battery ageing and resale value

Capacity fade combines a cycling part (20% of capacity lost after 4,000 full equivalent cycles) and a calendar part (1% per year). A smaller battery cycles more deeply for the same distance, so it ages slightly faster. This faster ageing is the reason why the ageing line in section 4.2 is negative in scenarios B and C. The residual value after 8 years is 15% of the vehicle without its battery, plus the battery valued at 50% of its new price, scaled down linearly as its health approaches 70%.

##### Step 6: revenue and indicators

The revenue per kilometre is set so that the baseline truck makes a 2% operating margin: 1.17 € per kilometre driven, or 1.37 € per loaded kilometre [9, 10, 11]. Extra payload earns an additional 0.065 € per extra tonne-kilometre, applied only to loaded, weight-limited kilometres. The indicators of section 1.1 follow from the costs and the revenue, as listed in Table 4.

*Table 4. Calculation of the economic metrics.*

| Indicator | Calculation |
| --- | --- |
| TCO | Purchase price + 8 × annual operating cost − residual value |
| Cost per tonne-km | TCO ÷ tonne-kilometres delivered over 8 years |
| Operating profit (EBIT) per year | Revenue − operating cost − depreciation (purchase price minus residual value, spread over 8 years) |
| Lifetime ROI | Sum of all cash flows, including purchase and resale, ÷ purchase price |
| NPV | The same cash flows, discounted at 7% per year |
| Value per truck | Sum of the six value sources in section 4.2, over 8 years, undiscounted |

The transport work assumes that the truck is loaded on 85% of its kilometres. Weight-limited trips carry the full payload. Other trips carry 60% of the payload, because they are limited by volume or by the available freight.

#### B.2 Assumptions

The six steps need numerical values, some from public sources and some chosen by me. The values of the model parameters, and the basis for each one, are listed in Table 5; the values marked as assumptions are my own decisions where no public source was found.

*Table 5. Model parameters and the basis for each value.*

| Parameter | Value | Basis |
| --- | ---: | --- |
| Truck life | 8 years, 120,000 km/year | Typical first-owner use of a long-haul tractor (assumption) |
| Battery | 640 kWh, 90% usable | Average of four European long-haul trucks [2, 3, 5, 6] |
| Consumption | 1.08 kWh/km at 40–42 t | Average of the same trucks; eActros 600 measured 1.03 kWh/km [5] |
| Pack energy density | 157.5 Wh/kg | Market mix of LFP, NMC811 and NMC622 at pack level |
| Pack cost | 154 €/kWh | Between the all-applications average [7] and the commercial-vehicle estimate of about 220 €/kWh [1] |
| Vehicle without battery | 206,000 €, 7.1 t | Assumption; gives a purchase price of about 305,000 € |
| Trailer and weight limit | 7.0 t, 42 t | EU 40 t limit plus the 2 t allowance for zero-emission trucks (see Part 1) |
| Electricity | 0.22 €/kWh | Long-haul charging cost of 0.20–0.22 €/kWh excluding VAT [1] |
| Driver | 55,000 €/year | Assumption for Western Europe |
| Maintenance; insurance and other | 0.08 €/km; 8,000 €/year | Assumptions |
| Charging | 1,000 kW charger, truck limit 750 kW, battery limit 1.4 C, taper 0.85, 50% of time paid at 45 €/h | Truck limit [2, 5]; effective power about 85% of nominal [8]; breaks [12, 13]; driver rate is an assumption |
| Battery life | 4,000 full cycles to 80% health, 1%/year calendar fade | Market-mix estimate |
| Loaded share; weight-limited share | 85%; 30% (B), 100% (C) | Assumptions |
| Revenue; extra-payload rate | 1.17 €/km, set for a 2% operating margin; 0.065 €/tkm | Sector margins of 1.4–2.2% [10, 11]; contract rates of 1.23–2.22 €/km [9]; the payload rate is an assumption |
| Mass sensitivity ε | 0.5 | Measured about 0.4–0.65 for heavy trucks [14, 15, 16]; consistent with the share of long-haul driving resistance that scales with mass (Part 2) |
| Discount rate | 7% | Assumption |

The baseline that results from these values is the one in section 3: a TCO of 1.10 million €, 7.8 euro cents per tonne-kilometre, a lifetime ROI of 7% and an energy share of 21% of the TCO. The wider study in section 2 uses the same structure, with the battery, consumption, payload and use profile of each truck and application. Since several of these values are assumptions, the conclusions hold only if they survive a variation of them.

#### B.3 How sensitive the results are

To test the assumptions, I varied each one on its own and recalculated the value of a 3% improvement per truck over 8 years. The results are listed in Table 6; the first row gives the reference values, and each cell gives the value at the low and the high end of the assumption.

*Table 6. Sensitivity of the value of a 3% improvement per truck over 8 years to each assumption.*

| Assumption | Low / high value | A: keep battery | B: mixed freight | C: heavy freight |
| --- | --- | ---: | ---: | ---: |
| Reference |  | 8,100 € | 12,200 € | 16,300 € |
| Electricity price | 0.15 € / 0.35 € per kWh | 6,000 / 12,100 | 10,000 / 16,300 | 14,200 / 20,300 |
| Distance per year | 90,000 / 150,000 km | 6,100 / 10,200 | 9,600 / 14,800 | 12,700 / 19,900 |
| Extra-payload rate | 0.045 € / 0.085 € per tkm | unchanged | 11,600 / 12,800 | 14,400 / 18,200 |
| Battery cost | 110 € / 220 € per kWh | 8,000 / 8,300 | 11,600 / 13,200 | 15,700 / 17,300 |
| Charger power | 400 / 1,000 kW | 9,100 / 8,100 | 13,200 / 12,200 | 17,300 / 16,300 |
| Weight-limited share (B) | 15% / 50% | unchanged | 11,300 / 13,400 | n/a |
| Mass sensitivity ε | 0.3 / 0.7 | unchanged | 12,100 / 12,400 | 16,300 / 16,300 |

The effect of each assumption is the following:
- **Electricity price and annual distance:** these two assumptions move the result most, because together they set how much energy the improvement saves. Even at the low ends, a 3% improvement is still worth 6,000–14,200 € per truck.
- **Extra-payload rate:** it only affects the result for heavy freight. It is the most uncertain economic assumption, and it decides most of the difference between scenarios B and C.
- **Battery cost and mass sensitivity:** they hardly move the result. This is because the battery is downsized by only about 19 kWh, and the physical mass feedback is small, as Part 2 showed.
- **Charger power:** a slower charger makes the improvement worth more. On a 400 kW charger, the charger limits the power, every kilowatt-hour takes longer to put back, and the time saved is larger.
- **Ranking of the scenarios:** it does not change. In every case, downsizing the battery is worth more than keeping it, and heavy freight is worth the most.

The revenue and margin assumptions do not affect the value per truck. However, they do affect the changes in operating profit and ROI. With a 5% margin instead of 2%, the same saving in euros would raise operating profit by about 2.5 times less in percentage terms. Therefore, the conclusions of sections 5 to 7 hold for every value tested; only their size changes.

Part 4 extends this analysis to the parameters set by the control software itself, to other trucks and to city buses.

## References

1. ICCT, A total cost of ownership comparison of truck decarbonization pathways in Europe, 2023. https://theicct.org/publication/total-cost-ownership-trucks-europe-nov23/
2. electrive, New generation MAN eTGX unveiled with 720 km range, September 2026. https://www.electrive.com/2026/09/14/new-generation-man-etgx-unveiled-with-720-km-range/
3. Scania, Scania enables electric long-haul with up to 720 km range. https://www.scania.com/group/en/home/newsroom/press-releases/press-release-detail-page.html/5424916-scania-enables-electric-long-haul-with-up-to-720-km-range
4. electrive, It's official: Tesla Semi features 822 kWh battery capacity, May 2026. https://www.electrive.com/2026/05/11/its-official-tesla-semi-features-822-kwh-battery-capacity/
5. Daimler Truck, Mercedes-Benz Trucks hands over first series-produced eActros 600 to customers in Germany, December 2024. https://www.daimlertruck.com/en/newsroom/pressrelease/mercedes-benz-trucks-hands-over-first-series-produced-eactros-600-to-customers-in-germany-52938275
6. electrive, Volvo Trucks boosts net battery capacity to record level, June 2026. https://www.electrive.com/2026/06/11/volvo-trucks-boosts-net-battery-capacity-to-record-level/
7. BloombergNEF, Lithium-ion battery pack prices fall to $108 per kilowatt-hour despite rising metal prices, December 2025. https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/
8. Basma, H., Schmidt, Charging infrastructure needs for battery electric trucks in the EU by 2030, ICCT, 2025.
9. Upply, Ti and IRU, European Road Freight Rate Benchmark Q4 2025, 2026. https://ti-insight.com/wp-content/uploads/2026/02/Q4-2025-European-Road-Freight-Rate-Benchmark-Report-Ti-Upply-IRU.pdf
10. Upply Market Insights, Transport routier français : le bilan 2023 révèle l'érosion des marges (Banque de France data), 2024. https://market-insights.upply.com/fr/transport-routier-fran%C3%A7ais-le-bilan-2023-revele-lerosion-des-marges
11. Daimler Truck, world premiere of the Mercedes-Benz eActros 600, press release, October 2023.
12. European Commission, DG MOVE, Driving time and rest periods (Regulation (EC) No 561/2006). https://transport.ec.europa.eu/transport-modes/road/social-provisions/driving-time-and-rest-periods_en
13. Shoman, W., Yeh, S., Sprei, F., Plötz, P., Speth, D., Public charging requirements for battery electric long-haul trucks in Europe: a trip chain approach, Fraunhofer ISI Working Paper S01/2023.
14. Le Corguillé, J., Hacker, F., Göckeler, K., Mottschall, M., Dolinga, T., Real-world data analysis of energy consumption, activity and charging patterns of battery electric trucks operating in Germany, Öko-Institut, 2025. https://www.oeko.de/fileadmin/oekodoc/Real-world-data-analysis-of-battery-electric-trucks.pdf
15. Shiledar et al., SAE International Journal of Electrified Vehicles 15(3), 2026. https://doi.org/10.4271/14-15-02-0013
16. Coyle, M., Effects of payload on the fuel consumption of trucks, Imise for the UK Department for Transport, 2007.

*The model and all its assumptions are described in Appendix B. Tolls, subsidies and carbon prices are excluded. No confidential data is disclosed.*
