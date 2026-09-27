class Solution:
    def findScore(self, nums):
        marked=set();score=0
        for value,i in sorted((value,i) for i,value in enumerate(nums)):
            if i not in marked:score+=value;marked.update((i-1,i,i+1))
        return score
