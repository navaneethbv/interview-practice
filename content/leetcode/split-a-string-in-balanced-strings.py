class Solution:
    def balancedStringSplit(self,s):
        balance=parts=0
        for c in s:
            balance+=1 if c=='L' else -1
            if balance==0:parts+=1
        return parts
