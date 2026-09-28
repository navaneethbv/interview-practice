class Solution:
    def countRangeSum(self, nums, lower, upper):
        prefix = [0]
        for value in nums:
            prefix.append(prefix[-1] + value)
        _, count = self._solve(prefix, lower, upper)
        return count

    def _solve(self, values, lower, upper):
        if len(values) < 2:
            return values, 0
        middle = len(values) // 2
        left, left_count = self._solve(values[:middle], lower, upper)
        right, right_count = self._solve(values[middle:], lower, upper)
        crossing_count = self._cross_count(left, right, lower, upper)
        merged = self._merge(left, right)
        return merged, left_count + right_count + crossing_count

    def _cross_count(self, left, right, lower, upper):
        count = 0
        lower_index = 0
        upper_index = 0
        for left_value in left:
            while lower_index < len(right) and right[lower_index] - left_value < lower:
                lower_index += 1
            while upper_index < len(right) and right[upper_index] - left_value <= upper:
                upper_index += 1
            count += upper_index - lower_index
        return count

    def _merge(self, left, right):
        merged = []
        left_index = 0
        right_index = 0
        while left_index < len(left) and right_index < len(right):
            if left[left_index] <= right[right_index]:
                merged.append(left[left_index])
                left_index += 1
            else:
                merged.append(right[right_index])
                right_index += 1
        merged.extend(left[left_index:])
        merged.extend(right[right_index:])
        return merged
