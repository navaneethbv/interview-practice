from math import gcd


class Solution:
    def canMeasureWater(self, x, y, target):
        if target > x + y:
            return False
        return target % gcd(x, y) == 0
