class Solution:
    def split(self, s, c):
        if not s:
            return []
        pieces = []
        start = 0
        for index, character in enumerate(s):
            if character == c:
                pieces.append(s[start:index])
                start = index + 1
        pieces.append(s[start:])
        return pieces
