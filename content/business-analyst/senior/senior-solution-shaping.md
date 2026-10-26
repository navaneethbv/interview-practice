Senior BAs shape the business side of a solution with architecture, security, data, operations and control partners. In the reconciliation case, the choice could be a shared platform, federated services or improved regional tools. The BA makes the trade-offs understandable and keeps solution design connected to need.

## Compare solution options

> **In short:** Define credible alternatives and compare them against agreed outcomes and constraints.

Avoid evaluating only the requested solution and the status quo. Include at least one materially different option, such as process/control changes, targeted automation, a shared service or replacement technology. Define each option at the same level so comparisons are fair.

Agree criteria before scoring: outcomes, control effectiveness, operating cost, delivery time, user impact, resilience, data readiness and reversibility. Use weighted scoring only when weights are meaningful; a precise total does not make subjective inputs objective.

Show evidence, assumptions and uncertainty next to each rating. Run sensitivity checks on criteria that could change the recommendation. State which option you recommend, why, under what conditions and what evidence could change the choice.

The decision belongs to the accountable sponsor. A senior BA facilitates a defensible choice rather than disguising a preference as a score.

## Partner with architecture and engineering

> **In short:** Translate business outcomes into constraints and decisions while leaving technical design to technical owners.

Bring architects and engineers in before requirements are finalized. Share business goals, process context, volumes, latency needs, operating constraints and risk tolerances. Ask about system boundaries, integration patterns, failure modes, migration complexity and technical dependencies.

The BA should not prescribe a database, cloud service or detailed design unless that is explicitly part of the role. Instead, state the need and measurable constraint: “Users need current break status within five minutes during the close window,” then work with technical partners to validate feasible options.

Record decisions that affect business behavior, support ownership, data access or controls. If a proposed design changes a process or user obligation, bring the change back to impacted stakeholders.

## Define quality attributes and controls

> **In short:** Make non-functional needs measurable and connect them to business risk.

Quality attributes include performance, availability, security, privacy, usability, recoverability, scalability and auditability. Replace vague statements like “fast and secure” with a threshold, scenario, measurement method and accountable owner.

Examples: “95% of regional matching runs finish within 20 minutes for the agreed volume,” or “every manual write-off above the threshold records preparer, approver, reason and timestamp.” Validate targets with users, operations, security and control owners.

Treat control requirements as solution behavior, not a final review checklist. Identify preventive, detective and corrective controls; define evidence and exception handling. Confirm segregation of duties, access roles, retention and audit needs with the proper owners.

A senior BA asks how requirements will be verified and what operational process handles failures or exceptions.

## Analyze integration and data flows

> **In short:** Trace critical information from source to decision, including ownership and failure handling.

Map important data elements across source feeds, transformation, matching, exception queues, ledger updates and reporting. For each element, identify source of truth, owner, meaning, format, timing, quality rules and consumers.

Ask what happens when a feed is late, duplicated, incomplete or out of order. Define reconciliation between systems, replay behavior, idempotency expectations and alert ownership with technical partners. A happy-path diagram alone misses operational risk.

In a multi-region case, compare currency, time zone, calendar, reference and retention differences. Distinguish shared definitions from local configuration. Record data lineage so users can explain where a result came from.

## Govern business rules and exceptions

> **In short:** Make rules explicit, testable, versioned and owned by the right people.

Document rules in tables when combinations of conditions matter. Include condition, outcome, priority, effective date, owner, exception path and test example. Check boundary values and interactions between rules.

Separate policy from implementation logic. A business owner approves the policy; technical teams implement it; the BA makes sure they describe the same behavior. Record the rule source, such as approved policy, regulation or operational decision.

For matching, define exact and tolerance-based conditions, precedence, duplicate handling, override permissions and what evidence is retained. Never allow an automated match rule to silently authorize a write-off unless the control owner approves that risk.

## Manage scope across teams

> **In short:** Keep one traceable view of outcomes, requirements, decisions and dependencies.

Large solutions often split work across platforms, regions and delivery teams. Maintain a lightweight trace from outcome to capability, requirement, delivery item, test evidence and owner. Agree a common vocabulary and unique identifiers.

When scope changes, assess impact on interfaces, controls, migration, training, reports and benefits, not just the affected screen. Bring trade-offs to the accountable owner. Document what is deferred and why.

Use shared acceptance principles while allowing local examples where needed. Coordinate cross-team refinement early enough for dependencies to be discovered before commitments are made.