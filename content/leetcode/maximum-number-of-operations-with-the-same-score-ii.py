class Solution:
    def maxOperations(self, nums):
        n = len(nums)
        possible_scores = {nums[0] + nums[1], nums[-2] + nums[-1], nums[0] + nums[-1]}
        return max(self._best_for_score(nums, score) for score in possible_scores)

    def _best_for_score(self, nums, score):
        n = len(nums)
        best_operations = [[0] * n for _ in range(n)]
        for length in range(2, n + 1):
            for left in range(n - length + 1):
                right = left + length - 1
                best = 0
                if nums[left] + nums[left + 1] == score:
                    best = max(best, 1 + self._stored(best_operations, left + 2, right))
                if nums[right - 1] + nums[right] == score:
                    best = max(best, 1 + self._stored(best_operations, left, right - 2))
                if nums[left] + nums[right] == score:
                    best = max(best, 1 + self._stored(best_operations, left + 1, right - 1))
                best_operations[left][right] = best
        return best_operations[0][n - 1]

    def _stored(self, table, left, right):
        if left > right:
            return 0
        return table[left][right]
