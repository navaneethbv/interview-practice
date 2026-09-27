from collections import deque


class Solution:
    def findOrder(self, numCourses, prerequisites):
        following = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses

        for course, prerequisite in prerequisites:
            following[prerequisite].append(course)
            indegree[course] += 1

        available = deque(
            course for course in range(numCourses) if indegree[course] == 0
        )
        order = []

        while available:
            course = available.popleft()
            order.append(course)
            for next_course in following[course]:
                indegree[next_course] -= 1
                if indegree[next_course] == 0:
                    available.append(next_course)

        return order if len(order) == numCourses else []
