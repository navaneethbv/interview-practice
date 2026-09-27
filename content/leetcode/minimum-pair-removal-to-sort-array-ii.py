class Solution:
    def minimumPairRemoval(self, nums):
        import heapq
        n=len(nums); values=nums[:]; previous=[i-1 for i in range(n)]; following=[i+1 if i+1<n else -1 for i in range(n)]; alive=[True]*n
        heap=[(values[i]+values[i+1],i,i+1) for i in range(n-1)]; heapq.heapify(heap)
        def inversion(a,b): return a!=-1 and b!=-1 and values[a]>values[b]
        bad=sum(inversion(i,i+1) for i in range(n-1)); operations=0
        while bad:
            total,left,right=heapq.heappop(heap)
            if not alive[left] or not alive[right] or following[left]!=right or values[left]+values[right]!=total: continue
            before,after=previous[left],following[right]
            bad-=inversion(before,left)+inversion(left,right)+inversion(right,after)
            values[left]=total; alive[right]=False; following[left]=after
            if after!=-1: previous[after]=left
            bad+=inversion(before,left)+inversion(left,after)
            if before!=-1: heapq.heappush(heap,(values[before]+values[left],before,left))
            if after!=-1: heapq.heappush(heap,(values[left]+values[after],left,after))
            operations+=1
        return operations
