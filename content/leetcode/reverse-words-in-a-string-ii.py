class Solution:
    def reverseWords(self,s):
        def reverse(lo,hi):
            while lo<hi:s[lo],s[hi]=s[hi],s[lo];lo+=1;hi-=1
        reverse(0,len(s)-1);start=0
        for i in range(len(s)+1):
            if i==len(s) or s[i]==' ':reverse(start,i-1);start=i+1
