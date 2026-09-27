class Solution:
    def minCost(self, nums, cost):
        half=(sum(cost)+1)//2;running=0
        for value,weight in sorted(zip(nums,cost)):
            running+=weight
            if running>=half:target=value;break
        return sum(abs(value-target)*weight for value,weight in zip(nums,cost))
