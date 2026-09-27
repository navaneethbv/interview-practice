class Solution:
    def buildTree(self,preorder,inorder):
        root=TreeNode(preorder[0])
        stack=[root]
        i=0
        for val in preorder[1:]:
            node=TreeNode(val)
            if stack[-1].val!=inorder[i]: stack[-1].left=node
            else:
                while stack and stack[-1].val==inorder[i]:
                    parent=stack.pop()
                    i+=1
                parent.right=node
            stack.append(node)
        return root
