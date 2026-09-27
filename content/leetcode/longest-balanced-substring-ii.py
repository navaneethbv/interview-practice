class Solution:
 def longestBalanced(self,s):
  pairs=[self._two_letters(s,a,b) for a,b in [('a','b'),('a','c'),('b','c')]]
  return max(self._longest_run(s),self._three_letters(s),*pairs)

 def _longest_run(self,s):
  ans=0;run=0;previous=''
  for c in s:
   run=run+1 if c==previous else 1;previous=c;ans=max(ans,run)
  return ans

 def _two_letters(self,s,a,b):
  """Longest stretch of only a and b with equal counts; any other letter resets it."""
  ans=0;first={0:-1};diff=0
  for i,c in enumerate(s):
   if c not in (a,b):first={0:i};diff=0;continue
   diff+=1 if c==a else -1
   if diff in first:ans=max(ans,i-first[diff])
   else:first[diff]=i
  return ans

 def _three_letters(self,s):
  ans=0;count=[0,0,0];first={(0,0):-1}
  for i,c in enumerate(s):
   count[ord(c)-97]+=1;key=(count[0]-count[1],count[0]-count[2])
   if key in first:ans=max(ans,i-first[key])
   else:first[key]=i
  return ans
