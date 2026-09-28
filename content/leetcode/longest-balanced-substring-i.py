class Solution:
    def longestBalanced(self, s):
        answer = 0
        for start in range(len(s)):
            counts = {}
            largest_count = 0
            for end in range(start, len(s)):
                character = s[end]
                counts[character] = counts.get(character, 0) + 1
                largest_count = max(largest_count, counts[character])
                length = end - start + 1
                if largest_count * len(counts) == length:
                    answer = max(answer, length)
        return answer
