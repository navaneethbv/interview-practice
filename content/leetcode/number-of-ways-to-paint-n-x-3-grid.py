class Solution:
    def numOfWays(self, n):
        two=three=6
        for _ in range(1,n): two,three=(3*two+2*three)%1000000007,(2*two+2*three)%1000000007
        return (two+three)%1000000007
