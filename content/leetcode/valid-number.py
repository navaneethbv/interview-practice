class Solution:
    def isNumber(self, s):
        index = self._skip_sign(s, 0)
        length = len(s)
        mantissa_start = index
        index = self._read_digits(s, index)
        mantissa_digits = index - mantissa_start
        if index < length and s[index] == ".":
            index += 1
            fraction_start = index
            index = self._read_digits(s, index)
            mantissa_digits += index - fraction_start
        if mantissa_digits == 0:
            return False
        if index < length and s[index] in "eE":
            index = self._skip_sign(s, index + 1)
            exponent_start = index
            index = self._read_digits(s, index)
            if index == exponent_start:
                return False
        return index == length

    def _read_digits(self, s, index):
        while index < len(s) and "0" <= s[index] <= "9":
            index += 1
        return index

    @staticmethod
    def _skip_sign(s, index):
        if index < len(s) and s[index] in "+-":
            return index + 1
        return index
