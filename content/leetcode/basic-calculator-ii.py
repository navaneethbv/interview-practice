class Solution:
    def calculate(self, s):
        terms = []
        number = 0
        operator = '+'
        for character in s + '+':
            if character.isdigit():
                number = number * 10 + int(character)
            elif character != ' ':
                if operator == '+':
                    terms.append(number)
                elif operator == '-':
                    terms.append(-number)
                elif operator == '*':
                    terms[-1] *= number
                else:
                    previous = terms[-1]
                    terms[-1] = (abs(previous) // number) * (-1 if previous < 0 else 1)
                number = 0
                operator = character
        return sum(terms)
