class Solution:
    def binaryTreePaths(self, root):
        out=[];stack=[(root,str(root.val))]
        while stack:
            node,path=stack.pop()
            if not node.left and not node.right:out.append(path)
            for child in (node.left,node.right):
                if child:stack.append((child,path+'->'+str(child.val)))
        return out
