class Solution:
    def characterReplacement(self, s, k):
        counts = {}
        left = best = peak = 0
        for right, character in enumerate(s):
            counts[character] = counts.get(character, 0) + 1
            peak = max(peak, counts[character])
            while right - left + 1 - peak > k:
                counts[s[left]] -= 1
                left += 1
            best = max(best, right - left + 1)
        return best
