class Solution:
    def characterReplacement(self, s, k):
        counts = {}
        left = best = peak = 0
        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch,0)+1
            peak = max(peak,counts[ch])
            while right-left+1-peak > k:
                counts[s[left]] -= 1
                left += 1
            best = max(best,right-left+1)
        return best
