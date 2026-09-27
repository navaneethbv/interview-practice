class Solution:
    def longestConsecutive(self, root):
        best=0; stack=[(root,1)] if root else []
        while stack:
            node,length=stack.pop(); best=max(best,length)
            for child in (node.left,node.right):
                if child: stack.append((child,length+1 if child.val==node.val+1 else 1))
        return best
