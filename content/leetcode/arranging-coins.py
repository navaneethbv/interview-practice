class Solution:
    def arrangeCoins(self, n):
        left = 0
        right = n
        while left<=right:
            middle = (left + right) // 2
            coins_needed = middle * (middle + 1) // 2
            if coins_needed <= n:
                left = middle + 1
            else:
                right = middle - 1
        return right
