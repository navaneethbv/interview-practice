class Solution:
    def generate(self, numRows):
        result=[]
        for r in range(numRows):
            row=[1]*(r+1)
            for c in range(1,r): row[c]=result[-1][c-1]+result[-1][c]
            result.append(row)
        return result
