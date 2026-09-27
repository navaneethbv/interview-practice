class Solution:
    def maximumPopulation(self,logs):
        delta=[0]*102
        for birth,death in logs:delta[birth-1950]+=1;delta[death-1950]-=1
        count=best=0;year=1950
        for i in range(100):
            count+=delta[i]
            if count>best:best=count;year=1950+i
        return year
