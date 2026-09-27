class Solution:
    def fairCandySwap(self, aliceSizes, bobSizes):
        difference = (sum(bobSizes) - sum(aliceSizes)) // 2
        available = set(bobSizes)
        for alice_box in aliceSizes:
            bob_box = alice_box + difference
            if bob_box in available:
                return [alice_box, bob_box]
        return []
