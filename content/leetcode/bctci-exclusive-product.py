class Solution:
    MOD = 1_000_000_007

    def exclusiveProduct(self, arr):
        n = len(arr)
        result = [1] * n
        prefix = 1
        for i in range(n):
            result[i] = prefix
            prefix = prefix * arr[i] % self.MOD
        suffix = 1
        for i in range(n - 1, -1, -1):
            result[i] = result[i] * suffix % self.MOD
            suffix = suffix * arr[i] % self.MOD
        return result
