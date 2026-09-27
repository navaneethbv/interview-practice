class Solution:
    def canTransform(self, start, result):
        a=[(c,i) for i,c in enumerate(start) if c!='X'];b=[(c,i) for i,c in enumerate(result) if c!='X']
        if len(a)!=len(b):return False
        return all(c==d and (j<=i if c=='L' else j>=i) for (c,i),(d,j) in zip(a,b))
