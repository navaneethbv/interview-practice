import heapq
class Solution:
    def smallestRange(self, nums):
        heap=[(row[0],i,0) for i,row in enumerate(nums)];heapq.heapify(heap)
        high=max(row[0] for row in nums);answer=[heap[0][0],high]
        while True:
            low,i,j=heapq.heappop(heap)
            if (high-low,low)<(answer[1]-answer[0],answer[0]):answer=[low,high]
            if j+1==len(nums[i]):break
            value=nums[i][j+1];high=max(high,value);heapq.heappush(heap,(value,i,j+1))
        return answer
