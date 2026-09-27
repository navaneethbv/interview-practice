class Solution:
    def reversePairs(self, nums):
        def sort_and_count(values):
            if len(values) < 2:
                return values, 0

            middle = len(values) // 2
            left, left_count = sort_and_count(values[:middle])
            right, right_count = sort_and_count(values[middle:])
            cross_count = self._count_cross_pairs(left, right)
            merged = self._merge(left, right)
            return merged, left_count + right_count + cross_count

        _, count = sort_and_count(nums)
        return count

    @staticmethod
    def _count_cross_pairs(left, right):
        count = 0
        right_index = 0
        for value in left:
            while (
                right_index < len(right)
                and value > 2 * right[right_index]
            ):
                right_index += 1
            count += right_index
        return count

    @staticmethod
    def _merge(left, right):
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
