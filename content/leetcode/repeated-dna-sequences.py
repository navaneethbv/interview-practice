class Solution:

    def findRepeatedDnaSequences(self, s):
        seen = set()
        repeated = set()
        for i in range(len(s) - 9):
            part = s[i:i + 10]
            if part in seen:
                repeated.add(part)
            seen.add(part)
        return sorted(repeated)
