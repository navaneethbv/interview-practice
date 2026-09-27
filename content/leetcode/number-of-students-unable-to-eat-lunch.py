class Solution:
    def countStudents(self, students, sandwiches):
        count=[students.count(0),students.count(1)]
        for value in sandwiches:
            if count[value]==0:break
            count[value]-=1
        return sum(count)
