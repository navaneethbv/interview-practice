# Animal Shelter

A shelter holds only dogs and cats and releases animals strictly first in, first out.
An adopter may take the oldest animal overall, or the oldest animal of a chosen species.

- `AnimalShelter()` creates an empty shelter.
- `enqueue(name, species)` admits an animal; `species` is `"dog"` or `"cat"`.
- `dequeueAny()` releases the animal that arrived earliest and returns its name.
- `dequeueDog()` releases the earliest dog and returns its name.
- `dequeueCat()` releases the earliest cat and returns its name.

Each dequeue returns an empty string when no matching animal is available.
Construct one instance per test, then execute the listed operations in order; `enqueue` produces null.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["enqueue", "enqueue", "enqueue", "dequeueCat", "dequeueAny", "dequeueAny"], args = [["Rex", "dog"], ["Tom", "cat"], ["Kit", "cat"], [], [], []]
Output: [null, null, null, "Tom", "Rex", "Kit"]
```

### Example 2

```text
Input: ctor = [], ops = ["dequeueAny", "enqueue", "dequeueCat"], args = [[], ["Ace", "dog"], []]
Output: ["", null, ""]
```

## Constraints

- Names are non-empty strings of at most 20 letters.
- At most 3,000 operations.
