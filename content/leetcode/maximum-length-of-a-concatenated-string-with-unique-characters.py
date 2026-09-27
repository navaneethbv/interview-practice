class Solution:
    def maxLength(self, arr):
        masks = {0}
        for word in arr:
            word_mask = self._word_mask(word)
            if word_mask == -1:
                continue
            additions = {previous | word_mask for previous in masks
                         if previous & word_mask == 0}
            masks.update(additions)
        return max(mask.bit_count() for mask in masks)

    def _word_mask(self, word):
        mask = 0
        for character in word:
            bit = 1 << (ord(character) - ord('a'))
            if mask & bit:
                return -1
            mask |= bit
        return mask
