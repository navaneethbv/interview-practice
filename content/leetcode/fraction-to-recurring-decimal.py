class Solution:
    def fractionToDecimal(self, numerator, denominator):
        if numerator == 0:
            return '0'
        sign = '-' if (numerator < 0) != (denominator < 0) else ''
        dividend = abs(numerator)
        divisor = abs(denominator)
        whole, remainder = divmod(dividend, divisor)
        result = sign + str(whole)
        if remainder == 0:
            return result
        digits = []
        seen = {}
        while remainder and remainder not in seen:
            seen[remainder] = len(digits)
            digit, remainder = divmod(remainder * 10, divisor)
            digits.append(str(digit))
        if remainder:
            repeat_start = seen[remainder]
            digits.insert(repeat_start, '(')
            digits.append(')')
        return result + '.' + ''.join(digits)
