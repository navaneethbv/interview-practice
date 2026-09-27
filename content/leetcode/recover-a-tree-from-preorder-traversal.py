class Solution:
    def recoverFromPreorder(self, traversal):
        stack=[];i=0
        while i<len(traversal):
            depth=0
            while i<len(traversal) and traversal[i]=='-':depth+=1;i+=1
            value=0
            while i<len(traversal) and traversal[i].isdigit():value=value*10+int(traversal[i]);i+=1
            node=TreeNode(value)
            while len(stack)>depth:stack.pop()
            if stack:
                if stack[-1].left is None:stack[-1].left=node
                else:stack[-1].right=node
            stack.append(node)
        return stack[0]
