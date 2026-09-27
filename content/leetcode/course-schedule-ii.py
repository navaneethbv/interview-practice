from collections import deque
class Solution:
    def findOrder(self, numCourses, prerequisites):
        following = [[] for _ in range(numCourses)]
        degree = [0]*numCourses
        for course, prerequisite in prerequisites:
            following[prerequisite].append(course)
            degree[course] += 1
        queue = deque(i for i in range(numCourses) if degree[i] == 0)
        result = []
        while queue:
            course = queue.popleft()
            result.append(course)
            for child in following[course]:
                degree[child] -= 1
                if degree[child] == 0:
                    queue.append(child)
        return result if len(result) == numCourses else []
