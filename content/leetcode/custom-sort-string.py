from collections import Counter
class Solution:
    def customSortString(self, order, s):
        count=Counter(s);out=''
        for c in order:out+=c*count.pop(c,0)
        return out+''.join(c*n for c,n in count.items())
