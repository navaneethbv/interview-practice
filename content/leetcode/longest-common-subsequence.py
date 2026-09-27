class Solution:
    def longestCommonSubsequence(self, text1, text2):
        previous = [0]*(len(text2)+1)
        for a in text1:
            current = [0]
            for j, b in enumerate(text2):
                current.append(previous[j]+1 if a == b else max(previous[j+1], current[-1]))
            previous = current
        return previous[-1]
