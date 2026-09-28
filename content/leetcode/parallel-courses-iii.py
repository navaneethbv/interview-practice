from collections import deque


class Solution:
    def minimumTime(self, n, relations, time):
        graph = [[] for _ in range(n)]
        degree = [0] * n
        for prerequisite, course in relations:
            graph[prerequisite - 1].append(course - 1)
            degree[course - 1] += 1
        finish = time[:]
        ready = deque(index for index in range(n) if degree[index] == 0)
        while ready:
            course = ready.popleft()
            for next_course in graph[course]:
                finish[next_course] = max(finish[next_course], finish[course] + time[next_course])
                degree[next_course] -= 1
                if degree[next_course] == 0:
                    ready.append(next_course)
        return max(finish)
