class Solution:
    def xorAfterQueries(self, nums, queries):
        modulus = 1000000007
        threshold = int(len(nums) ** 0.5) + 1
        grouped = {}
        for left, right, step, multiplier in queries:
            if step > threshold:
                self._apply_direct(nums, left, right, step, multiplier, modulus)
            else:
                grouped.setdefault(step, []).append((left, right, multiplier))
        for step, group in grouped.items():
            self._apply_group(nums, step, group, modulus)
        answer = 0
        for value in nums:
            answer ^= value
        return answer

    def _apply_direct(self, nums, left, right, step, multiplier, modulus):
        for index in range(left, right + 1, step):
            nums[index] = nums[index] * multiplier % modulus

    def _apply_group(self, nums, step, queries, modulus):
        factors = [1] * (len(nums) + step)
        for left, right, multiplier in queries:
            end = left + ((right - left) // step + 1) * step
            factors[left] = factors[left] * multiplier % modulus
            inverse = pow(multiplier, modulus - 2, modulus)
            factors[end] = factors[end] * inverse % modulus
        for index in range(len(nums)):
            if index >= step:
                factors[index] = factors[index] * factors[index - step] % modulus
            nums[index] = nums[index] * factors[index] % modulus
