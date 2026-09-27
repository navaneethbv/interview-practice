class Solution:
    def convertToTitle(self, columnNumber):
        letters = []

        while columnNumber > 0:
            columnNumber, remainder = divmod(columnNumber - 1, 26)
            letters.append(chr(ord("A") + remainder))

        return "".join(reversed(letters))
