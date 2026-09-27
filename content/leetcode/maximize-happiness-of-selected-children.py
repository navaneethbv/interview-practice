class Solution:
    def maximumHappinessSum(self, happiness, k):
        return sum(max(0,value-i) for i,value in enumerate(sorted(happiness,reverse=True)[:k]))
