class Solution:
    def lengthOfLongestSubstringKDistinct(self, s, k):
        counts = {}
        left = 0
        best_length = 0
        for right, character in enumerate(s):
            counts[character] = counts.get(character, 0) + 1
            while len(counts) > k:
                left_character = s[left]
                counts[left_character] -= 1
                if counts[left_character] == 0:
                    del counts[left_character]
                left += 1
            best_length = max(best_length, right - left + 1)
        return best_length
