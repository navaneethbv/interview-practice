class Solution:
    def divide(self, dividend, divisor):
        negative_result = (dividend < 0) != (divisor < 0)
        dividend_magnitude = abs(dividend)
        divisor_magnitude = abs(divisor)
        quotient = 0

        for shift in range(31, -1, -1):
            shifted_divisor = divisor_magnitude << shift
            if shifted_divisor <= dividend_magnitude:
                dividend_magnitude -= shifted_divisor
                quotient |= 1 << shift

        if negative_result:
            quotient = -quotient
        return min(2147483647, max(-2147483648, quotient))
