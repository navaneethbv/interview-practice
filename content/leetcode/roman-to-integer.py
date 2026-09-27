class Solution:
    def romanToInt(self, s):
        values = {'I': 1, 'V': 5, 'X': 10, 'L': 50,
                  'C': 100, 'D': 500, 'M': 1000}
        total = 0
        for index, symbol in enumerate(s):
            is_subtractive = (index + 1 < len(s)
                              and values[symbol] < values[s[index + 1]])
            total += -values[symbol] if is_subtractive else values[symbol]
        return total
