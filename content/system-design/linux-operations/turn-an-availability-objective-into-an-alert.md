## Define a useful objective

Suppose a fictional service targets 99.9 percent successful eligible requests over a rolling 30-day window.
Define eligibility and success precisely before calculating anything.
For a request-based objective, a period containing one million eligible requests permits one thousand unsuccessful requests at that target.
This is a request budget, not automatically a downtime allowance.

## Burn-rate example

The allowed error fraction is 0.001.
If the observed error fraction is 0.01 over an alert window, the burn rate is 10 because `0.01 / 0.001 = 10`.
At a stable eligible-request rate and stable error fraction, that pace would consume a full 30-day allowance in roughly three days.
Changing traffic rates or existing budget consumption changes the interpretation.
State those assumptions when doing interview arithmetic.

## Design the response

Use a short window to detect an urgent change and a longer window to check persistence.
Choose thresholds based on how much budget can be lost before a human or automated mitigation can respond.
Do not copy a threshold from another service without comparing its traffic and response needs.
At low volume, one failure can dominate a fraction, so combine the objective with suitable minimum evidence or other availability signals.

## Exercise

A deployment causes errors for five minutes, then recovers.
Explain why a short-window alert may fire while a long-window alert does not.
Now consider a smaller error rate lasting for hours and explain how it can consume more total budget.
Propose different response urgency for a fast large failure and a slow persistent degradation.

## Runbook and review

Every paging alert should identify the affected objective, show the relevant evidence, and suggest a safe first investigation.
After an incident, review whether the alert was timely and actionable.
Separate symptoms visible to users from internal metrics that help diagnosis.
A busy processor matters operationally, but it is not the same as an unavailable service.

## Source

[Google's SRE workbook on alerting](https://sre.google/workbook/alerting-on-slos/) develops error-budget and multiwindow burn-rate alerting.
The numbers and exercises here are illustrative, not production recommendations.
