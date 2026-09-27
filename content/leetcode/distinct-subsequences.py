class Solution:
    def numDistinct(self, s, t):
        ways = [1] + [0] * len(t)
        for source_character in s:
            for target_index in range(len(t) - 1, -1, -1):
                if source_character == t[target_index]:
                    ways[target_index + 1] += ways[target_index]
        return ways[-1]
