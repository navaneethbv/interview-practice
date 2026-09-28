def propagate_reachability(reach, source, middle):
    for destination in range(len(reach)):
        reach[source][destination] |= reach[middle][destination]


class Solution:
    def checkIfPrerequisite(self, numCourses, prerequisites, queries):
        reach = [[False] * numCourses for _ in range(numCourses)]
        for prerequisite, course in prerequisites:
            reach[prerequisite][course] = True
        for middle in range(numCourses):
            for source in range(numCourses):
                if not reach[source][middle]:
                    continue
                propagate_reachability(reach, source, middle)
        return [reach[source][destination] for source, destination in queries]
