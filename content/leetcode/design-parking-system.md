# Design Parking System

Maintain three independent parking capacities for big, medium, and small cars.
`addCar(carType)` takes a space of exactly that type if available and returns true; otherwise it returns false.
Types 1, 2, and 3 correspond to big, medium, and small, and cars cannot use another type of space.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [1, 1, 0], ops = ["addCar", "addCar", "addCar", "addCar"], args = [[1], [2], [3], [1]]
Output: [true, true, false, false]
Explanation: The big and medium spaces each accept one car; there is no small space and the big space is then full.
```

### Example 2

```text
Input: ctor = [0, 0, 1], ops = ["addCar", "addCar"], args = [[1], [3]]
Output: [false, true]
Explanation: A big car has no matching space, while the small car uses the one small space.
```

## Constraints

- 0 <= initial capacities <= 1000.
- carType is 1, 2, or 3.
- At most 1000 addCar calls occur per test.
