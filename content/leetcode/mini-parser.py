class Solution:
 def deserialize(self,s):
  if s[0]!='[':return NestedInteger(int(s))
  stack=[];i=0
  while i<len(s):
   c=s[i]
   if c=='[':
    node=NestedInteger()
    if stack:stack[-1].add(node)
    stack.append(node);i+=1
   elif c==']':
    node=stack.pop();i+=1
    if not stack:return node
   elif c==',':i+=1
   else:
    value,i=self._number(s,i);stack[-1].add(NestedInteger(value))

 @staticmethod
 def _number(s,i):
  """Reads an optionally negative integer starting at i; returns it and the index after it."""
  j=i+1
  while j<len(s) and s[j].isdigit():j+=1
  return int(s[i:j]),j
