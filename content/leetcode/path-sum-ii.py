class Solution:
    def pathSum(self, root, targetSum):
        out=[];stack=[(root,[],0)] if root else []
        while stack:
            node,path,total=stack.pop();path=path+[node.val];total+=node.val
            if not node.left and not node.right and total==targetSum:out.append(path)
            if node.left:stack.append((node.left,path,total))
            if node.right:stack.append((node.right,path,total))
        return out
