class Solution:
    def diameterOfBinaryTree(self, root):
        stack = [(root,False)]; height = {None:0}; best = 0
        while stack:
            node,ready = stack.pop()
            if node is None: continue
            if not ready:
                stack.extend([(node,True),(node.left,False),(node.right,False)])
            else:
                best = max(best,height[node.left]+height[node.right])
                height[node] = 1+max(height[node.left],height[node.right])
        return best
