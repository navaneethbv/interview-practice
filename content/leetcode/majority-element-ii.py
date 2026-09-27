class Solution:
    def majorityElement(self, nums):
        first_candidate = None
        second_candidate = None
        first_count = 0
        second_count = 0

        for value in nums:
            if value == first_candidate:
                first_count += 1
            elif value == second_candidate:
                second_count += 1
            elif first_count == 0:
                first_candidate = value
                first_count = 1
            elif second_count == 0:
                second_candidate = value
                second_count = 1
            else:
                first_count -= 1
                second_count -= 1

        first_count = sum(value == first_candidate for value in nums)
        second_count = sum(value == second_candidate for value in nums)
        result = []
        if first_count > len(nums) // 3:
            result.append(first_candidate)
        if (second_candidate != first_candidate
                and second_count > len(nums) // 3):
            result.append(second_candidate)
        return result
