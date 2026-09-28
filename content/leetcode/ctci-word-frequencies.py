from collections import Counter


class WordFrequencies:
    def __init__(self, book):
        self.counts = Counter(word.lower() for word in book)

    def getFrequency(self, word):
        return self.counts[word.lower()]
