class Solution:
    def isUgly(self, n):
        if n <= 0:
            return False

        for prime_factor in (2, 3, 5):
            while n % prime_factor == 0:
                n //= prime_factor
        return n == 1
