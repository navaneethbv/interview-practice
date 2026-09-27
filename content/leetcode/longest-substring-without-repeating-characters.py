class Solution:
    def lengthOfLongestSubstring(self, s):
        last = {}
        left = best = 0
        for right, ch in enumerate(s):
            left = max(left, last.get(ch, -1) + 1)
            last[ch] = right
            best = max(best, right-left+1)
        return best
