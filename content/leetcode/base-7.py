class Solution:
    def convertToBase7(self, num):
        if num == 0:
            return "0"
        negative = num < 0
        magnitude = abs(num)
        digits = []
        while magnitude:
            magnitude, digit = divmod(magnitude, 7)
            digits.append(str(digit))
        sign = "-" if negative else ""
        return sign + "".join(reversed(digits))
