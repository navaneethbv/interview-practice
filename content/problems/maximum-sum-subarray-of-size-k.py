class Solution:
    def max_sub_array_of_size_k(self, k: int, arr: List[int]) -> int:
        best = window = 0
        for i, x in enumerate(arr):
            window += x
            if i >= k - 1:
                best = max(best, window)
                window -= arr[i - k + 1]
        return best
