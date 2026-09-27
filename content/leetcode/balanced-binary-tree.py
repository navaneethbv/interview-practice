class Solution:
    def isBalanced(self, root):
        stack = [(root,False)]; height = {None:0}
        while stack:
            node,ready = stack.pop()
            if node is None: continue
            if not ready: stack.extend([(node,True),(node.left,False),(node.right,False)])
            else:
                left,right = height[node.left],height[node.right]
                if abs(left-right) > 1: return False
                height[node] = max(left,right)+1
        return True
