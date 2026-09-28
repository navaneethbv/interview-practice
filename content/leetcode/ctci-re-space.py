class Solution:
    def respace(self, dictionary, sentence):
        words = set(dictionary)
        longest = max((len(word) for word in words), default=0)
        n = len(sentence)
        best = [0] * (n + 1)
        for start in range(n - 1, -1, -1):
            best[start] = best[start + 1] + 1
            for end in range(start + 1, min(n, start + longest) + 1):
                if sentence[start:end] in words:
                    best[start] = min(best[start], best[end])
        return best[0]
