class Solution:
    def removeInvalidParentheses(self, s):
        current_level = {s}
        while True:
            valid_results = [text for text in current_level if self._is_valid(text)]
            if valid_results:
                return sorted(valid_results)
            current_level = self._next_level(current_level)

    def _is_valid(self, text):
        balance = 0
        for character in text:
            if character == "(":
                balance += 1
            elif character == ")":
                balance -= 1
                if balance < 0:
                    return False
        return balance == 0

    def _next_level(self, texts):
        next_level = set()
        for text in texts:
            for index, character in enumerate(text):
                if character in "()":
                    next_level.add(text[:index] + text[index + 1:])
        return next_level
