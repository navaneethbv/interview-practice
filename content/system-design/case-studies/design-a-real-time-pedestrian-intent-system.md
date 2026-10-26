**Recent interview prompt signal:** Gotham Loop's public feed listed a Waymo L4 screen question on October 23, 2026 about processing LiDAR point clouds to detect and track pedestrian intent under a sub-100-millisecond latency target. Candidate-report feeds can be incomplete or inaccurate; use this as a practice prompt, not as a claim about Waymo's standard loop. [Source: Gotham Loop recently asked questions](https://www.gothamloop.com/)

## Prompt

Design an onboard perception system that consumes timestamped LiDAR point clouds, detects pedestrians, maintains tracks across frames, and estimates near-term motion or crossing intent quickly enough to inform a downstream planning system.

Assume the perception-to-planning path has a target below 100 milliseconds. Clarify which components are included in that budget and what the system should do when confidence is low, an input is stale, or a sensor is degraded.

## Requirements

- Associate detections over time so the planner can reason about a moving pedestrian, not isolated points.
- Produce a calibrated estimate of position, velocity, and short-horizon trajectory with uncertainty.
- Keep the real-time decision path onboard and bounded; connectivity to a cloud service is not guaranteed.
- Handle occlusion, sparse or noisy point clouds, overlapping pedestrians, and sensor timing differences.
- Preserve enough privacy-aware telemetry for offline evaluation and improvement without placing cloud availability on the safety-critical path.

Treat “intent” as an uncertain prediction, not a directly observed fact. The system should communicate confidence and uncertainty to downstream consumers.

## Data flow

~~~text
LiDAR frames + timestamps
  -> time alignment and sensor-health checks
  -> point-cloud filtering and feature extraction
  -> pedestrian detection
  -> multi-object tracking
  -> short-horizon motion / intent prediction
  -> confidence and freshness checks
  -> downstream planner
~~~

Keep the stages modular so latency, quality, and failure can be measured separately. Each message should include a timestamp, coordinate frame, track identifier, estimate, confidence, and validity period.

## Latency and capacity

Ask about sensor frame rate, point-cloud size, number of concurrent objects, compute budget, and whether the 100-millisecond target is end-to-end or only for a model stage. Build a latency budget with time for preprocessing, detection, association, inference, and message handoff.

Prefer bounded queues and drop stale frames rather than allowing backpressure to turn old predictions into apparently current ones. Measure p50, p95, p99 and deadline misses by stage and by operating condition.

## Tracking and prediction

Use a stable track identity while making identity changes explicit. Data association should account for motion, uncertainty, missed detections, and objects entering or leaving the field of view. A track should expire based on time and evidence, not simply on one missing frame.

Predict a distribution or a small set of plausible near-term paths instead of a single overconfident label. Separate the detected state (“pedestrian at position X, moving at velocity V”) from an inference (“may enter the roadway”). Send uncertainty and age so the planner can apply its own policy.

## Failure handling

- **Stale frame:** mark output invalid or expired; never present an old estimate as current.
- **Low confidence:** expose the uncertainty and let the downstream safety policy choose a conservative response.
- **Occlusion:** retain a short-lived predicted track with growing uncertainty, then retire it.
- **Clock or frame mismatch:** reject or quarantine data with invalid timestamps or coordinate metadata.
- **Compute overload:** shed stale work, prioritize current perception, and report missed deadlines.
- **Sensor degradation:** publish health state and reduce confidence; do not silently substitute a normal-quality estimate.
- **Model update:** validate version, resource use, latency, and scenario performance before rollout; retain a rapid rollback path.

## Evaluation

Build an offline evaluation set stratified by lighting, weather, crowd density, occlusion, pedestrian behavior, and sensor quality. Measure detection and tracking quality, intent calibration, latency, deadline misses, and performance on rare but important scenarios.

Review false negatives and false positives separately. Averages can hide poor behavior in a small but consequential scenario group. Use replay and simulation to reproduce failures, and ensure training and evaluation splits do not leak near-duplicate sequences.

## Follow-up questions

- How do you distinguish a pedestrian who is walking alongside a road from one preparing to cross?
- How does uncertainty grow when a track is occluded?
- What should happen if two sensors disagree on a track?
- Which metrics would you use to compare a new model with the current one?
- How would you test a model update against rare scenarios before deployment?
- Which work belongs onboard, and which can safely happen offline?
