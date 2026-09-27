from collections import deque
class Solution:
    def openLock(self,deadends,target):
        seen=set(deadends)
        if '0000' in seen:return -1
        q=deque([('0000',0)]);seen.add('0000')
        while q:
            s,d=q.popleft()
            if s==target:return d
            for i in range(4):
                for delta in (-1,1):
                    t=s[:i]+str((int(s[i])+delta)%10)+s[i+1:]
                    if t not in seen:seen.add(t);q.append((t,d+1))
        return -1
