from collections import Counter
class Solution:
 def lexGreaterPermutation(self,s,target):
  count=Counter(s);prefix=[];n=len(s);i=0
  while i<n and count[target[i]]:count[target[i]]-=1;prefix.append(target[i]);i+=1
  if i==n:i-=1;count[prefix.pop()]+=1
  while i>=0:
   for c in 'abcdefghijklmnopqrstuvwxyz':
    if c>target[i] and count[c]:
     count[c]-=1;return ''.join(prefix)+c+''.join(x*count[x] for x in sorted(count))
   if i==0:break
   i-=1;count[prefix.pop()]+=1
  return ''
