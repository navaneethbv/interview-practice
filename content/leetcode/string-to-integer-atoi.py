class Solution:
    def myAtoi(self, s):
        index = 0
        while index < len(s) and s[index] == " ":
            index += 1

        sign = 1
        if index < len(s) and s[index] in "+-":
            sign = -1 if s[index] == "-" else 1
            index += 1

        value = 0
        limit = 2147483647 if sign == 1 else 2147483648
        while index < len(s) and "0" <= s[index] <= "9":
            digit = int(s[index])
            if value > (limit - digit) // 10:
                return sign * limit
            value = value * 10 + digit
            index += 1
        return value * sign
