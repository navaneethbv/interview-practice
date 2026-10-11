## Prompt and requirements

A social platform receives 50 million posts per day with text and images.
Remove clearly violating content quickly, send uncertain cases to human reviewers, and let users appeal.
Errors in both directions matter: missed harm and wrongly removed speech.

## Architecture

```text
New post -> synchronous checks (hash matching against known bad media, high-precision classifiers)
         -> publish or block
         -> asynchronous classifiers per policy area -> risk score
         -> actions by threshold: remove, reduce distribution, queue for review, allow
Review queue (prioritized by risk x reach) -> human decisions -> labels for retraining
Appeals -> second review -> reversal and audit trail
```

## Decision thresholds

For each policy area, pick thresholds from precision and recall measured on a labeled sample:
auto-remove only above a high-precision threshold, queue the uncertain band for humans, and allow below.
Prioritize review by expected harm, so a borderline post going viral is reviewed before one with ten views.

## Feedback and measurement

Reviewer decisions become training labels, but they are biased toward what the model flagged.
Sample a slice of all content for unbiased prevalence estimates, and measure reviewer agreement to keep labels reliable.

## Follow-up questions

- How do you handle adversarial edits such as altered images? (Perceptual hashing and robust embeddings rather than exact hashes.)
- How do you support many languages? (Multilingual models plus language-specific review teams for high-risk areas.)
