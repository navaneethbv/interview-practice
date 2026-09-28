class Solution:

    def minMoves(self, nums, limit):
        d = [0] * (2 * limit + 3)
        for a, b in zip(nums[:len(nums) // 2], reversed(nums[len(nums) // 2:])):
            lo, hi = (min(a, b), max(a, b))
            d[2] += 2
            d[lo + 1] -= 1
            d[a + b] -= 1
            d[a + b + 1] += 1
            d[hi + limit + 1] += 1
        total = 0
        ans = len(nums)
        for s in range(2, 2 * limit + 1):
            total += d[s]
            ans = min(ans, total)
        return ans
