class Solution:
    def concatenatedBinary(self, n):
        modulus = 1000000007
        result = 0
        bit_length = 0
        for value in range(1, n + 1):
            if value & (value - 1) == 0:
                bit_length += 1
            result = ((result << bit_length) + value) % modulus
        return result
