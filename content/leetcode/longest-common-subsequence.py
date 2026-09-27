class Solution:
    def longestCommonSubsequence(self, text1, text2):
        previous = [0] * (len(text2) + 1)
        for first in text1:
            current = [0]
            for column, second in enumerate(text2):
                if first == second:
                    current.append(previous[column] + 1)
                else:
                    current.append(max(previous[column + 1], current[-1]))
            previous = current
        return previous[-1]
