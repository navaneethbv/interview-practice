from collections import Counter
class Solution:
    def numFriendRequests(self, ages):
        counts=Counter(ages);out=0
        for a,na in counts.items():
            for b,nb in counts.items():
                if b>a/2+7 and b<=a and not(b>100 and a<100):out+=na*(nb-(a==b))
        return out
