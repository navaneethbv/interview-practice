class Solution:
    def maximumHappinessSum(self, happiness, k):
        selected = sorted(happiness, reverse=True)[:k]
        return sum(max(0, value - index) for index, value in enumerate(selected))
