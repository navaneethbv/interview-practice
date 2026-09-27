class Solution:
    def beautySum(self,s):
        total=0
        for i in range(len(s)):
            counts=[0]*26
            for c in s[i:]:
                counts[ord(c)-97]+=1;nonzero=[x for x in counts if x];total+=max(nonzero)-min(nonzero)
        return total
