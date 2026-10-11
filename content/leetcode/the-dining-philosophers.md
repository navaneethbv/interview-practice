# The Dining Philosophers

Five philosophers, numbered 0 to 4, sit around a table with a fork between each pair.
Philosopher `p` uses fork `p` on the left and fork `(p + 1) % 5` on the right.
Each philosopher thread calls `wantsToEat(p, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork)` `n` times.
Within a call, pick up both forks, eat, and put both forks down by calling the callbacks.
No fork may be held by two philosophers at once, nobody may eat without both forks, and the threads must never deadlock.
The judge tracks every fork and reports how many times each philosopher ate.

## Signatures

- Java: `void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork, Runnable eat, Runnable putLeftFork, Runnable putRightFork)`
- C++: the same with `function<void()>` callbacks
- Go: `func NewDiningPhilosophers() *DiningPhilosophers`, `WantsToEat(philosopher int, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork func())`

## How this is judged

Solve this in Java, C++ or Go; it needs real threads, which the browser's Python and JavaScript runtimes do not have.
Each test runs your class 20 times with the threads started in the given order and small random delays, so a race that only sometimes misorders the output is still caught.
If the threads have not finished after 3 seconds, the run stops with a deadlock error.

## Examples

### Example 1

```text
Input: n = 1
Output: [1, 1, 1, 1, 1]
Explanation: Each philosopher eats once.
```

### Example 2

```text
Input: n = 2
Output: [2, 2, 2, 2, 2]
Explanation: Every philosopher eats every time without sharing a fork.
```

## Constraints

- 1 <= n <= 60
