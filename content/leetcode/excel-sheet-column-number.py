class Solution:
    def titleToNumber(self,columnTitle):
        result=0
        for c in columnTitle:result=result*26+ord(c)-ord('A')+1
        return result
