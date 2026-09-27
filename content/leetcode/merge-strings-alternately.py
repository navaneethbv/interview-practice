class Solution:
    def mergeAlternately(self, word1, word2):
        characters = []
        for index in range(max(len(word1), len(word2))):
            if index < len(word1):
                characters.append(word1[index])
            if index < len(word2):
                characters.append(word2[index])
        return ''.join(characters)
