class Solution:
    def findCelebrity(self, n):
        candidate = 0
        for person in range(1,n):
            if knows(candidate,person): candidate=person
        return candidate if all(i==candidate or (not knows(candidate,i) and knows(i,candidate)) for i in range(n)) else -1
