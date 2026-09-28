from collections import Counter


class Solution:
    def getHint(self, secret, guess):
        bulls = sum(left == right for left, right in zip(secret, guess))
        shared = sum((Counter(secret) & Counter(guess)).values())
        return f'{bulls}A{shared - bulls}B'
