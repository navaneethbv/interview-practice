class Solution:
    def minimumDistance(self, nums):
        positions = {}
        best = len(nums) * 3
        for index, value in enumerate(nums):
            positions.setdefault(value, []).append(index)
            occurrences = positions[value]
            if len(occurrences) >= 3:
                best = min(best, 2 * (index - occurrences[-3]))
        return best if best < len(nums) * 3 else -1
