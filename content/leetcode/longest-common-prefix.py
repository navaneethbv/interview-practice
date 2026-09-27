class Solution:
    def longestCommonPrefix(self, strs):
        prefix = strs[0]
        for index in range(1, len(strs)):
            word = strs[index]
            while not word.startswith(prefix):
                prefix = prefix[:-1]
        return prefix
