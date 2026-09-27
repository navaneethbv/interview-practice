class Solution:
    def letterCombinations(self, digits):
        key_to_letters = {
            '2': 'abc',
            '3': 'def',
            '4': 'ghi',
            '5': 'jkl',
            '6': 'mno',
            '7': 'pqrs',
            '8': 'tuv',
            '9': 'wxyz',
        }
        if not digits:
            return []

        combinations = ['']
        for digit in digits:
            combinations = [
                prefix + letter
                for prefix in combinations
                for letter in key_to_letters[digit]
            ]
        return combinations
