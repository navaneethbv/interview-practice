class Solution:
    def singleNumber(self, nums):
        result = 0

        for bit in range(32):
            set_bits = sum((value >> bit) & 1 for value in nums)
            if set_bits % 3:
                result |= 1 << bit

        if result >= 1 << 31:
            result -= 1 << 32
        return result
