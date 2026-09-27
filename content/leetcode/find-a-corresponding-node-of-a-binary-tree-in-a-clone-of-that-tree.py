class Solution:
    def getTargetCopy(self, original, cloned, target):
        stack=[(original,cloned)]
        while stack:
            a,b=stack.pop()
            if a is target: return b
            if a.left: stack.append((a.left,b.left))
            if a.right: stack.append((a.right,b.right))
