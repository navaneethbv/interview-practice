from collections import Counter
class Solution:
    def subarraySum(self, nums, k):
        counts=Counter({0:1});total=answer=0
        for value in nums:
            total+=value;answer+=counts[total-k];counts[total]+=1
        return answer
