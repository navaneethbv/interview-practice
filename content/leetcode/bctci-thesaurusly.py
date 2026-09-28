class Solution:
    def thesaurusly(self, sentence, synonyms):
        options = {entry[0]: entry[1:] for entry in synonyms}
        words = sentence.split()
        results = []

        def build(index, chosen):
            if index == len(words):
                results.append(" ".join(chosen))
                return
            for word in options.get(words[index], [words[index]]):
                chosen.append(word)
                build(index + 1, chosen)
                chosen.pop()

        build(0, [])
        return results
