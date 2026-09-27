from collections import Counter
class Solution:
    def pathSum(self, root, targetSum):
        prefixes=Counter({0:1});answer=0;stack=[(root,0,False)] if root else []
        while stack:
            node,total,leaving=stack.pop()
            if leaving:prefixes[total]-=1;continue
            total+=node.val;answer+=prefixes[total-targetSum];prefixes[total]+=1
            stack.append((node,total,True))
            if node.right:stack.append((node.right,total,False))
            if node.left:stack.append((node.left,total,False))
        return answer
