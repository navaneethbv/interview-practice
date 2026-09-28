class Solution:
    def join(self, arr, s):
        characters = []
        for index, word in enumerate(arr):
            if index > 0:
                characters.extend(s)
            characters.extend(word)
        return "".join(characters)
