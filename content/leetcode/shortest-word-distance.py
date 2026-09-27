class Solution:
    def shortestDistance(self, wordsDict, word1, word2):
        first = -1
        second = -1
        best = len(wordsDict)
        for index, word in enumerate(wordsDict):
            if word == word1:
                first = index
            if word == word2:
                second = index
            if first >= 0 and second >= 0:
                best = min(best, abs(first - second))
        return best
