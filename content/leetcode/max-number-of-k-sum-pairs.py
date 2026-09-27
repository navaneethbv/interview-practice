class Solution:
    def maxOperations(self, nums, k):
        from collections import Counter
        available=Counter(); total=0
        for value in nums:
            if available[k-value]>0: available[k-value]-=1; total+=1
            else: available[value]+=1
        return total
