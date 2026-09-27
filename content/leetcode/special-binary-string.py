class Solution:
    def makeLargestSpecial(self, s):
        parts=[];balance=start=0
        for i,c in enumerate(s):
            balance+=1 if c=='1' else -1
            if balance==0:parts.append('1'+self.makeLargestSpecial(s[start+1:i])+'0');start=i+1
        return ''.join(sorted(parts,reverse=True))
