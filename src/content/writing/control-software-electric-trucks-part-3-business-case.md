---
title: "How a 3% efficiency gain changes the economics of an electric truck"
subtitle: "How a 3% efficiency gain changes the economics of an electric truck"
seoTitle: "Electric-truck efficiency: the value of a 3% gain"
description: "A 3% efficiency gain is worth 8,100–16,300 € over 8 years for a modelled electric long-haul truck. Follow its effects on battery size, payload and profit."
teaser: "What a 3% energy saving is worth to the haulier, per tonne-kilometre and per truck."
publishDate: 2026-11-02
updatedDate: 2026-11-17
readingTime: 15 min read
category: Physical Systems Engineering
tags:
  - Electric trucks
  - Total cost of ownership
  - Energy efficiency
  - Fleet economics
keyFigure:
  value: "8,100–16,300 €"
  label: "of value per truck over 8 years from a 3% gain"
socialImage:
  src: "/images/blog/control-software-electric-trucks/part3-social.png"
  alt: "Part 3 of 4. How a 3% efficiency gain changes the economics of an electric truck. In the model, the saving is worth 1.2–2.5 times the electricity alone when the truck's use and specification are considered."
ctaTitle: "Putting a value on a control improvement?"
ctaBody: "Describe the use case, the baseline and the cost decision it affects. I will reply with how I would trace the engineering result to the buyer's metric."
midNote:
  text: "I built the cost model in this series to connect control performance to the operator's cost per tonne-kilometre."
featured: false
draft: false
series:
  id: control-software-electric-trucks
  part: 3
---

A private car buyer asks how far the car can go on a charge. A haulier asks instead what it costs to move one tonne of freight over one kilometre, the *cost per tonne-kilometre*. This is the price hauliers compete on, and it combines what a truck costs over its life (the truck and its battery, the driver, the electricity and the maintenance) with the freight it can carry.

Thermal control software, by contrast, is evaluated in kilowatt-hours, and its gain looks small. [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) showed that predictive thermal control saves 2–4% of the energy against production feedback control, and this article uses the middle value, 3%. Since electricity is only a fraction of a truck's cost, the electricity saved alone lowers the cost per tonne-kilometre little. The gain, however, reaches further than the electricity bill. A more efficient truck needs a smaller battery, which lowers its price and frees payload, provided the gain is known before the truck is specified. **For the modelled long-haul truck, a 3% saving is then worth 8,100 € over 8 years with the battery kept and up to 16,300 € with a smaller battery, 1.2–2.5 times the electricity it saves.** Because road haulage runs on thin margins, that value is also a large share of the profit. This article shows how each of these effects arises and what it is worth.

## 1. A saving reaches the haulier through four channels

A truck investment is judged on what it costs and on what it earns [1]. Cost is measured by the *total cost of ownership* (TCO) and the cost per tonne-kilometre, and earnings by operating profit, return on investment (ROI) and net present value (NPV). TCO adds up the purchase and running costs and subtracts resale value. Cost per tonne-kilometre divides that cost by the freight moved. ROI compares the profit with the price paid for the truck. NPV also accounts for when the money is earned. To isolate the effect of energy efficiency, I leave out tolls, subsidies, carbon prices and comparisons with diesel trucks, since they depend on policy.

I built the cost model to follow the chain of effects behind a kilowatt-hour figure, in which a smaller battery lowers consumption again and frees mass and charging time. An energy saving reaches these metrics through four channels:
1. **Electricity:** less energy is bought per kilometre.
2. **Battery:** the same range can be delivered with a smaller battery, which costs less to buy.
3. **Payload:** a smaller battery weighs less. A truck that reaches its legal weight limit before its cargo space is full (a *weight-limited* truck) can therefore carry more freight.
4. **Time:** less energy to recharge means shorter charging stops.

Electricity and time apply even to a truck in service, although a shorter charging stop only has value if it frees paid time. **The battery and payload channels require the gain to be known when the truck is specified.** The four channels, and the moment at which each one becomes available, are summarised in Figure 1.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part3-fig1-economic-channels-mobile.svg" width="360" height="868" />
		<img src="/images/blog/control-software-electric-trucks/part3-fig1-economic-channels.svg" width="1050" height="490" alt="Diagram of four channels for a 3% efficiency gain. Electricity and charging time reach trucks in service, worth about 1.2 times the electricity saved. Battery cost and payload add value when a new truck is specified, worth up to 2.5 times the electricity saved. The cost per tonne-kilometre falls by 0.7–1.4%, and operating profit rises by 36–73% at a 2% margin." loading="lazy"  />
	</picture>
	<figcaption>Figure 1. The four channels through which an efficiency improvement reaches the buyer's metrics. Electricity and time reach a truck in service. Battery and payload are captured only when a new truck is specified. The 3% gain is the middle of the 2–4% range in <a href="/writing/control-software-electric-trucks-part-2-engineering/">Part 2</a>. The −0.7 to −1.4% range applies to the cost per tonne-kilometre of the normalised truck in section 3, where the TCO change is also given.</figcaption>
</figure>

This split between trucks in service and new trucks becomes the three scenarios calculated in section 3: keep the battery, downsize it for mixed freight, or downsize it for weight-limited work.

## 2. Battery sizing determines the value beyond electricity

### 2.1 Electricity is a fifth of the cost in long-haul

How large each channel is depends on the truck, namely on the share of energy in its cost, its battery mass and its payload. Since these differ by application, I modelled fifteen electric trucks currently on the market over 8 years in six applications: European long-haul, regional, urban and construction, and US long-haul and regional. Their batteries weigh 1.6–5.1 tonnes, from 280 kWh in urban trucks to 900 kWh in long-haul trucks. The share of the cost spent on energy and on the driver is plotted per application in Figure 2.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part3-fig2-tco-breakdown-mobile.svg" width="360" height="1193" />
		<img src="/images/blog/control-software-electric-trucks/part3-fig2-tco-breakdown.png" width="3125" height="1563" alt="Stacked horizontal bars of the 8-year TCO for six applications. Energy is 20% of the cost in EU long-haul and 21% in US long-haul, 15% in regional, 13% in construction and 10% in urban use. The driver is the largest share in every application, from 38% in EU long-haul to 53% in EU urban." loading="lazy"  />
	</picture>
	<figcaption>Figure 2. Breakdown of the 8-year TCO by application, pooled over the fifteen modelled trucks. Undiscounted, with residual value and tolls excluded. The labels give the energy and driver shares.</figcaption>
</figure>

Energy is about a fifth of the cost of a long-haul truck and about a tenth in urban use, and the driver is the largest cost everywhere. **The electricity channel therefore acts on only 10–21% of the cost in these applications, and the electricity saved alone lowers the total cost by a fraction of the efficiency gain.**

The battery mass offers a second channel, because a more efficient truck needs less battery for the same range. A 3% improvement either removes 64–150 kg of battery or, if the battery is kept, adds 10–23 km of range, and the two uses exclude each other. Whether that mass can be removed depends on how the battery is built.

### 2.2 Existing trucks need at least 12% to remove a battery pack

The value of a smaller battery assumes capacity can be resized freely. Batteries, however, are installed as packs of fixed capacity, and on a truck that is already designed, an improvement only removes a pack if it covers the whole pack. The improvement needed for the trucks on the market is listed in Table 1.

*Table 1. Battery pack sizes and the efficiency improvement needed to remove one pack.*

| Truck | Installed kWh | Pack size (kWh) | Number of packs | Improvement needed to remove one pack | Mass of one pack (kg) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mercedes eActros 600 | 621 | 207 | 3 | 50% | 1,428 |
| Volvo FH Aero Electric | 780 | 130 | 6 | 20% | 743 |
| MAN eTGX | 534 | 89 | 6 | 20% | 574 |
| Scania 40R BEV | 624 | 69 | 9 | 12% | 445 |
| Mercedes eActros 400 | 448 | 112 | 4 | 33% | 772 |
| Volvo FL Electric | 280 | 70 | 4 | 33% | 400 |

**The smallest improvement needed is 12%, well above the 2–4% that thermal control delivers.** Trucks already on the road therefore receive the gain as lower consumption, more range and shorter charging, but they keep their battery. The battery and payload value is captured only when a new model or variant is specified, including its module sizes, or when a fleet chooses between battery options. For the battery to shrink, the efficiency that control software delivers has to be known at the concept stage, before the hardware is fixed.

## 3. A 3% gain is worth up to 16,300 € per truck

### 3.1 The normalised truck

Quantifying the value of the four channels requires a single reference truck, on which the gain can be followed through every metric. For this purpose, I built a *normalised truck*, a European 40-tonne long-haul truck. It averages the Mercedes-Benz eActros 600, the Volvo FH Aero Electric, the MAN eTGX and Scania's long-haul electric truck [2, 3, 4, 5], and its main values are listed in Table 2.

*Table 2. Parameters and baseline results of the normalised truck.*

| Parameter | Value |
| --- | ---: |
| Battery | 640 kWh (90% usable), 4.06 tonnes |
| Energy consumption at 40–42 t | 1.08 kWh/km |
| Payload | 23.8 tonnes |
| Purchase price | about 305,000 €, of which the battery is about 32% |
| Use and electricity | 120,000 km/year over 8 years, 0.22 €/kWh |
| 8-year TCO | about 1.10 million €, of which energy is about 21% |
| Cost per tonne-kilometre | 7.8 euro cents |
| Operating margin and lifetime ROI | 2% and about 7% |

The TCO is close to the ICCT's estimate for a 2023 European electric long-haul truck, about 1.14 € per kilometre here against 1.26 € in the ICCT study [1]. I set the margin low on purpose, to match the sector. French hauliers made a pre-tax margin of 1.4–2.2% in 2022–2023, and 40% of them made a loss [6]. At a 2% margin and a 7% cost of capital, the baseline truck does not quite pay back its capital, with a net present value of about −69,000 €. With so little profit, a small change in cost is a large share of it. The model behind these values, its parameters and its sensitivity are described in the appendix.

On this truck, I compared the three uses of the improvement outlined in section 1, which activate more of the four channels from A to C:
- **A, keep the battery:** the truck uses less electricity, gains range and spends less time charging. This applies to any truck already in service.
- **B, smaller battery with mixed freight:** the battery is downsized to the original range, so the truck becomes cheaper and lighter. 30% of the work is weight-limited.
- **C, smaller battery with heavy freight:** as B, but on weight-limited work such as building materials, liquids, timber or bulk goods, where every kilogram saved becomes cargo.

### 3.2 Results for the three scenarios

The physical quantities follow the improvement almost one to one. Battery capacity, energy per tonne-kilometre and charging time fall by 2.0–4.5% across the 2–4% improvement range. The costs follow much less closely. The cost-only TCO, which leaves out the revenue from extra freight, falls by at most 1.2%, because the driver and the other fixed costs stay. The value of a 3% improvement, including any extra freight revenue, is broken down by source in Figure 3, per truck over 8 years.

<figure class="article-figure article-figure--inspect-mobile article-figure--print" style="--figure-max: 52rem; --figure-inspect-width: 1050px">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect the plot, or <a href="/images/blog/control-software-electric-trucks/part3-fig3-value-by-source.png" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 3: scroll horizontally to inspect the chart">
		<img src="/images/blog/control-software-electric-trucks/part3-fig3-value-by-source.png" alt="Stacked bars of the value of a 3% improvement per truck over 8 years. The electricity saved, 6,600 €, is the same in the three scenarios. Scenario A adds driver time and a small ageing benefit, to 8,100 €, 1.23 times the electricity saved. Scenarios B and C add the smaller battery and the extra freight, which grows from 1,900 € to 6,300 €, to 12,200 € (1.84 times) and 16,300 € (2.46 times). The whiskers span the totals at 2% and 4%." loading="lazy"  />
	</div>
	<figcaption>Figure 3. Value of a 3% efficiency improvement per truck over 8 years, by source, for the three scenarios. The bars below zero are the faster ageing of the smaller battery in scenarios B and C (Appendix B, step 5). The diamonds give the net total and the whiskers the totals at 2% and 4%, and the dotted line marks the electricity saved alone. In scenario C, the parts add up to 16,400 €, and the difference from the total is rounding.</figcaption>
</figure>

The electricity in Figure 3 saves 6,600 € in all three scenarios, and driver time at the charger adds 1,100 €. Above it, the scenarios separate. The smaller battery saves 2,900 € in B and C. The extra freight is worth 1,900 € in B but 6,300 € in C, because only C uses every kilogram saved for cargo. A slightly smaller battery cycles more deeply, which partly offsets these gains through ageing (Appendix B, step 5). A 3% improvement kept as extra range therefore returns 1.23 times its electricity value. Used to specify a smaller battery for heavy freight, it returns 2.46 times, because each kilogram of battery avoided can carry paying freight over eight years. The 2–4% range of Part 2 moves each value by about a third, from 5,500 € in A at 2% to 21,500 € in C at 4%, as the whiskers in Figure 3 show.

The 16,300 € in C is about 1.5% of the normalised truck's 1.10-million-euro TCO, but not all of it reduces that TCO. The extra freight adds revenue and increases the transport work over which costs are spread. **Cost per tonne-kilometre therefore falls by 0.7% when the battery is kept and by up to 1.4% when it is downsized.** Since hauliers compete on this price, it is the change that reaches their customers.

## 4. A thin margin turns small savings into large profit changes

Profit shows what the saving leaves to the haulier, and here the thin margin takes effect. In the model, the truck earns about 140,000 € per year and keeps 2% of it, about 2,800 €, as operating profit, in line with the margins the sector reports [6]. **A 3% improvement with the battery kept is worth about 1,000 € per year, which raises that profit by more than a third.** For a 3% improvement, Figure 4 compares the annual profit and lifetime ROI across scenarios A to C. Its whiskers show the 2–4% improvement range.

<figure class="article-figure article-figure--inspect-mobile article-figure--print" style="--figure-max: 52rem">
	<p class="article-figure__inspection-link" style="margin:0 0 .6rem">Swipe sideways to inspect both plots, or <a href="/images/blog/control-software-electric-trucks/part3-fig4-profit-roi.png" target="_blank" rel="noopener noreferrer">open the full-resolution image</a>.</p>
	<div class="article-figure__scroll" role="region" tabindex="0" aria-label="Figure 4: scroll horizontally to inspect both plots">
		<img src="/images/blog/control-software-electric-trucks/part3-fig4-profit-roi.png" width="3125" height="2150" alt="Two bar charts for the normalised truck. At a 3% efficiency gain, annual operating profit rises by 36%, 55% and 73% in scenarios A, B and C. Lifetime ROI rises by 2.7, 4.1 and 5.5 percentage points from the 7% baseline. Whiskers show the results for 2–4% gains. The labels give annual euros and changes in net present value." loading="lazy" />
	</div>
	<figcaption>Figure 4. Annual operating profit increase (left) and change in lifetime ROI from the 7% baseline (right) in scenarios A to C, at a 3% gain. Whiskers cover 2–4%. The NPV labels give improvements against the baseline NPV of about −69,000 €, not the final NPV.</figcaption>
</figure>

At 3%, profit rises by 36%, 55% and 73% from A to C, and ROI gains 2.7, 4.1 and 5.5 percentage points. NPV improves by 6,000 €, 9,900 € and 13,000 €, but it remains negative at the model's 7% discount rate. The two indicators differ because the 7% baseline ROI is a total over eight years, whereas NPV requires a 7% return *each year*. Hence, the savings make the truck more profitable without, in this baseline, meeting the return required on the invested capital.

### 4.1 The percentage gain depends on the starting margin

The large percentages in Figure 4 come from the margin. The value in euros does not depend on it, but the percentage change in profit does, because it is the annual saving divided by the profit before that saving. A thinner starting margin means less profit to divide by, even when the euros saved stay the same. Figure 5 holds the annual saving fixed and varies only the starting margin between 1% and 5% for a 3% efficiency improvement.

<figure class="article-figure article-figure--responsive article-figure--wide-mobile">
	<picture>
		<source media="(max-width: 720px)" srcset="/images/blog/control-software-electric-trucks/part3-fig5-margin-leverage-mobile.svg" width="360" height="408" />
		<img src="/images/blog/control-software-electric-trucks/part3-fig5-margin-leverage.svg" width="1000" height="560" alt="Three curves of the increase in operating profit against the baseline operating margin, from 1 to 5%. At the 2% margin of the model, a 3% efficiency gain raises profit by 36% with the battery kept, 55% with mixed freight and 73% with heavy freight. At a 5% margin the same gains raise profit by about 14%, 22% and 29%. The sector's 1.4–2.2% margin is shaded." loading="lazy" />
	</picture>
	<figcaption>Figure 5. Increase in operating profit from a 3% efficiency improvement, as a function of the baseline operating margin from 1% to 5%. The annual saving in euros stays fixed within each scenario, and only the starting margin changes. The shaded band is the pre-tax margin of French hauliers in 2022–2023 [6].</figcaption>
</figure>

Within the shaded band of Figure 5, around a 2% margin, 1,000–2,000 € per year raises profit by 36–73%. At a 5% margin, the same euros raise it by about 14–29%. Over the full 2–4% efficiency range, operating profit rises by 24–96% and lifetime ROI by 1.8–7.3 percentage points. The thin margin is a challenge for the haulier, but it also makes a small efficiency gain visible in the profit. For the same reason, a percentage gain in profit cannot be transferred from one fleet to another. The euros saved have to be compared with each fleet's own margin, because the same saving is a smaller share of a more profitable fleet's earnings.

## 5. Control software belongs in the battery decision

Most of the value beyond the electricity comes from battery hardware that is not bought, so the cost of obtaining the gain has to be compared with the cost of that hardware. Every kilowatt-hour of battery is paid for on every truck built, and every kilogram of it is paid for again as lost payload. Control software takes a large engineering effort to develop and validate, as described in [Part 2](/writing/control-software-electric-trucks-part-2-engineering/), but once released, it runs on every truck at almost no additional cost per vehicle. **Consequently, its value grows with the number of trucks, whilst most of its cost is paid once.** Across 10,000 trucks, a 3% improvement used to size the battery is worth 122–163 million € to operators and avoids about 29 million € of battery hardware.

### 5.1 Control performance has to reach the specification

To capture that hardware value, control performance must be available when the battery options are decided. This changes three decisions in how electric trucks are developed and sold:
1. **Know the control performance early:** the battery is sized at the concept stage for the worst case. If the efficiency of the thermal control is only known after the hardware is fixed, the battery is sized for a less efficient truck than the one that will be built.
2. **Value the software in the buyer's units:** presented as "8,000–16,000 € per truck", a thermal control improvement can be compared with the other items of the purchase decision. Presented as "2–4% energy", it cannot.
3. **Match the use of the gain to the application:** routes with few chargers gain most from extra range and shorter charging, price-sensitive fleets from a cheaper battery, and heavy freight from extra payload.

## Summary and conclusions

The 2–4% efficiency gain of [Part 2](/writing/control-software-electric-trucks-part-2-engineering/) reaches a haulier's cost per tonne-kilometre through less electricity, a smaller battery, more payload on weight-limited routes and shorter charging stops.

**A 3% gain is worth 8,100 € per European 40-tonne long-haul truck over 8 years with the battery kept, and up to 16,300 € with a smaller battery and heavy freight.** That is 1.23 and up to 2.46 times the electricity saved. The cost per tonne-kilometre falls by 0.7% when the battery is kept, and by up to 1.4% when the battery is downsized and the mass saved becomes cargo. With an operating margin of about 2%, a haulier earns about 2,800 € per truck and year, and the same savings add 1,000–2,000 € to that profit, an increase of 36–73%. Across the full 2–4% range, the value spans 5,500–21,500 € per truck.

I built this cost model to assess the control strategies I develop both in kilowatt-hours and in euros per tonne-kilometre. These figures exclude the development cost of the software (Appendix A) and the cold-weather and ageing effects that [Part 4](/writing/control-software-electric-trucks-part-4-design/) adds when it asks how early the gain must be known.

## Appendix: limits and model

### A. Limits of the estimate

The figures come from my own cost model. They give the scale of the value for a typical European long-haul truck, not a forecast for a specific vehicle or fleet. Section 2 shows how cost shares vary across applications. The 8,100–16,300 € result in section 3 applies only to the normalised truck, which keeps cost-only TCO and extra freight revenue separate. A 45-minute break is mandatory after 4.5 hours of driving [7], and about 30 minutes of megawatt charging fits within it [8]. Only half of the charging time is therefore counted as paid driver time. The cost of developing the software is not deducted because no public per-vehicle cost is available, so the net value is lower than the estimate.

The larger saving in winter and the slower battery ageing due to better temperature control, described in [Part 1](/writing/control-software-electric-trucks-part-1-context/), are not included either. They add to the estimate, and [Part 4](/writing/control-software-electric-trucks-part-4-design/) quantifies them. The cycling and calendar ageing in step 5 below *are* included.

### B. The model and its assumptions

The model calculates the costs and the revenue of one truck year by year over 8 years, with and without an efficiency improvement *g*. The difference between the two runs is the value of the improvement. The model is simple by design, so that every result can be traced back to six steps:

1. **Energy:** the truck does the same work with less energy, $c_1 = c_0/(1+g)$, with $c_0 = 1.08$ kWh/km. A 10% improvement therefore reduces consumption by 9.1%, so larger gains return slightly less than in proportion.
2. **Battery:** in scenario A, the battery stays at 640 kWh. In scenarios B and C, it shrinks with the consumption, $E_1 = E_0 \cdot c_1/c_0$, so that the range is unchanged. This treats the battery as continuously sizeable, which holds for new models but not for trucks in service (section 2.2).
3. **Mass and payload:** the payload is what remains of the 42-tonne limit after the tractor (7.1 t), the trailer (7.0 t) and the battery. On a weight-limited trip, the saved battery mass becomes cargo. On any other trip, the truck is lighter, and its consumption falls with a mass sensitivity ε relative to the average operating mass of 32 tonnes.
4. **Charging:** the charging power is the lowest of the limits of the charger (1,000 kW), the truck (750 kW [2, 4]) and the battery (1.4 C, about 900 kW), reduced by a factor of 0.85 towards full charge (model assumption). The result is about 640 kW. Half of the charging time is paid as driver time at 45 €/h.
5. **Ageing and resale:** the capacity fades by 20% after 4,000 full equivalent cycles plus 1% per year. A smaller battery cycles more deeply for the same distance and ages slightly faster, which gives the negative bars of scenarios B and C in Figure 3. After 8 years, the truck without its battery keeps 15% of its value, and the battery 50% of its new price, scaled down as its health approaches 70%.
6. **Revenue and indicators:** the revenue is set so that the baseline truck makes a 2% operating margin, and extra payload earns an additional rate per tonne-kilometre on loaded, weight-limited kilometres. Table 3 defines the indicators and how revenue differs from TCO. NPV discounts the cash flows at 7% per year. The other totals are undiscounted.

*Table 3. Calculation of the economic indicators.*

| Indicator | Calculation |
| --- | --- |
| TCO | Purchase price + 8 × annual running costs − residual value. Extra freight revenue does not reduce TCO. |
| Cost per tonne-kilometre | TCO ÷ the sum of (tonnes carried × kilometres driven) on loaded trips over 8 years |
| Operating profit per year | Revenue − running costs − depreciation (purchase price less residual value, spread over 8 years) |
| Lifetime ROI | Sum of all cash flows, including purchase and resale, relative to purchase price |
| NPV | The same cash flows, discounted at 7% per year |
| Value per truck | Electricity, battery cost, payload revenue, paid charging time and net ageing/resale benefit, over 8 years |

The truck is loaded on 85% of its kilometres. Weight-limited trips carry the full payload, and the other trips 60% of it. The parameter values are listed in Table 4, where "assumption" marks my own choices where no public source was found.

*Table 4. Model parameters and the basis for each value.*

| Parameter | Value | Basis |
| --- | ---: | --- |
| Truck life | 8 years, 120,000 km/year | Typical first-owner use (assumption) |
| Battery | 640 kWh, 90% usable | Average of four European long-haul trucks [2, 3, 4, 5] |
| Consumption | 1.08 kWh/km at 40–42 t | Same trucks, eActros 600 measured 1.03 kWh/km [4] |
| Pack energy density | 157.5 Wh/kg | Market mix of LFP, NMC811 and NMC622 at pack level |
| Pack cost | 154 €/kWh | Between the all-applications average [9] and about 220 €/kWh for commercial vehicles [1] |
| Vehicle without battery | 206,000 €, 7.1 t | Assumption |
| Trailer and weight limit | 7.0 t, 42 t | EU 40 t limit plus 2 t for zero-emission trucks (Part 1) |
| Electricity | 0.22 €/kWh | Long-haul charging cost of 0.20–0.22 €/kWh excluding VAT [1] |
| Driver, maintenance, insurance | 55,000 €/year, 0.08 €/km, 8,000 €/year | Assumptions for Western Europe |
| Battery life | 4,000 full cycles to 80% health, 1%/year calendar fade | Market-mix estimate |
| Weight-limited share | 30% (B), 100% (C) | Assumption |
| Revenue | 1.17 €/km (1.37 € per loaded km) | Sector margins of 1.4–2.2% [6], contract rates of 1.23–2.22 €/km [10] |
| Extra-payload rate | 0.065 €/tkm | Assumption |
| Mass sensitivity ε | 0.5 | Measured about 0.4–0.65 for heavy trucks [11, 12] |
| Discount rate | 7% | Assumption |

The fleet study of section 2 uses the same six steps with the battery, consumption, payload and use profile of each truck.

### C. How sensitive the results are

To test the assumptions, I varied each one on its own and recalculated the value of a 3% improvement per truck over 8 years. The results are listed in Table 5, where each cell gives the value at the low and the high end of the assumption.

*Table 5. Sensitivity of the value of a 3% improvement per truck over 8 years to each assumption.*

| Assumption | Low / high value | A: keep battery | B: mixed freight | C: heavy freight |
| --- | --- | ---: | ---: | ---: |
| Reference |  | 8,100 € | 12,200 € | 16,300 € |
| Electricity price | 0.15 € / 0.35 € per kWh | 6,000 / 12,100 | 10,000 / 16,300 | 14,200 / 20,300 |
| Distance per year | 90,000 / 150,000 km | 6,100 / 10,200 | 9,600 / 14,800 | 12,700 / 19,900 |
| Extra-payload rate | 0.045 € / 0.085 € per tkm | unchanged | 11,600 / 12,800 | 14,400 / 18,200 |
| Battery cost | 110 € / 220 € per kWh | 8,000 / 8,300 | 11,600 / 13,200 | 15,700 / 17,300 |
| Charger power | 400 / 1,000 kW | 9,100 / 8,100 | 13,200 / 12,200 | 17,300 / 16,300 |
| Weight-limited share (B) | 15% / 50% | unchanged | 11,300 / 13,400 | n/a |
| Mass sensitivity ε | 0.3 / 0.7 | unchanged | 12,100 / 12,400 | 16,300 / 16,300 |

The electricity price and the annual distance move the result most, because together they set how much energy the improvement saves. Even at their low ends, a 3% improvement is still worth 6,000–14,200 € per truck. To apply the model to another fleet, check these two inputs first. The extra-payload rate is the most uncertain economic assumption and decides most of the difference between scenarios B and C. A slower charger makes the improvement worth more, because every kilowatt-hour takes longer to put back. The ranking of the scenarios holds for every value tested.

## References

1. ICCT, A total cost of ownership comparison of truck decarbonization pathways in Europe, 2023. https://theicct.org/publication/total-cost-ownership-trucks-europe-nov23/
2. electrive, New generation MAN eTGX unveiled with 720 km range, September 2026. https://www.electrive.com/2026/09/14/new-generation-man-etgx-unveiled-with-720-km-range/
3. Scania, Scania enables electric long-haul with up to 720 km range. https://www.scania.com/group/en/home/newsroom/press-releases/press-release-detail-page.html/5424916-scania-enables-electric-long-haul-with-up-to-720-km-range
4. Daimler Truck, Mercedes-Benz Trucks hands over first series-produced eActros 600 to customers in Germany, December 2024. https://www.daimlertruck.com/en/newsroom/pressrelease/mercedes-benz-trucks-hands-over-first-series-produced-eactros-600-to-customers-in-germany-52938275
5. electrive, Volvo Trucks boosts net battery capacity to record level, June 2026. https://www.electrive.com/2026/06/11/volvo-trucks-boosts-net-battery-capacity-to-record-level/
6. Upply Market Insights, Transport routier français : le bilan 2023 révèle l'érosion des marges (Banque de France data), 2024. https://market-insights.upply.com/fr/transport-routier-fran%C3%A7ais-le-bilan-2023-revele-lerosion-des-marges
7. European Commission, DG MOVE, Driving time and rest periods (Regulation (EC) No 561/2006). https://transport.ec.europa.eu/transport-modes/road/social-provisions/driving-time-and-rest-periods_en
8. W. Shoman, S. Yeh, F. Sprei, P. Plötz, D. Speth, Battery electric long-haul trucks in Europe: Public charging, energy, and power requirements, *Transportation Research Part D*, 121, 103825, 2023. https://doi.org/10.1016/j.trd.2023.103825
9. BloombergNEF, Lithium-ion battery pack prices fall to $108 per kilowatt-hour despite rising metal prices, December 2025. https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/
10. Upply, Ti and IRU, European Road Freight Rate Benchmark Q4 2025, 2026. https://ti-insight.com/wp-content/uploads/2026/02/Q4-2025-European-Road-Freight-Rate-Benchmark-Report-Ti-Upply-IRU.pdf
11. Le Corguillé, J., Hacker, F., Göckeler, K., Mottschall, M., Dolinga, T., Real-world data analysis of energy consumption, activity and charging patterns of battery electric trucks operating in Germany, Öko-Institut, 2025. https://www.oeko.de/fileadmin/oekodoc/Real-world-data-analysis-of-battery-electric-trucks.pdf
12. A. Shiledar et al., Assessing geographical and seasonal influences on energy consumption and driving range for electric drayage trucks, *SAE International Journal of Electrified Vehicles*, 15(3), 253–273, 2026. https://doi.org/10.4271/14-15-03-0013

*The model and all its assumptions are described in Appendix B. Tolls, subsidies and carbon prices are excluded. No confidential data is disclosed.*
