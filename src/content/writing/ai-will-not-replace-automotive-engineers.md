---
title: "AI Will Not Replace Automotive Engineers"
subtitle: "It will expose weak engineering systems."
description: A technical leadership article on why AI can accelerate automotive software development only when architecture, validation, ownership, and engineering judgment are strong.
publishDate: 2026-07-03
readingTime: 10 min read
category: Technical Leadership
tags:
  - Artificial intelligence
  - Automotive software
  - Software-defined vehicles
  - Embedded control
  - Technical leadership
featured: true
draft: true
---

Will AI replace automotive software engineers?

That is the wrong question.

The better question is whether automotive organizations are ready to absorb AI-accelerated engineering output without increasing rework, validation debt, safety risk, and architectural noise.

This series, introduced in [The Automotive Industry Has a Speed Problem, and Software Is Where It Shows](/writing/automotive-industry-speed-problem/), makes two arguments before this one. [The first](/writing/real-cost-of-automotive-software-speed/) is that speed in software-defined physical systems is not code volume. It is learning from the machine. [The second](/writing/externalization-trap-software-defined-world/) is that speed is lost when organizations externalize ownership of the learning loop. This article is about what happens when AI enters that system.

AI tests whether the organization is strong enough to absorb faster output.

If architecture, validation, ownership, and engineering judgment are strong, AI can make teams faster.

If those foundations are weak, AI can make the organization noisier.

AI can write code.

It cannot own vehicle behavior.

## The thesis in 60 seconds

<div class="comparison-table" role="region" aria-label="AI and automotive engineering thesis summary" tabindex="0">
  <table>
    <tbody>
      <tr>
        <th scope="row">AI accelerates output</th>
        <td>It can generate code, tests, documentation, summaries, and analysis faster than traditional workflows.</td>
      </tr>
      <tr>
        <th scope="row">Validation remains the bottleneck</th>
        <td>More output is not useful if the organization cannot validate it safely.</td>
      </tr>
      <tr>
        <th scope="row">Ownership still matters</th>
        <td>AI can suggest changes, but engineers own system behavior.</td>
      </tr>
      <tr>
        <th scope="row">Tool sprawl creates non-repeatability</th>
        <td>If every developer uses different prompts, models, IDEs, agents, and private workflows, results become difficult to reproduce, review, and certify.</td>
      </tr>
      <tr>
        <th scope="row">Junior engineers still matter</th>
        <td>If companies stop training juniors because AI handles entry-level work, they damage their future senior-engineering pipeline.</td>
      </tr>
    </tbody>
  </table>
</div>

<figure class="article-figure image-placeholder">
  <div class="image-placeholder__frame" role="img" aria-label="Placeholder for an engineer reviewing AI-suggested code beside traces, requirements, HIL or SIL evidence, and a physical vehicle or machine.">
    Image placeholder: engineer reviewing AI-suggested code beside traces, requirements, HIL/SIL evidence, and a physical vehicle or machine.
  </div>
  <figcaption>A suitable image would show AI output being checked against evidence and physical-system behavior, not a generic robot image.</figcaption>
</figure>

## AI is useful engineering leverage

AI is useful. That should be said clearly.

In software engineering, it can help with boilerplate generation, unit test generation, requirements review, inconsistency detection, log and trace summarization, diagnostic assistant workflows, calibration data exploration, code review support, simulation scenario generation, CI/CD failure triage, documentation, design summaries, and knowledge retrieval across internal engineering repositories.

[GitHub's Copilot material](https://github.blog/ai-and-ml/github-copilot/a-developers-guide-to-writing-debugging-reviewing-and-shipping-code-faster-with-github-copilot/) frames AI coding assistants around writing, debugging, reviewing, and shipping code faster. That is a reasonable description of where these tools can help.

The adoption curve also shows that AI is already normal engineering infrastructure. The [Stack Overflow 2025 Developer Survey](https://survey.stackoverflow.co/2025/ai/) reports that 47.1% of respondents use AI tools daily and 17.7% use them weekly. Among professional developers, daily usage is even higher at 50.6%.

But the same survey also gives the caution. More developers distrust the accuracy of AI tool output than trust it: 46% distrust versus 33% trust, with only 3.1% reporting high trust.

That is the right emotional posture for automotive engineering.

Use the tools.

Do not surrender judgment to them.

## Automotive is different from generic software

In automotive, the main question is not whether the code compiles.

The questions are more physical:

- Does the control behavior remain stable?
- Does timing still hold?
- Is the feature safe under degraded sensor conditions?
- Does it interact with diagnostics?
- Does it affect thermal or energy limits?
- Does it preserve calibration assumptions?
- Does it behave correctly across variants?
- Does it remain deterministic?
- Can it be validated, traced, and released safely?
- Can it be updated or rolled back in the field?

In automotive, software is not finished when the code is generated. It is finished when the behavior is understood, validated, and safe enough to release.

That is why AI governance matters. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), the [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), [ISO/IEC 42001](https://www.iso.org/standard/42001), and the [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) all point in the same practical direction: AI systems need lifecycle control, risk management, monitoring, security, and governance.

For software-defined physical systems, that governance is not bureaucracy for its own sake.

It is how organizations protect traceability, repeatability, safety, cybersecurity, and release confidence.

## AI moves work from creation to supervision

AI changes the shape of engineering work.

It moves part of the work from writing every line manually toward directing, evaluating, correcting, and validating AI output.

The longitudinal study [The Impact of AI Coding Assistants on Software Engineering](https://arxiv.org/abs/2605.23135) found that developers reported spending less time on many development tasks, with 82% reporting less time writing code. The authors describe a shift toward "supervisory engineering work": directing, evaluating, and correcting AI output.

That shift is not a problem by itself.

In automotive embedded control, supervisory work is not optional. It is where safety, timing, diagnostics, calibration, and physical behavior are protected.

The danger is pretending that supervision is cheap.

Reviewing generated code can be harder than writing code if the reviewer has to reconstruct intent, check hidden assumptions, validate interactions, and prove the change is safe across variants.

AI can reduce creation time.

It can also increase the need for review discipline.

## The bottleneck problem: AI can create inventory

AI can generate code in seconds, but if it takes six weeks to validate that code on a HIL rig, AI has only created inventory at the bottleneck.

That is operations logic, not anti-AI sentiment.

If AI increases software output but validation capacity does not increase, the organization does not become faster. It creates more unvalidated work:

- more generated code waiting for review
- more tests that nobody trusts
- more requirements text that looks polished but encodes misunderstandings
- more pull requests waiting for integration
- more variants to validate
- more HIL/SIL campaigns
- more cybersecurity review
- more release-management pressure

The [Stack Overflow 2025 Developer Survey](https://survey.stackoverflow.co/2025/ai/) helps explain why this matters: adoption is high, but trust in accuracy is limited. Human verification is still central.

The randomized controlled trial [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://arxiv.org/abs/2507.09089) is also a useful caution. In that specific study setting, experienced open-source developers expected AI tools to reduce task time, but measured completion time increased by 19%. That should not be overgeneralized to every team or tool. It does show that productivity depends strongly on context, codebase maturity, standards, and review burden.

In automotive, the context is demanding by default.

If the bottleneck is validation, AI output has to be connected to validation capacity. Otherwise the organization only moves the queue.

## Risk 1: AI tool sprawl makes engineering non-repeatable

Large organizations have a specific AI risk that individual developers do not always feel immediately: tool sprawl.

If every developer uses a different AI toolchain, model, prompt library, IDE extension, agent, retrieval source, or private workflow, the organization loses repeatability.

The problems are practical:

- results are not reproducible
- code review becomes harder because reviewers do not know how the output was produced
- safety and cybersecurity teams cannot audit the toolchain
- prompt and model behavior changes over time
- different teams encode different assumptions
- internal knowledge may leak into unauthorized tools
- tool outputs may not be traceable to requirements, tests, or design decisions
- engineering quality becomes dependent on individual prompting habits instead of controlled engineering practice

That is unacceptable in safety-critical and production embedded software.

Automotive needs traceability, reviewability, repeatability, and release confidence.

One answer is a governed internal AI marketplace or platform.

Large organizations should provide a controlled internal AI environment where specialized platform teams maintain approved AI tools, prompts, agents, retrieval connectors, safety rules, evaluation datasets, documentation, access policies, and monitoring.

That marketplace should include approved models and versions, approved coding assistants, approved prompt templates, domain-specific agents for requirements, diagnostics, logs, calibration, test, and documentation, controlled access to internal repositories, traceability to requirements and work items, logging for auditability, evaluation benchmarks, security and IP controls, update policies, and training material.

The goal is not to centralize creativity away from engineers.

The goal is to make AI-assisted engineering repeatable, reviewable, and safe enough for large-scale product development.

IBM's [Generative AI Capability Model](https://www.ibm.com/think/architectures/patterns/genai-capability-model) and [AI platform pattern](https://www.ibm.com/think/architectures/patterns/genai-platform) are useful enterprise references for thinking about model management, data access, governance, and operating capability. [Microsoft's AI governance frameworks overview](https://www.microsoft.com/en-us/software-development-companies/resources/articles/ai-governance-frameworks), NIST, ISO/IEC 42001, and OWASP point in the same direction: AI adoption needs organizational controls, not only developer enthusiasm.

## Risk 2: AI may weaken the junior-engineer pipeline

Many organizations will be tempted to use AI to remove entry-level engineering work.

That may look efficient in the short term.

It creates a long-term capability risk.

Senior engineers are not born senior. They become senior by debugging, testing, reading bad code, asking questions, making mistakes under supervision, learning architecture, understanding field failures, and connecting software decisions to physical consequences.

If AI absorbs all junior tasks and companies stop hiring or training juniors, the organization risks fewer future senior engineers, weaker technical succession, loss of tacit knowledge transfer, overloaded senior reviewers, and a generation of engineers who can prompt tools but cannot reason deeply about systems.

The research picture is balanced, not alarmist. Anthropic's study on [AI assistance and coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills) shows the concern: AI can support productivity, but skill formation depends on how the tool is used and whether engineers still engage deeply with the underlying problem.

The systematic literature review [Novice Developers' Perspectives on Adopting LLMs for Software Development](https://arxiv.org/abs/2503.07556) found that junior developers use LLMs not only for code generation but also to improve development skills, while remaining aware of limitations such as wrong suggestions, hallucination, and data leakage.

The paper [What do professional software developers need to know to succeed in an age of Artificial Intelligence?](https://arxiv.org/abs/2506.00202) argues that AI-era developers need skills across generative AI use, core software engineering, adjacent engineering, and adjacent non-engineering domains. That is exactly the point for embedded control. AI skills alone are not enough.

Industry commentary is already noticing the pressure. A [CIO article on junior developer demand](https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html) describes softening demand as AI takes over some entry-level work. That is commentary, not proof of the future, but it reflects a real management temptation.

Junior engineers still bring important value: curiosity without organizational bias, willingness to question assumptions, strong adoption of new tools, fresh mental models from university and open source, energy for experimentation, documentation improvement, test automation, simulation development, and the ability to challenge legacy processes.

AI should not remove juniors.

AI should change how juniors are trained.

Pair juniors with seniors on real system behavior, not isolated tickets. Use AI to explain code, but require juniors to validate explanations. Rotate juniors through test, calibration, diagnostics, HIL/SIL, field-data analysis, and production-support tasks. Make juniors write postmortems and trace analyses. Teach prompt discipline, review discipline, and evidence discipline. Assign juniors to improve internal AI prompts and evaluation sets under senior supervision.

AI outputs should become reviewable learning artifacts, not black boxes.

If AI removes the apprenticeship layer, it also removes the future senior engineers who will be needed to govern AI.

## Risk 3: AI can hide weak requirements behind polished text

AI can produce confident, well-structured requirements, design notes, and test descriptions.

Polished language is not the same as correct engineering intent.

In automotive, a wrong requirement that looks professional can be more dangerous than an obviously incomplete one.

The risks are familiar: hallucinated assumptions, missing edge cases, ambiguous terms, unverified constraints, mismatched calibration assumptions, incorrect diagnostic expectations, missing safety cases, and requirements that are not connected to physical evidence.

AI can be useful here, but only in the right role.

Use it for review, completeness checks, contradiction detection, traceability assistance, and alternative phrasing.

Do not let it own requirement acceptance.

Human engineers still need to define acceptance criteria, connect requirements to physical behavior, review safety implications, and validate evidence. NIST and ISO/IEC 42001 are useful references because they treat AI as a managed system with risk, controls, monitoring, and accountability.

## Risk 4: AI can increase cybersecurity and IP exposure

Automotive companies handle proprietary architecture, calibration data, diagnostics logic, production data, cybersecurity details, supplier information, and sometimes safety-sensitive material.

AI workflows can expose that material if they are unmanaged.

The risks include sensitive data pasted into external tools, prompt injection, insecure generated code, dependency confusion or unsafe libraries, leakage of internal implementation details, unreviewed agent actions, and model or output drift.

The [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) is a useful practical reference for these risks. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) provides the broader risk-management frame.

Automotive organizations should use approved tools only, internal retrieval systems, data classification, logging and monitoring, secure prompt templates, restricted agent permissions, mandatory review for generated code, and traceability of AI use in safety-relevant artifacts.

This is not about slowing engineers down.

It is about making AI safe enough to use in serious product development.

## What strong AI adoption looks like in automotive

Strong AI adoption in automotive starts with the low-risk areas first.

Use AI where the cost of being wrong is low: documentation drafts, search, summaries, boilerplate, test scaffolding, trace exploration, and CI/CD triage.

Keep humans responsible for system behavior.

AI can suggest; engineers own.

Connect AI to validation evidence, not just code repositories. Useful AI systems should understand requirements, logs, test results, calibration notes, HIL/SIL results, field data, known issues, and release constraints.

Standardize AI through governed internal platforms. Use internal marketplaces, approved agents, versioned prompts, evaluation datasets, and security controls.

Train juniors with AI, not around AI. Use AI as a tutor and accelerator, but require juniors to reason, test, explain, and validate.

Measure AI by validated learning speed.

Do not measure only code generated, prompts used, or tickets closed.

Measure the time from observed system issue to validated improvement.

## Conclusion

The first article in this series argued that speed means learning from the machine.

The second argued that externalization is dangerous when it externalizes the learning loop.

This article argues that AI is dangerous when it accelerates output without improving the learning loop.

The future is not AI instead of automotive engineers. The future is automotive engineers using AI inside stronger engineering systems.

AI can help write, search, summarize, review, and explore. It can help strong engineers move faster. It can help juniors learn when used deliberately. It can make large engineering organizations more coherent when governed properly.

But AI cannot own vehicle behavior.

It cannot replace architecture.

It cannot replace validation evidence.

It cannot replace the judgment required to make software safe enough to act on the physical world.

In a software-defined physical system, AI is valuable only when it helps software become trustworthy behavior in the real world.

## Part of the series: Software-Defined Physical Systems

1. [The Automotive Industry Has a Speed Problem, and Software Is Where It Shows](/writing/automotive-industry-speed-problem/) (the overview)
2. [The Real Cost of Automotive Software Is Learning Speed](/writing/real-cost-of-automotive-software-speed/)
3. [The Externalization Trap in Automotive Software](/writing/externalization-trap-software-defined-world/)
4. AI Will Not Replace Automotive Engineers (this article)

## Sources and further reading

- [Stack Overflow Developer Survey 2025: AI](https://survey.stackoverflow.co/2025/ai/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [ISO/IEC 42001: AI management systems](https://www.iso.org/standard/42001)
- [IBM: Generative AI Capability Model](https://www.ibm.com/think/architectures/patterns/genai-capability-model)
- [IBM: AI Platform for enterprise generative AI](https://www.ibm.com/think/architectures/patterns/genai-platform)
- [Microsoft: AI Governance Frameworks](https://www.microsoft.com/en-us/software-development-companies/resources/articles/ai-governance-frameworks)
- [Anthropic: How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills)
- [Junior Software Developers' Perspectives on Adopting LLMs for Software Engineering](https://arxiv.org/abs/2503.07556)
- [What do professional software developers need to know to succeed in an age of Artificial Intelligence?](https://arxiv.org/abs/2506.00202)
- [The Impact of AI Coding Assistants on Software Engineering: A Longitudinal Study](https://arxiv.org/abs/2605.23135)
- [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://arxiv.org/abs/2507.09089)
- [Practices and Challenges of Using GitHub Copilot: An Empirical Study](https://arxiv.org/abs/2303.08733)
- [GitHub: A developer's guide to writing, debugging, reviewing, and shipping code faster with Copilot](https://github.blog/ai-and-ml/github-copilot/a-developers-guide-to-writing-debugging-reviewing-and-shipping-code-faster-with-github-copilot/)
- [CIO: Demand for junior developers softens as AI takes over](https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html)
