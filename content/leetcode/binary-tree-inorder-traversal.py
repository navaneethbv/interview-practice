class Solution:
    def inorderTraversal(self, root):
        out=[];stack=[]
        while root or stack:
            while root:stack.append(root);root=root.left
            root=stack.pop();out.append(root.val);root=root.right
        return out
