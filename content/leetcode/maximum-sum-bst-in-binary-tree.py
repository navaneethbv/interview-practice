class Solution:
    def maxSumBST(self, root):
        info={None:(True,float('inf'),float('-inf'),0)}; stack=[(root,False)]; best=0
        while stack:
            node,ready=stack.pop()
            if node is None: continue
            if not ready: stack.extend([(node,True),(node.left,False),(node.right,False)]); continue
            left,right=info[node.left],info[node.right]
            valid=left[0] and right[0] and left[2]<node.val<right[1]
            total=node.val+left[3]+right[3]
            info[node]=(valid,min(node.val,left[1]),max(node.val,right[2]),total)
            if valid: best=max(best,total)
        return best
