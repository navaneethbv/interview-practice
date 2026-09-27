class Solution:
    def mostWordsFound(self, sentences):
        maximum = 0
        for sentence in sentences:
            maximum = max(maximum, sentence.count(" ") + 1)
        return maximum
