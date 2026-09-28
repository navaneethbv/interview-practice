class Solution:
    def splitWordsBySeparator(self, words, separator):
        pieces = []
        for word in words:
            for piece in word.split(separator):
                if piece:
                    pieces.append(piece)
        return pieces
