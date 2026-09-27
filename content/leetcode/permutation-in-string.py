from collections import Counter
class Solution:
    def checkInclusion(self, s1, s2):
        needed = Counter(s1)
        current = Counter()
        for i,c in enumerate(s2):
            current[c] += 1
            if i >= len(s1):
                old = s2[i-len(s1)]; current[old] -= 1
                if current[old] == 0: del current[old]
            if current == needed: return True
        return False
