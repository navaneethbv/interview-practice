class Solution:
    def fairCandySwap(self,aliceSizes,bobSizes):
        difference=(sum(bobSizes)-sum(aliceSizes))//2;available=set(bobSizes)
        for a in aliceSizes:
            if a+difference in available:return [a,a+difference]
