class Solution:
    def countBinarySubstrings(self, s):
        previous=0; current=1; total=0
        for i in range(1,len(s)):
            if s[i]==s[i-1]: current+=1
            else: total+=min(previous,current); previous,current=current,1
        return total+min(previous,current)
