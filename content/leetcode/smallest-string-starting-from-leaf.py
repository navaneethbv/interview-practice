class Solution:
 def smallestFromLeaf(self, root):
  best=None
  def visit(node,path):
   nonlocal best
   if not node:return
   path=chr(97+node.val)+path
   if not node.left and not node.right:
    if best is None or path<best:best=path
   visit(node.left,path);visit(node.right,path)
  visit(root,'');return best
