class Solution:
    KEYS = {letter: digit for digit, letters in {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }.items() for letter in letters}

    def getValidT9Words(self, digits, words):
        return [word for word in words if self._to_digits(word) == digits]

    def _to_digits(self, word):
        return "".join(self.KEYS[letter] for letter in word)
