class Solution:
    def maxLength(self,arr):
        masks={0}
        for word in arr:
            if len(set(word))!=len(word):continue
            mask=sum(1<<(ord(c)-97) for c in word)
            masks|={old|mask for old in masks if not old&mask}
        return max(mask.bit_count() for mask in masks)
