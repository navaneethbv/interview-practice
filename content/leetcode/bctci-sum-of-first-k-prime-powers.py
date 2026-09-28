import heapq


class Solution:
    MOD = 1_000_000_007

    def sumPrimePowers(self, primes, k):
        heap = [(prime, prime) for prime in primes]
        heapq.heapify(heap)
        total = 0
        for _ in range(k):
            value, prime = heapq.heappop(heap)
            total = (total + value) % self.MOD
            heapq.heappush(heap, (value * prime, prime))
        return total
