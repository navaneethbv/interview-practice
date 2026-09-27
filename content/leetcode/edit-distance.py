class Solution:
    def minDistance(self, word1, word2):
        previous = list(range(len(word2)+1))
        for i,a in enumerate(word1,1):
            current = [i]
            for j,b in enumerate(word2,1):
                current.append(previous[j-1] if a == b else 1+min(previous[j],current[-1],previous[j-1]))
            previous = current
        return previous[-1]
