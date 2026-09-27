class Solution:
    def numJewelsInStones(self, jewels, stones):
        valuable=set(jewels)
        return sum(c in valuable for c in stones)
