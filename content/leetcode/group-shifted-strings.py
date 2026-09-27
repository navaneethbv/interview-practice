class Solution:
    def groupStrings(self, strings):
        from collections import defaultdict

        groups = defaultdict(list)
        for word in strings:
            first_code = ord(word[0])
            signature = tuple((ord(character) - first_code) % 26 for character in word)
            groups[signature].append(word)
        return list(groups.values())
