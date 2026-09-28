from collections import deque


class Solution:
    def compileTime(self, seconds, imports):
        n = len(seconds)
        dependents = [[] for _ in range(n)]
        waiting = [len(needed) for needed in imports]
        for package, needed in enumerate(imports):
            for dependency in needed:
                dependents[dependency].append(package)
        start = [0] * n
        queue = deque(package for package in range(n) if waiting[package] == 0)
        finish = 0
        while queue:
            package = queue.popleft()
            done = start[package] + seconds[package]
            finish = max(finish, done)
            for dependent in dependents[package]:
                start[dependent] = max(start[dependent], done)
                waiting[dependent] -= 1
                if waiting[dependent] == 0:
                    queue.append(dependent)
        return finish
