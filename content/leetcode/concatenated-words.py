class Solution:
    def findAllConcatenatedWordsInADict(self, words):
        available = set(words)
        concatenated = []
        for word in words:
            possible = [False] * (len(word) + 1)
            possible[0] = True
            for end in range(1, len(word) + 1):
                for start in range(end):
                    can_use_word = start > 0 or end < len(word)
                    if possible[start] and can_use_word and word[start:end] in available:
                        possible[end] = True
                        break
            if possible[-1]:
                concatenated.append(word)
        return concatenated
