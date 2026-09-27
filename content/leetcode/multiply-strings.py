class Solution:
    def multiply(self, num1, num2):
        digit_totals = [0] * (len(num1) + len(num2))

        for first_index in range(len(num1) - 1, -1, -1):
            for second_index in range(len(num2) - 1, -1, -1):
                position = first_index + second_index + 1
                product = int(num1[first_index]) * int(num2[second_index])
                digit_totals[position] += product

        for position in range(len(digit_totals) - 1, 0, -1):
            digit_totals[position - 1] += digit_totals[position] // 10
            digit_totals[position] %= 10

        first_nonzero = 0
        while first_nonzero < len(digit_totals) - 1 and digit_totals[first_nonzero] == 0:
            first_nonzero += 1

        return "".join(str(digit) for digit in digit_totals[first_nonzero:])
