class Solution:
    def findAnagrams(self, s, p):
        target_counts = [0] * 26
        window_counts = [0] * 26
        for character in p:
            target_counts[ord(character) - ord("a")] += 1

        matches = []
        for index, character in enumerate(s):
            window_counts[ord(character) - ord("a")] += 1
            if index >= len(p):
                removed = s[index - len(p)]
                window_counts[ord(removed) - ord("a")] -= 1
            if window_counts == target_counts:
                matches.append(index - len(p) + 1)
        return matches
