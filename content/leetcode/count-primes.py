class Solution:
    def countPrimes(self, n):
        if n < 3:
            return 0

        is_prime = bytearray(b"\x01") * n
        is_prime[0] = 0
        is_prime[1] = 0

        for prime in range(2, int(n ** 0.5) + 1):
            if is_prime[prime]:
                start = prime * prime
                if start < n:
                    is_prime[start:n:prime] = b"\x00" * (
                        (n - 1 - start) // prime + 1
                    )

        return sum(is_prime)
