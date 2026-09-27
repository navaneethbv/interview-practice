class Solution:
    def numSteps(self,s):
        carry=steps=0
        for c in s[:0:-1]:
            if int(c)+carry==1:steps+=2;carry=1
            else:steps+=1
        return steps+carry
