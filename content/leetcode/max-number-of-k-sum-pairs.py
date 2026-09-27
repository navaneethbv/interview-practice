class Solution:
    def maxOperations(self, nums, k):
        from collections import Counter
        available = Counter()
        total = 0
        for value in nums:
            complement = k - value
            if available[complement] > 0:
                available[complement] -= 1
                total += 1
            else:
                available[value] += 1
        return total
