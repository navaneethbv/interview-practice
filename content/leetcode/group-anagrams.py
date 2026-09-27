from collections import defaultdict
class Solution:
    def groupAnagrams(self,strs):
        groups=defaultdict(list)
        for word in strs: groups[tuple(sorted(word))].append(word)
        return list(groups.values())
