class Solution:
    def numJewelsInStones(self, jewels, stones):
        jewel_characters = set(jewels)
        return sum(character in jewel_characters for character in stones)
