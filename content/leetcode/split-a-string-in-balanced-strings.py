class Solution:
    def balancedStringSplit(self, s):
        balance = 0
        parts = 0
        for character in s:
            balance += 1 if character == 'L' else -1
            if balance == 0:
                parts += 1
        return parts
