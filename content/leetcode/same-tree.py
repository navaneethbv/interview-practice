class Solution:
    def isSameTree(self,p,q):
        stack=[(p,q)]
        while stack:
            a,b=stack.pop()
            if not a or not b:
                if a is not b: return False
                continue
            if a.val!=b.val: return False
            stack.extend([(a.left,b.left),(a.right,b.right)])
        return True
