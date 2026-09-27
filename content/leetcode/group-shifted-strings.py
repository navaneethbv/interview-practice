class Solution:
    def groupStrings(self, strings):
        from collections import defaultdict
        groups=defaultdict(list)
        for s in strings:
            groups[tuple((ord(c)-ord(s[0]))%26 for c in s)].append(s)
        return list(groups.values())
