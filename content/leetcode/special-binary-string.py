class Solution:
    def makeLargestSpecial(self, s):
        parts = []
        balance = 0
        start = 0
        for index, bit in enumerate(s):
            balance += 1 if bit == '1' else -1
            if balance == 0:
                inside = self.makeLargestSpecial(s[start + 1:index])
                parts.append('1' + inside + '0')
                start = index + 1
        parts.sort(reverse=True)
        return ''.join(parts)
