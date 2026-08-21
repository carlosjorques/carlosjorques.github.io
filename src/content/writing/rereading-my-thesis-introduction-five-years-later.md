---
title: "Rereading My Thesis Introduction, Five Years Later"
subtitle: "What happened to the diesel engine's challenges between 2021 and 2026, and what I would write differently today"
description: A retrospective on the global context and motivation chapter of my 2021 PhD thesis. How the emissions legislation, the electrification of trucks, hydrogen, and biofuels actually evolved, which predictions held, which did not, and why closed-loop combustion control still matters.
publishDate: 2026-07-07
readingTime: 14 min read
category: Control Algorithms & Diagnostics
tags:
  - Diesel engines
  - Emissions legislation
  - Euro 7
  - Renewable fuels
  - Electrification
  - PhD research
featured: true
draft: true
---

Every thesis begins with a chapter that justifies its existence. Mine opened with the state of road transport in 2021: fossil fuels supplying 95% of transport energy, diesel powering more than 90% of road freight, batteries too heavy and too expensive for long-haul trucks, hydrogen waiting for infrastructure, and biofuels as the realistic bridge. On that foundation I built the case for [in-cycle closed-loop combustion control](/writing/controlling-combustion-while-it-happens/): if engines could measure their own combustion and correct it in real time, they could run efficiently and cleanly on fuels whose properties vary, under legislation that keeps tightening.

Five years is a good distance for an honest look back. Some of what I wrote in 2021 has aged well. Some of it has been overtaken by events I did not see coming, at least not at this speed. And one assumption at the center of the chapter, the one almost everyone in the field shared, has quietly collapsed.

This article is that look back: claim by claim, what held, what broke, why it broke, and what I would write if I had to produce the same introduction today.

## What I wrote in 2021

The argument of the introduction chapter ran like this ([Jorques Moreno, 2021](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf), Chapter 1):

Transport and economic growth are intrinsically linked, and both keep growing. Fossil fuels supplied 95% of transport energy. In Europe, transport accounted for 27% of greenhouse gas emissions, 74% of that from road transport, and road freight alone produced 7% of global energy-related CO2. Diesel engines represented more than 90% of road freight powertrains, and, citing the IEA's Future of Trucks analysis, I wrote that "even as late as 2050, most trucks in the global fleet are still expected to use Diesel ICE."

On the alternatives: batteries had limited market penetration in heavy-duty because of range, durability, and cost, and the IEA's Sustainable Development Scenario estimated the equivalent of 33 Tesla Gigafactories would be needed by 2070 to equip heavy trucks. Hydrogen was a flexible energy carrier whose fate depended crucially on infrastructure that did not exist. Biofuels were therefore the realistic decarbonization path for long-haul, projected at 17% of final energy demand by 2060 in the IEA's two-degree scenario.

On legislation: the coming Euro VII was expected to include emission standards under real driving conditions, which, together with the fuel-property spread of biofuels, would demand engines that adapt rather than engines calibrated once at the factory.

And on sensing: cylinder pressure sensors, the enabling measurement for everything in the thesis, were common in research but too expensive for production vehicles, though their control and diagnostics potential "might" bring them to future production engines.

## The scorecard

<div class="comparison-table" role="region" aria-label="2021 thesis claims compared with the situation in 2026" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">What I wrote in 2021</th>
        <th scope="col">Where we are in 2026</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Most trucks still diesel even in 2050</th>
        <td>No longer the plan, and no longer the trend. The EU now mandates a 90% CO2 cut for new heavy-duty vehicles by 2040. Electric trucks reached 9% of global truck sales in 2025; in China, one truck in four.</td>
      </tr>
      <tr>
        <th scope="row">Batteries limited by range, life, and cost for heavy-duty</th>
        <td>Still true for long-haul, but eroding fast: battery prices fell 8% in 2025 alone, and electric heavy freight trucks reached cost-of-ownership parity with diesel in parts of China.</td>
      </tr>
      <tr>
        <th scope="row">Hydrogen depends crucially on infrastructure</th>
        <td>Confirmed, painfully. Refueling infrastructure underdelivered, flagship truck programs slipped to the 2030s, and the most prominent hydrogen truck startup went bankrupt.</td>
      </tr>
      <tr>
        <th scope="row">Biofuels are the bridge for long-haul</th>
        <td>Biofuel demand keeps growing, but the bridge is being rerouted: renewable diesel grows mostly in advanced economies under feedstock constraints, and aviation is becoming its priority customer.</td>
      </tr>
      <tr>
        <th scope="row">Euro VII will test real driving conditions</th>
        <td>Partly fulfilled. Euro 7 extends real-driving testing and lifetime compliance to all vehicle categories, but the pollutant limits for cars were frozen at Euro 6 levels, while heavy-duty limits tightened substantially.</td>
      </tr>
      <tr>
        <th scope="row">Pressure sensors might reach production vehicles</th>
        <td>They did, first in a gasoline engine: Mazda's Skyactiv-X shipped the world's first mass-produced automotive cylinder pressure sensors, one per cylinder, doing in production what my thesis did on the test bench.</td>
      </tr>
    </tbody>
  </table>
</div>

The rest of this article is the story behind that table.

## The legislation that actually arrived

In 2021, Euro VII was a rumor with a direction. What arrived, [Regulation (EU) 2024/1257](https://eur-lex.europa.eu/eli/reg/2024/1257/oj), adopted in April 2024, is instructive in both what it demands and what it dropped.

For passenger cars, the final Euro 7 kept the Euro 6 exhaust limits essentially unchanged after intense industry and political pressure, extending only the particle count down to 10 nanometers. Anyone who followed the original Commission proposal knows how much was negotiated away. For heavy-duty engines, however, the tightening was real: the NOx limit falls from 0.4 to 0.08 g/kWh on the steady-state cycle, and pollutants that Euro VI never regulated, such as nitrous oxide and ammonia, now carry limits ([DieselNet's summary](https://dieselnet.com/standards/eu/hd.php) tabulates the changes). The regulation applies to new heavy-duty types from May 2028.

The prediction I made in the thesis was fulfilled in structure more than in numbers. Euro 7 requires real driving emissions testing for every vehicle category, introduces continuous on-board monitoring that flags exceedances during the vehicle's life, and stretches the compliance horizon dramatically: a heavy truck must now stay within its limits for 700,000 kilometers or 12 years of its main lifetime, with an additional lifetime beyond that. Compliance stopped being an event at type approval and became a property the engine must maintain for over a decade of aging, fuel variation, and wear.

That is precisely the world the thesis argued for. A pre-calibrated open-loop engine meets a decade-long real-driving requirement only with margins; an engine that observes its own combustion can meet it by adapting. I did not predict the political dilution of the car limits, but the deeper shift, from certifying a test cycle to owning real-world behavior over the vehicle's life, arrived on schedule.

What I did not anticipate was the second regulation. In 2021 there was no CO2 endgame for trucks. [Regulation (EU) 2024/1610](https://eur-lex.europa.eu/eli/reg/2024/1610/oj) created one: new heavy-duty vehicle fleets must cut CO2 by 45% by 2030, 65% by 2035, and 90% by 2040, relative to 2019, with 90% of new urban buses zero-emission by 2030 ([Commission Q&A](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/qanda_24_2527/QANDA_24_2527_EN.pdf)). The regulation is technology-neutral on paper, allowing hydrogen combustion among the compliance paths, but a 90% cut is, in practice, an instruction to stop selling diesel trucks in Europe within fifteen years.

The sentence "most trucks in the global fleet are still expected to use Diesel ICE even in 2050" was the consensus reading of the best scenarios available in 2021. For the European new-vehicle market, it did not survive three years of legislation.

## The electrification surprise

The deeper reason the consensus broke was not European legislation. It was Chinese economics.

In 2025, global electric truck sales exceeded 400,000 vehicles, doubling year-on-year and reaching 9% of all truck sales worldwide ([IEA Global EV Outlook 2026](https://www.iea.org/reports/global-ev-outlook-2026/trends-in-other-ev-modes)). More than 90% of those sales were in China, where one in four new trucks was electric, and where electric heavy freight trucks jumped from 13% to 28% of their segment in a single year. Battery-electric vehicles took 97% of those sales; the plug-in hybrid truck barely exists. Crucially, this is no longer subsidy-only economics: the IEA reports that battery-electric heavy trucks in China have reached total-cost-of-ownership parity with diesel in typical five-year ownership cases, helped by battery prices that fell another 8% in 2025 and a scrappage scheme that pays for replacing old diesels.

The caveats matter, and they are the honest part of the story. Chinese electric trucks concentrate on short, predictable routes around ports, mines, and steel plants, often with battery swapping. Outside China, adoption remains a fraction of that, and the purchase price of an electric truck is still two to three times its diesel equivalent. Long-haul, the duty cycle my thesis worried about, is still the hardest case, and Europe has only just passed 1,000 dedicated truck charging points. The IEA's current-policy projection is 20% global electric truck share by 2035, which still leaves most trucks sold, and the overwhelming majority of trucks on the road, burning fuel deep into the 2040s.

But the direction and the speed are not what 2021's scenarios described. The 33-Gigafactories framing I quoted, with its 2070 horizon, reads today like a signal of how distant battery scale seemed then. Global lithium-ion manufacturing capacity passed 4 terawatt-hours per year in 2025, and EV battery deployment reached 1.2 TWh, seven times the 2020 level ([IEA](https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-batteries)). The manufacturing base that the Sustainable Development Scenario placed decades away is being built now, mostly in China, and mostly with LFP chemistry that barely featured in the 2021 conversation.

If I am honest with my 2021 self: I treated battery limitations as physics, when a large part of them was production scale and price, and scale curves move faster than physics.

## The hydrogen lesson

On hydrogen, the thesis was cautious, and the caution was the correct call. I wrote that hydrogen's fate depended crucially on supporting infrastructure. Five years later, that dependency decided the outcome.

Daimler Truck, the manufacturer with the most credible heavy-duty fuel-cell program, postponed series production of its GenH2 truck from the late 2020s to the early 2030s, stating plainly that "the expansion of hydrogen refuelling stations is progressing much more slowly than expected" ([electrive, July 2025](https://www.electrive.com/2025/07/09/austerity-measures-at-daimler-truck-investment-in-battery-trucks-capped-h2-truck-postponed/)); its US stablemates Kenworth and Peterbilt delayed their fuel-cell tractors the same year ([Transport Topics](https://www.ttnews.com/articles/daimler-truck-hydrogen-fuel)). Nikola, the startup that once symbolized hydrogen trucking, filed for Chapter 11 in February 2025 ([Reuters](https://www.reuters.com/business/autos-transportation/struggling-e-truck-maker-nikola-files-chapter-11-bankruptcy-protection-2025-02-19/)). The pattern is the chicken-and-egg problem the thesis described, resolved in the discouraging direction: without vehicles, stations close; without stations, vehicles have no case.

I would not write hydrogen off for all of transport, and the EU's truck CO2 regulation deliberately keeps the door open. But in 2021 I presented batteries and hydrogen as parallel uncertainties for heavy-duty. In 2026 they are no longer parallel: one scaled, the other slipped a decade.

## The biofuel rebalancing

The thesis's central bet was that biofuels would carry long-haul decarbonization while electrification matured, and that engines would need to handle their property variation. How did that age?

Biofuel demand has kept growing, and the IEA's latest outlook actually revised its 2030 projections upward, with an accelerated case reaching 310 billion litres per year ([IEA Renewables 2025](https://www.iea.org/reports/renewables-2025/renewable-transport)). Renewable diesel, the drop-in HVO type my thesis tested, expanded strongly in Europe and North America, and roughly 70% of it is made from wastes and residues ([IEA](https://www.iea.org/reports/renewables-2023/transport-biofuels)). The fuel-flexibility problem the thesis addressed is a production reality today: an engine sold in Europe genuinely cannot know whether it will burn fossil diesel, HVO, or a blend.

But two things changed in the framing. First, feedstock became the recognized ceiling: waste fats and oils are finite, and the growth of renewable diesel is constrained less by engine technology than by what can sustainably feed the refineries. Second, aviation moved to the front of the queue. Sustainable aviation fuel mandates now compete for the same feedstocks, and aircraft have no battery option on the horizon, which makes them the natural priority customer for scarce renewable molecules. The long-term logic is shifting from "biofuels keep trucks running" toward "biofuels go where electrons cannot," which increasingly means wings and ships rather than wheels.

For the remaining combustion fleet, that makes fuel-adaptive control more relevant, not less: the fuels reaching engines will be more diverse and more variable than in 2021, precisely because the premium molecules are being routed elsewhere. It is telling that the most direct recent continuation of my thesis premise is a TU Wien study applying [cylinder-pressure-based combustion control to aviation engines running sustainable aviation fuels](https://doi.org/10.4271/2026-01-5028): the fuel changed, the aircraft changed, the argument did not.

## What survived: the case for feedback

So do the same challenges remain? Rereading the introduction, the specific numbers have moved, one central assumption failed, but the engineering argument survived intact, and in three ways got stronger.

First, the sensor prediction came true, from an unexpected direction. Mazda's Skyactiv-X gasoline engine went into production with what its engineers describe as the world's first mass-produced automotive cylinder pressure sensor, one per cylinder, feeding a combustion model that is corrected every cycle ([Mazda Technical Review, 2019](https://www.mazda.com/content/dam/mazda/corporate/mazda-com/ja/pdf/innovation/monozukuri/technology/tech-review/2019/2019_no009.pdf); the sensors are supplied in volume by [Citizen Finedevice](https://cfd.citizen.co.jp/english/sensor/on_board1)). Production sensor development has continued since ([Vollberg et al., 2022](https://doi.org/10.5194/jsss-11-1-2022)). What my thesis did with laboratory transducers and an FPGA, a production car now does at showroom prices. The "might" I wrote in 2021 resolved to yes.

Second, the legislation moved toward feedback. Euro 7's on-board monitoring, real-driving testing, and decade-long compliance horizons reward engines that can observe and correct themselves, exactly the capability the thesis built. Margins are a fixed cost paid every cycle; feedback is the mechanism that removes them. That trade got more valuable between 2021 and 2026, not less.

Third, the methods outlived their first application. The [research building on this work](/writing/controlling-combustion-while-it-happens/) now spans marine engines, dual-fuel combustion, reinforcement-learning engine control, and sustainable aviation fuels. Diesel truck engines were the vehicle of the thesis, not its content. Its content was making a fast physical process observable, diagnosable, and correctable in real time under hard timing constraints, and that problem exists in every powertrain that will still burn something in 2040, and in several that will not.

## If I rewrote the introduction today

The honest exercise, and the reason I wrote this article. What stays, what changes?

**What would stay.** The climate framing, essentially unchanged: transport remains overwhelmingly fossil-fueled, freight demand keeps growing, and the fleet on the road turns over slowly. The biofuel variability argument, now with production HVO instead of laboratory blends. The legislation argument, strengthened: lifetime real-driving compliance is now written law. The core control thesis, word for word: when operating conditions and fuels are uncertain, feedback beats margins.

**What would change.** The 2050 diesel-majority sentence would go, replaced by a differentiated picture: battery-electric trucks winning depot and regional duty cycles at Chinese speed, long-haul contested through the 2030s, and legislation in Europe pointing at 90% CO2 reduction by 2040. Hydrogen would move from "parallel option" to "delayed option, infrastructure-limited." Biofuels would be reframed around feedstock scarcity and the aviation pull. And I would add a sentence 2021-me did not know to write: that scenario documents age faster than engineering arguments, so a thesis should anchor its motivation in the mechanism it enables, not in any single forecast.

**What the volatility itself teaches.** The most recent turn makes the point. In December 2025 the European Commission proposed softening the 2035 car CO2 target from 100% to 90%, with compensation credits for renewable fuels and low-carbon steel, keeping plug-in hybrids and range extenders alive beyond 2035 ([European Commission Automotive Package](https://transport.ec.europa.eu/transport-themes/action-plan-future-automotive-sector/automotive-package_en); the proposal still has to survive Parliament and Council). Five years ago the ban was unthinkable; three years ago it was law; today it is being renegotiated. Anyone building a decade-long research program on top of transport policy should assume the policy will change underneath it, and choose problems that stay valuable in every version of the future. Combustion that measures itself turned out to be one of them.

## The takeaway

The introduction chapter of my thesis made one claim that failed, several that held, and one that mattered more than I knew.

The failed claim was the diesel-forever consensus, broken by Chinese battery economics and European CO2 law in roughly equal measure. The claims that held were the cautious ones: hydrogen's infrastructure dependency, biofuel variability, and legislation's march toward real-world, lifetime compliance.

The claim that mattered was never really about diesel. It was that engines operating under uncertainty should observe their own behavior and correct it, instead of trusting a calibration made years earlier in a cleaner world. Five years on, that principle has outlived the fuel forecasts, survived a legislative rewrite, reached production hardware, and migrated to ships and aircraft.

Forecasts expire. Feedback compounds. If I have one sentence for the next PhD student writing their motivation chapter, it is that one.

## Part of the series: In-Cycle Combustion Control

1. [Controlling Combustion While It Happens](/writing/controlling-combustion-while-it-happens/) (the overview)
2. [Virtual Sensing for In-Cycle Combustion Diagnostics](/writing/virtual-sensing-in-cycle-combustion-diagnostics/)
3. [Stochastic Fault Detection and Diagnostic Decision Logic](/writing/stochastic-fault-detection-diagnostic-decision-logic/)
4. [Predictive In-Cycle Combustion Control](/writing/predictive-in-cycle-combustion-control/)
5. [Stochastic Set-Point Optimization for Efficiency](/writing/stochastic-set-point-optimization-efficiency/)
6. [Real-Time Combustion Control Implementation](/writing/real-time-combustion-control-implementation/)
7. Rereading My Thesis Introduction, Five Years Later (this article)

## References

1. Jorques Moreno, C. (2021). *Design and Optimization of In-Cycle Closed-Loop Combustion Control with Multiple Injections*. PhD thesis, Lund University. [Full text PDF](https://lup.lub.lu.se/search/files/96902493/PhD_Thesis_Open.pdf) | [Lund University research portal](https://portal.research.lu.se/en/publications/design-and-optimization-of-in-cycle-closed-loop-combustion-contro/)
2. Regulation (EU) 2024/1257 of 24 April 2024 (Euro 7). [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1257/oj); summary at [EUR-Lex summaries](https://eur-lex.europa.eu/EN/legal-content/summary/vehicle-emissions-and-battery-durability-euro-7-technical-requirements-and-certification-rules.html)
3. DieselNet. "Emission Standards, Europe: Heavy-Duty Truck and Bus Engines." [dieselnet.com](https://dieselnet.com/standards/eu/hd.php)
4. Regulation (EU) 2024/1610 of 14 May 2024 (CO2 emission standards for heavy-duty vehicles). [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1610/oj)
5. European Commission (2024). "Questions and Answers: Revised CO2 emission standards for Heavy-Duty Vehicles." [ec.europa.eu](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/qanda_24_2527/QANDA_24_2527_EN.pdf)
6. IEA (2026). *Global EV Outlook 2026*: [Trends in other EV modes](https://www.iea.org/reports/global-ev-outlook-2026/trends-in-other-ev-modes); [Electric vehicle batteries](https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-batteries); [Executive summary](https://www.iea.org/reports/global-ev-outlook-2026/executive-summary)
7. Randall, C. (2025). "Austerity measures at Daimler Truck: investment in battery trucks capped, H2 truck postponed." *electrive*. [electrive.com](https://www.electrive.com/2025/07/09/austerity-measures-at-daimler-truck-investment-in-battery-trucks-capped-h2-truck-postponed/)
8. Greenhalgh, K. (2025). "Daimler Truck's Hydrogen Fuel Cell Tractor Takes Next Step." *Transport Topics*. [ttnews.com](https://www.ttnews.com/articles/daimler-truck-hydrogen-fuel)
9. Sriram, A. (2025). "Nikola goes bankrupt, to sell assets in latest EV market turmoil." *Reuters*. [reuters.com](https://www.reuters.com/business/autos-transportation/struggling-e-truck-maker-nikola-files-chapter-11-bankruptcy-protection-2025-02-19/)
10. IEA (2025). *Renewables 2025: Renewable transport*. [iea.org](https://www.iea.org/reports/renewables-2025/renewable-transport)
11. IEA (2023). *Renewables 2023: Transport biofuels*. [iea.org](https://www.iea.org/reports/renewables-2023/transport-biofuels)
12. Kleissner, F., Hofmann, P. (2026). "Potential of an In-Cylinder Pressure-Based Combustion Control for Compression Ignition Aviation Engines Operated with Sustainable Aviation Fuels." SAE Technical Paper 2026-01-5028. [DOI: 10.4271/2026-01-5028](https://doi.org/10.4271/2026-01-5028)
13. Mazda Motor Corporation (2019). "Control System of SKYACTIV-X." *Mazda Technical Review* No. 36. [mazda.com](https://www.mazda.com/content/dam/mazda/corporate/mazda-com/ja/pdf/innovation/monozukuri/technology/tech-review/2019/2019_no009.pdf); see also [Mazda UK press pack on e-Skyactiv X](https://mazdamediapacks.com/en/technology/press-releases/e-skyactiv-x-engine-technology.html) and supplier documentation by [Citizen Finedevice](https://cfd.citizen.co.jp/english/sensor/on_board1)
14. Vollberg, D., Gibson, P., Schultes, M., Groh, J., Heinze, H. (2022). "Smart in-cylinder pressure sensor for closed-loop combustion control." *Journal of Sensors and Sensor Systems* 11. [DOI: 10.5194/jsss-11-1-2022](https://doi.org/10.5194/jsss-11-1-2022)
15. European Commission (2025). "Automotive Package," presented 16 December 2025. [transport.ec.europa.eu](https://transport.ec.europa.eu/transport-themes/action-plan-future-automotive-sector/automotive-package_en); proposal COM(2025) 995 on the revision of CO2 standards for cars and vans. [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A52025PC0995)
16. European Commission, Climate Action. "Cars and vans: CO2 emission performance standards," including Regulation (EU) 2025/1214 on 2025-2027 compliance averaging. [climate.ec.europa.eu](https://climate.ec.europa.eu/eu-action/transport-decarbonisation/road-transport/cars-and-vans_en)
