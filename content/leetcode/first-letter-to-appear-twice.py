class Solution:
    def repeatedCharacter(self, s):
        seen = set()
        for character in s:
            if character in seen:
                return character
            seen.add(character)
