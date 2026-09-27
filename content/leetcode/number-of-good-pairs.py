from collections import Counter
class Solution:
    def numIdenticalPairs(self, nums):return sum(n*(n-1)//2 for n in Counter(nums).values())
