class Solution:
    def combinationSum3(self, k, n):
        combinations = []
        self._visit(1, k, n, [], combinations)
        return combinations

    def _visit(self, start, remaining_slots, remaining_sum, path, combinations):
        if remaining_slots == 0:
            if remaining_sum == 0:
                combinations.append(path[:])
            return
        for value in range(start, 10):
            if value > remaining_sum:
                break
            path.append(value)
            self._visit(value + 1, remaining_slots - 1, remaining_sum - value, path, combinations)
            path.pop()
