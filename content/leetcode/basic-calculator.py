class Solution:
    def calculate(self, s):
        total = 0
        sign = 1
        number = 0
        stack = []
        for character in s:
            if character.isdigit():
                number = number * 10 + int(character)
            elif character in '+-':
                total += sign * number
                number = 0
                sign = 1 if character == '+' else -1
            elif character == '(':
                stack.append((total, sign))
                total = 0
                sign = 1
            elif character == ')':
                total += sign * number
                number = 0
                previous_total, outer_sign = stack.pop()
                total = previous_total + outer_sign * total
        return total + sign * number
