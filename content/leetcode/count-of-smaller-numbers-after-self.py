class Solution:
    def countSmaller(self,nums):
        rank={v:i+1 for i,v in enumerate(sorted(set(nums)))}
        bit=[0]*(len(rank)+1)
        result=[]
        for value in reversed(nums):
            i=rank[value]-1
            count=0
            while i: count+=bit[i]; i-=i&-i
            result.append(count)
            i=rank[value]
            while i<len(bit):bit[i]+=1;i+=i&-i
        return result[::-1]
