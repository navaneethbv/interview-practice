class Solution:
    def maxVowels(self, s, k):
        vowels = set("aeiou")
        count = 0
        best = 0
        for index, character in enumerate(s):
            count += character in vowels
            if index >= k:
                count -= s[index - k] in vowels
            if index >= k - 1:
                best = max(best, count)
        return best
