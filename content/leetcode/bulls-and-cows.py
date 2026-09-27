from collections import Counter
class Solution:
    def getHint(self, secret, guess):
        bulls=sum(a==b for a,b in zip(secret,guess));matches=sum((Counter(secret)&Counter(guess)).values())
        return str(bulls)+'A'+str(matches-bulls)+'B'
