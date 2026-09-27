class Solution:
    def maxRunTime(self, n, batteries):
        left = 0
        right = sum(batteries) // n
        while left < right:
            middle = (left + right + 1) // 2
            available = sum(min(battery, middle) for battery in batteries)
            if available >= n * middle:
                left = middle
            else:
                right = middle - 1
        return left
