## Prompt and scope

Model two elevators in a ten-floor building.
Support hall calls with a direction, internal floor selections, and emergency stop behavior.
This is a software modeling exercise, not a certified physical control design.
Assume a separate safety subsystem authorizes motion and door operations.

## State and responsibilities

```text
Dispatcher -> assigns hall calls -> ElevatorController
                                    | owns mode and target stops
                                    | reads PositionSensor
                                    + requests Motor and Door actions

Mode: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, OUT_OF_SERVICE
```

The dispatcher chooses an eligible elevator but does not directly operate its motor.
The controller decides the next safe transition.
Represent floor number and travel direction separately so a hall request is not confused with an internal destination.

## Scheduling walkthrough

Elevator A is at floor 2 moving up toward floor 7.
Elevator B is idle at floor 9.
A caller at floor 4 wants to go up.
A simple directional policy assigns A because it can serve the request on its current route.
A caller at floor 4 wanting to go down may receive B or wait for A's return, depending on the stated policy.
Distance alone ignores direction and scheduled work.

Use a sorted collection of stops in each direction and deduplicate repeated button presses.
Complete the current sweep before reversing unless the policy defines an explicit exception.
Track waiting time so continuous traffic in one direction does not starve other requests.

## Safety invariants and tests

Do not request motion while the door is open.
Do not accept a target outside the building's range.
An out-of-service elevator cannot receive new assignments.
When it becomes unavailable, outstanding hall calls return to the dispatcher rather than disappearing.

Use a fake clock and scripted sensor events to test arrival, door closing, reversal, duplicate calls, and a failed sensor.
An event claiming arrival at an unexpected floor must produce an explicit fault decision, not silently update the state.

## Follow-up

Add priority service or a third elevator without changing the controller's safety rules.
Explain the tradeoff between average waiting time, worst-case waiting time, and predictable behavior.
A useful design keeps scheduling policy separate from state transitions while acknowledging that real motion control requires additional engineering.
