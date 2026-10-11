These chapters are a quick reference for the fundamentals questions that appear in phone screens and system design follow-ups.
Each section ends with questions to answer aloud; if you cannot explain an answer in two or three sentences, study that topic further.
Reviewed October 11, 2026.

## Processes and threads

A **process** has its own virtual address space, file descriptors and security context.
A **thread** is a schedulable unit of execution inside a process; threads share the address space and descriptors but each has its own stack and registers.
Creating and switching threads is cheaper than processes, but shared memory requires synchronization.

A **context switch** saves one thread's registers and loads another's; switching processes also changes the page tables, which can flush the TLB.

## Virtual memory

Each process sees a contiguous virtual address space divided into pages, usually 4 KiB.
The MMU translates virtual pages to physical frames through page tables, caching translations in the TLB.
A page fault occurs when a page is not resident: the kernel loads it from disk or allocates it.
Thrashing happens when the working set exceeds physical memory and the system spends its time paging.

## Scheduling

Modern general-purpose kernels use preemptive, priority-aware schedulers that aim for fairness (Linux's CFS and its successor EEVDF).
Know the classic trade-offs: first-come-first-served is simple but suffers convoy effects; round robin bounds waiting time; shortest-job-first minimizes average waiting time but needs job length estimates and can starve long jobs.

## I/O models

- **Blocking I/O:** the thread waits until data is ready. One thread per connection is simple but expensive at high concurrency.
- **Non-blocking I/O with readiness notification:** `epoll` (Linux) or `kqueue` (BSD/macOS) report which sockets are ready; one thread can serve thousands of connections. This underlies Node.js, nginx and Netty.
- **Completion-based I/O:** submit operations and receive completions (`io_uring`, Windows IOCP).

## Questions to answer aloud

- Why can a program with more threads than cores run slower?
- What happens, step by step, when a process reads a file it has never opened?
- Why does a memory leak eventually slow the whole machine before it crashes?
