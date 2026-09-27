class Solution:
    def countAndSay(self, n):
        term='1'
        for _ in range(n-1):
            out=[];i=0
            while i<len(term):
                j=i+1
                while j<len(term) and term[j]==term[i]:j+=1
                out.append(str(j-i)+term[i]);i=j
            term=''.join(out)
        return term
