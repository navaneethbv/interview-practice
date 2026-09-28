class Solution:
    def countGoodStartEnd(self, sales):
        good = sum(1 for value in sales if value >= 10)
        return good * (good + 1) // 2
