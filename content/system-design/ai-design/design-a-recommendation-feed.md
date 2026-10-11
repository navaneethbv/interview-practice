## Prompt and requirements

Design the ranking behind a home feed of items (videos, posts or products) for 100 million daily users.
Each request returns 50 items in under 200 milliseconds, chosen from a catalog of tens of millions.
Clarify the objective first: clicks, watch time, purchases, or a blend with guardrails for quality and diversity.
This is an original design exercise reviewed October 11, 2026.

## Multi-stage architecture

```text
Request (user, context)
  -> candidate generation: several sources, ~1,000s of items
       two-tower embedding retrieval (approximate nearest neighbours), co-occurrence, follows, trending
  -> lightweight ranker: ~500 items, cheap features
  -> heavy ranker: ~100 items, rich features, multi-task model (p(click), p(long watch), p(hide))
  -> re-ranking: business rules, diversity, freshness, deduplication, policy filters
  -> response + impression logging
```

Each stage trades recall for precision as the item count drops and the model cost rises.

## Data and training

Log impressions with the features used at serving time, then join later engagement as labels.
Training on features recomputed later causes training-serving skew; logging served features avoids it.
Negative examples come from impressions without engagement, which are biased by what earlier models chose to show; mention exploration traffic or inverse propensity weighting.

## Evaluation

Offline: recall@k for retrieval, AUC or log loss for rankers, on a time-based split so the model never trains on the future.
Online: A/B tests on the business metric with guardrail metrics such as hides, reports and session length.
Offline gains often fail to transfer, so the online test decides.

## Cold start and freshness

New users: popularity in their region plus fast onboarding signals.
New items: content embeddings so retrieval can find them before they have engagement, plus a small exploration budget.

## Follow-up questions

- How do you avoid filter bubbles? (Diversity constraints in re-ranking and exploration.)
- How do you serve embeddings at this scale? (An ANN index such as HNSW or IVF, sharded and refreshed as items change.)
