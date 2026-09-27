class Solution:
 def minCameraCover(self,root):
  cameras=0
  def visit(n):
   nonlocal cameras
   if not n:return 1
   a,b=visit(n.left),visit(n.right)
   if a==0 or b==0:cameras+=1;return 2
   return 1 if a==2 or b==2 else 0
  return cameras+1 if visit(root)==0 else cameras
