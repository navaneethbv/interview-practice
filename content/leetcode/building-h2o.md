# Building H2O

Hydrogen and oxygen atoms arrive as threads.
Each hydrogen thread calls `hydrogen` and each oxygen thread calls `oxygen`, passing a callback that releases the atom.
Atoms must leave in complete water molecules: every consecutive group of three releases contains two hydrogens and one oxygen.
An atom that arrives early must wait until it can complete a molecule; no molecule may mix atoms with the next one.

The test input `water` lists the atoms in the order their threads start.
The judge checks every group of three releases and reports the number of molecules formed.

## Signatures

- Java: `void hydrogen(Runnable releaseHydrogen)`, `void oxygen(Runnable releaseOxygen)`
- C++: `void hydrogen(function<void()> releaseHydrogen)`, `void oxygen(function<void()> releaseOxygen)`
- Go: `func NewH2O() *H2O`, `Hydrogen(releaseHydrogen func())`, `Oxygen(releaseOxygen func())`

## How this is judged

Solve this in Java, C++ or Go; it needs real threads, which the browser's Python and JavaScript runtimes do not have.
Each test runs your class 20 times with the threads started in the given order and small random delays, so a race that only sometimes misorders the output is still caught.
If the threads have not finished after 3 seconds, the run stops with a deadlock error.

## Examples

### Example 1

```text
Input: water = "HOH"
Output: 1
Explanation: One molecule; the order inside the molecule does not matter.
```

### Example 2

```text
Input: water = "OOHHHH"
Output: 2
Explanation: Both oxygens arrive first; each must wait for two hydrogens.
```

## Constraints

- The length of `water` is a multiple of 3 with twice as many `H` as `O`, at most 60 atoms.
