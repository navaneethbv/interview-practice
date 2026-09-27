from collections import Counter


class AutocompleteSystem:
    def __init__(self, sentences, times):
        self.counts = Counter(dict(zip(sentences, times)))
        self.prefix = ""

    def input(self, character):
        if character == "#":
            self.counts[self.prefix] += 1
            self.prefix = ""
            return []

        self.prefix += character
        matching_sentences = [
            sentence for sentence in self.counts
            if sentence.startswith(self.prefix)
        ]
        matching_sentences.sort(
            key=lambda sentence: (-self.counts[sentence], sentence)
        )
        return matching_sentences[:3]
