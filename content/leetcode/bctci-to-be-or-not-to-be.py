class Solution:
    def shakespearify(self, sentence):
        words = sentence.split()
        results = []

        def choose(index, kept):
            if index == len(words):
                results.append(" ".join(kept))
                return
            choose(index + 1, kept)
            kept.append(words[index])
            choose(index + 1, kept)
            kept.pop()

        choose(0, [])
        return results
