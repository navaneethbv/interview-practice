from math import gcd
from functools import reduce


class Solution:
    def minOperations(self, nums, numsDivide):
        common_divisor = reduce(gcd, numsDivide)
        for deletions, value in enumerate(sorted(nums)):
            if common_divisor % value == 0:
                return deletions
        return -1
