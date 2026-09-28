class Solution:
    def longestPrefix(self, s):
        prefix_length = [0] * len(s)
        for index in range(1, len(s)):
            candidate = prefix_length[index - 1]
            while candidate > 0 and s[index] != s[candidate]:
                candidate = prefix_length[candidate - 1]
            if s[index] == s[candidate]:
                candidate += 1
            prefix_length[index] = candidate
        return s[:prefix_length[-1]]
