class Solution:
    def sumNumbers(self, root):
        stack=[(root,0)]; total=0
        while stack:
            node,value=stack.pop(); value=value*10+node.val
            if not node.left and not node.right: total+=value
            if node.left: stack.append((node.left,value))
            if node.right: stack.append((node.right,value))
        return total
