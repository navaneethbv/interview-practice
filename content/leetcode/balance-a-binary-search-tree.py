class Solution:
 def balanceBST(self,root):
  values=[];stack=[];node=root
  while node or stack:
   while node:stack.append(node);node=node.left
   node=stack.pop();values.append(node.val);node=node.right
  def build(lo,hi):
   if lo>=hi:return None
   mid=(lo+hi)//2;n=TreeNode(values[mid]);n.left=build(lo,mid);n.right=build(mid+1,hi);return n
  return build(0,len(values))
