class Solution:

    def nthSuperUglyNumber(self, n, primes):
        values = [1]
        p = [0] * len(primes)
        for _ in range(n - 1):
            v = min((primes[j] * values[p[j]] for j in range(len(primes))))
            values.append(v)
            for j in range(len(primes)):
                if primes[j] * values[p[j]] == v:
                    p[j] += 1
        return values[-1]
