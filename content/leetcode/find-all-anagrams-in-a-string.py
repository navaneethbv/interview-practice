from collections import Counter
class Solution:
    def findAnagrams(self, s, p):
        need = Counter(p)
        window = Counter()
        result = []
        for i,c in enumerate(s):
            window[c] += 1
            if i >= len(p):
                old = s[i-len(p)]
                window[old] -= 1
                if window[old] == 0:
                    del window[old]
            if window == need:
                result.append(i-len(p)+1)
        return result
