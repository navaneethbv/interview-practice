class Solution:
    def canFinish(self, numCourses, prerequisites):
        edges = [[] for _ in range(numCourses)]
        degree = [0] * numCourses
        for course, prerequisite in prerequisites:
            edges[prerequisite].append(course)
            degree[course] += 1
        queue = [course for course, count in enumerate(degree) if count == 0]
        for course in queue:
            for dependent in edges[course]:
                degree[dependent] -= 1
                if degree[dependent] == 0:
                    queue.append(dependent)
        return len(queue) == numCourses
