from bisect import bisect_left
class Solution:
    def minimumCost(self, nums, k, dist):
        values = sorted(set(nums[1:]))
        counts = [0] * (len(values) + 1)
        sums = [0] * (len(values) + 1)
        width = dist + 1
        for value in nums[1:width + 1]:
            self._update(values, counts, sums, value, 1)
        best = self._smallest(values, counts, sums, k - 1)
        for right in range(width + 1, len(nums)):
            self._update(values, counts, sums, nums[right - width], -1)
            self._update(values, counts, sums, nums[right], 1)
            best = min(best, self._smallest(values, counts, sums, k - 1))
        return nums[0] + best

    def _update(self, values, counts, sums, value, delta):
        index = bisect_left(values, value) + 1
        while index < len(counts):
            counts[index] += delta
            sums[index] += delta * value
            index += index & -index

    def _smallest(self, values, counts, sums, amount):
        position = 0
        total = 0
        step = 1 << (len(values).bit_length() - 1)
        while step:
            next_position = position + step
            if next_position < len(counts) and counts[next_position] < amount:
                amount -= counts[next_position]
                total += sums[next_position]
                position = next_position
            step //= 2
        return total + amount * values[position]
