from math import gcd
class Solution:
    def canMeasureWater(self,x,y,target):return target<=x+y and target%gcd(x,y)==0
