class Solution:
    def lastRemaining(self, n):
        first_value = 1
        step = 1
        left_to_right = True
        remaining = n
        while remaining > 1:
            if left_to_right or remaining % 2 == 1:
                first_value += step
            remaining //= 2
            step *= 2
            left_to_right = not left_to_right
        return first_value
