import math


class Solution:
    def getPermutation(self, n, k):
        available = [str(value) for value in range(1, n + 1)]
        permutation = []
        k -= 1

        while available:
            block_size = math.factorial(len(available) - 1)
            index, k = divmod(k, block_size)
            permutation.append(available.pop(index))

        return "".join(permutation)
