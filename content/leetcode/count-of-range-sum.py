class Solution:
    def countRangeSum(self, nums, lower, upper):
        prefix=[0]
        for x in nums:prefix.append(prefix[-1]+x)
        def solve(values):
            if len(values)<2:return values,0
            mid=len(values)//2;left,a=solve(values[:mid]);right,b=solve(values[mid:]);count=a+b;lo=hi=0
            for x in left:
                while lo<len(right) and right[lo]-x<lower:lo+=1
                while hi<len(right) and right[hi]-x<=upper:hi+=1
                count+=hi-lo
            merged=[];i=j=0
            while i<len(left) and j<len(right):
                if left[i]<=right[j]:merged.append(left[i]);i+=1
                else:merged.append(right[j]);j+=1
            return merged+left[i:]+right[j:],count
        return solve(prefix)[1]
