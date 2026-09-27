class Solution:
    def countRangeSum(self, nums, lower, upper):
        prefix=[0]
        for x in nums:prefix.append(prefix[-1]+x)
        return self._solve(prefix,lower,upper)[1]

    def _solve(self, values, lower, upper):
        """Merge sort over prefix sums, counting pairs whose difference falls in range."""
        if len(values)<2:return values,0
        mid=len(values)//2
        left,a=self._solve(values[:mid],lower,upper);right,b=self._solve(values[mid:],lower,upper)
        return self._merge(left,right),a+b+self._cross_count(left,right,lower,upper)

    def _cross_count(self, left, right, lower, upper):
        count=lo=hi=0
        for x in left:
            while lo<len(right) and right[lo]-x<lower:lo+=1
            while hi<len(right) and right[hi]-x<=upper:hi+=1
            count+=hi-lo
        return count

    def _merge(self, left, right):
        merged=[];i=j=0
        while i<len(left) and j<len(right):
            if left[i]<=right[j]:merged.append(left[i]);i+=1
            else:merged.append(right[j]);j+=1
        return merged+left[i:]+right[j:]
