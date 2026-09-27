class Solution:
    def getMinimumDifference(self, root):
        previous=None;best=float('inf');stack=[]
        while root or stack:
            while root:stack.append(root);root=root.left
            root=stack.pop()
            if previous is not None:best=min(best,root.val-previous)
            previous=root.val;root=root.right
        return best
