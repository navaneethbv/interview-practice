## Prompt

Design an assistant that can explain an order's status and help a customer request a return.
The assistant may read authorized order data, but refunds and other consequential actions require the application's normal authorization and confirmation process.
Clarify which actions are supported before choosing any autonomous behavior.

## Separate answer generation from execution

```text
Authenticated customer -> intent and context
                         |-> read-only order lookup -> explanation
                         +-> proposed return request -> policy validation
                                                     -> customer confirmation
                                                     -> recorded operation
```

A deterministic workflow is suitable when the business steps are known.
Use a model to interpret a request or draft an explanation where that variability is useful.
The model does not decide whether an order belongs to the customer or whether a refund is permitted.
Trusted application logic validates identifiers, permissions, amounts, and state transitions.

## Worked failure sequence

The customer asks for a return, confirms it, and the application records operation R17.
The response is lost before the customer sees it.
On retry, the same operation identifier should recover the prior result rather than create a second return.
If the downstream system gives no definitive result, show a pending state and reconcile it.
An uncertain response is not evidence that the action failed.

## Bound the work

Limit the number of steps, elapsed time, and resource consumption per request.
Give tools only the fields and permissions they need.
Log decisions and outcomes with redaction so operators can investigate failure without retaining unnecessary customer data.
If a request falls outside the supported workflow, ask for clarification or hand it to a human with relevant context.

## Review questions

- What prevents one customer from reading another customer's order?
- What happens if an order note contains instructions to ignore the policy?
- Can a repeated confirmation create a second operation?
- How does a human take over without losing the pending state?
- Which steps still work if the model is unavailable?

## Source

[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) distinguishes predefined workflows from model-directed agents and recommends starting with simpler designs.
This exercise applies that distinction to an original support workflow.
