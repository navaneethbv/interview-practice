from itertools import product
class Solution:
    def expand(self,s):
        groups=[];i=0
        while i<len(s):
            if s[i]=='{':j=s.index('}',i);groups.append(s[i+1:j].split(','));i=j+1
            else:groups.append([s[i]]);i+=1
        return sorted(''.join(parts) for parts in product(*groups))
