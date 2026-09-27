class Solution:
    def intToRoman(self, num):
        values_and_symbols = [
            (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
            (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
            (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
        ]
        roman_parts = []
        for value, symbol in values_and_symbols:
            count, num = divmod(num, value)
            roman_parts.append(symbol * count)
        return "".join(roman_parts)
