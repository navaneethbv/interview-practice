class Solution:
    def constructFromPrePost(self,preorder,postorder):
        root=TreeNode(preorder[0]);stack=[root];i=0
        for value in preorder[1:]:
            while stack[-1].val==postorder[i]:stack.pop();i+=1
            node=TreeNode(value)
            if stack[-1].left is None:stack[-1].left=node
            else:stack[-1].right=node
            stack.append(node)
        return root
