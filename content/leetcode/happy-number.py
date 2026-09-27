class Solution:
    def isHappy(self, n):
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            digit_square_sum = 0
            for digit in str(n):
                digit_square_sum += int(digit) ** 2
            n = digit_square_sum
        return n == 1
