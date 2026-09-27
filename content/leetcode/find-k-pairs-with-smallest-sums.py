import heapq
class Solution:
    def kSmallestPairs(self, nums1, nums2, k):
        heap=[(nums1[i]+nums2[0],i,0) for i in range(min(k,len(nums1)))];heapq.heapify(heap);out=[]
        while heap and len(out)<k:
            total,i,j=heapq.heappop(heap);out.append([nums1[i],nums2[j]])
            if j+1<len(nums2):heapq.heappush(heap,(nums1[i]+nums2[j+1],i,j+1))
        return out
