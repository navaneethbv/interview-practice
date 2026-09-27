class Solution:
    def numberOfSubarrays(self, nums, k):
        from collections import Counter
        counts=Counter({0:1}); odd=total=0
        for value in nums:
            odd+=value%2; total+=counts[odd-k]; counts[odd]+=1
        return total
