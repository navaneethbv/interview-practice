class Solution:
    def canFinish(self, numCourses, prerequisites):
        edges = [[] for _ in range(numCourses)]
        degree = [0] * numCourses
        for a, b in prerequisites:
            edges[b].append(a)
            degree[a] += 1
        queue = [i for i, count in enumerate(degree) if count == 0]
        for course in queue:
            for nxt in edges[course]:
                degree[nxt] -= 1
                if degree[nxt] == 0:
                    queue.append(nxt)
        return len(queue) == numCourses
