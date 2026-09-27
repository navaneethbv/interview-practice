class Solution:
    def findPairs(self, nums, k):
        counts = {}
        for number in nums:
            counts[number] = counts.get(number, 0) + 1
        if k == 0:
            return sum(count > 1 for count in counts.values())
        return sum(number + k in counts for number in counts)
