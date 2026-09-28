## Intuition

After sorting by position, only a right-moving robot can collide with a later left-moving robot.
A stack holds unmatched right movers, and each left mover resolves collisions against the nearest one first.

## Brute force

Checking every pair of robots ignores that collisions remove robots and can be quadratic.
The stack follows the physical order and resolves each surviving collision once.

## Approach

1. Sort input indices by position while retaining original indices.
2. Push right-moving robots onto a stack.
3. For a left-moving robot, compare health with the stack top and remove or reduce the weaker robot.
4. Collect positive healths by original input order.

## Walkthrough

For Example 1, robots at positions 1 and 3 move `R` and `L` with healths 5 and 3.
They collide, the health-5 robot survives, and its health decreases to 4.
The final scan returns `[4]`.

## Complexity

Sorting costs O(n log n), and collision processing is O(n) amortized because each robot enters and leaves the stack at most once.
The sorted index array, stack, and output use O(n) space.
Python mutates the health list in place; Java uses an `Integer[]` ordering copy and an `ArrayDeque`.

## Edge cases

Equal health removes both robots.
A left mover with no right-moving stack entry survives unchanged.
Survivor output follows original input order, not position order.

## Common mistakes

Sort indices without losing original positions.
Continue while the left mover remains alive.
Decrease the survivor's health by exactly one.

## Language notes

Python's `resolve` logic is in the main method and uses list indices.
Java extracts `resolveCollision` so the public method stays readable and uses the same state transitions.
