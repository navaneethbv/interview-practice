## Intuition

Every operator node depends only on its children's completed values.
A postorder evaluation therefore reduces each subtree to one number before its parent combines the results, directly mirroring the nested arithmetic expression.

## Brute force

Repeatedly search for operators whose children are already numbers and rebuild the expression after each reduction.
That introduces repeated tree scans and mutation, whereas recursion naturally schedules each operator exactly once.

## Approach

Use `root.val` as an index into `kinds` and `nums`.
A `num` node returns its stored number immediately.
Otherwise evaluate every child recursively and combine their values according to sum, product, maximum, or minimum.
Python first collects child results in `values`.
Java combines children as they return, using the first result to initialize minimum and maximum correctly.
Multiplication starts from one, while addition starts from zero.

## Walkthrough

Example 1 represents `min(max(4, 6, 5 + 7), 6 * 8)`.
The inner sum evaluates to 12 and the product evaluates to 48.
The maximum of 4, 6, and 12 is 12.
Finally the root minimum compares 12 and 48 and returns 12.
The integer labels in the tree identify these operations; they are not themselves operand values.

## Complexity

Both versions take O(n) time for n nodes.
Java uses O(h) recursion space for height h.
Python additionally stores child-result lists; together these can use O(n) auxiliary space in the worst case, such as a root with many children.

## Edge cases

A number-only root returns that number, including negative values.
Every operator has at least one child, so minimum and maximum are always defined.
Intermediate results satisfy the statement's numeric bounds.

## Common mistakes

Initializing maximum to zero breaks all-negative children.
Initializing product to zero makes every product zero.
Do not interpret node labels as literal numbers.

## Language notes

Python uses the harness's N-ary node children list.
Java receives the equivalent `Node` helper and separates arithmetic dispatch into the small `combine` method.
