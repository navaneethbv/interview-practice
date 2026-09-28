class Solution:
    def minimumSemesters(self, n, relations):
        graph = [[] for _ in range(n + 1)]
        prerequisites = [0] * (n + 1)
        for before, after in relations:
            graph[before].append(after)
            prerequisites[after] += 1
        level = [course for course in range(1, n + 1) if prerequisites[course] == 0]
        completed = 0
        semesters = 0
        while level:
            semesters += 1
            completed += len(level)
            following = []
            for node in level:
                for next_course in graph[node]:
                    prerequisites[next_course] -= 1
                    if prerequisites[next_course] == 0:
                        following.append(next_course)
            level = following
        return semesters if completed == n else -1
