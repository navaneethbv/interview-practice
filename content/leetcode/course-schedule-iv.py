class Solution:
    def checkIfPrerequisite(self, numCourses, prerequisites, queries):
        reach=[[False]*numCourses for _ in range(numCourses)]
        for a,b in prerequisites: reach[a][b]=True
        for middle in range(numCourses):
            for a in range(numCourses):
                if reach[a][middle]:
                    for b in range(numCourses): reach[a][b] |= reach[middle][b]
        return [reach[a][b] for a,b in queries]
