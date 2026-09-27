class Solution:
    def nthMagicalNumber(self, n, a, b):
        import math
        least_common_multiple = a * b // math.gcd(a, b)
        left = min(a, b)
        right = n * left
        while left<right:
            middle = (left + right) // 2
            count = middle // a + middle // b - middle // least_common_multiple
            if count >= n:
                right = middle
            else:
                left = middle + 1
        return left%1000000007
