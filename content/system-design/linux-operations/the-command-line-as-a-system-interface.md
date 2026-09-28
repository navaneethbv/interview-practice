These notes are an independently written study aid inspired by Linux Pocket Guide and UNIX and Linux System Administration Handbook.
They focus on safe operational reasoning rather than reproducing either reference.

## Build a mental model

The shell reads a command line, expands it, connects inputs and outputs, and starts processes.
Most commands follow the Unix convention of reading standard input and writing standard output, while diagnostics go to standard error.
That convention makes small tools composable.

## Inspect before changing

Use `pwd`, `ls`, `find`, `file`, and `stat` to establish where you are and what an object is before modifying it.
Prefer explicit paths for automation and quote paths that may contain spaces or shell metacharacters.
Treat output from a command as data to inspect, not as permission to run a second command blindly.
