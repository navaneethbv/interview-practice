from collections import defaultdict


class Solution:
    def groupAnagrams(self, strs):
        groups = defaultdict(list)
        for word in strs:
            counts = [0] * 26
            for character in word:
                counts[ord(character) - ord('a')] += 1
            groups[tuple(counts)].append(word)
        return list(groups.values())
