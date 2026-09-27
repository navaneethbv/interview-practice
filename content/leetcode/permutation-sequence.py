import math
class Solution:
    def getPermutation(self, n, k):
        available=list(map(str,range(1,n+1)));out=[];k-=1
        while available:
            block=math.factorial(len(available)-1);index,k=divmod(k,block);out.append(available.pop(index))
        return ''.join(out)
