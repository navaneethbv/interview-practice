class Solution:
    def totalNumbers(self, digits):
        from itertools import permutations
        numbers = {
            100 * first + 10 * second + third
            for first, second, third in permutations(digits, 3)
            if first != 0 and third % 2 == 0
        }
        return len(numbers)
