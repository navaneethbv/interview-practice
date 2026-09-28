class Solution:
    MAX_DIGITS = 32

    def printBinary(self, num):
        digits = []
        while num > 0:
            if len(digits) == self.MAX_DIGITS:
                return "ERROR"
            num *= 2
            if num >= 1:
                digits.append("1")
                num -= 1
            else:
                digits.append("0")
        return "0." + "".join(digits)
