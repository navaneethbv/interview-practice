class Solution:
    def addStrings(self, num1, num2):
        first_index = len(num1) - 1
        second_index = len(num2) - 1
        carry = 0
        digits = []

        while first_index >= 0 or second_index >= 0 or carry:
            first_digit = int(num1[first_index]) if first_index >= 0 else 0
            second_digit = int(num2[second_index]) if second_index >= 0 else 0
            total = first_digit + second_digit + carry
            carry, digit = divmod(total, 10)
            digits.append(str(digit))
            first_index -= 1
            second_index -= 1

        return "".join(reversed(digits))
