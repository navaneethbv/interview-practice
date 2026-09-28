class Solution:
    def replaceWords(self, dictionary, sentence):
        roots = set(dictionary)
        result = []
        for word in sentence.split():
            replacement = word
            for length in range(1, len(word) + 1):
                prefix = word[:length]
                if prefix in roots:
                    replacement = prefix
                    break
            result.append(replacement)
        return " ".join(result)
