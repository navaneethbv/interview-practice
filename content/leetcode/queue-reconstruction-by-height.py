class Solution:
    def reconstructQueue(self, people):
        result=[]
        for person in sorted(people,key=lambda p:(-p[0],p[1])): result.insert(person[1],person)
        return result
