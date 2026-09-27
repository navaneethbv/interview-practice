class Solution:
    def longestConsecutive(self, root):
        if not root: return 0
        stack=[(root,False)]; lengths={}; best=0
        while stack:
            node,visited=stack.pop()
            if not visited:
                stack.append((node,True))
                if node.left: stack.append((node.left,False))
                if node.right: stack.append((node.right,False))
                continue
            increasing=decreasing=1
            for child in (node.left,node.right):
                if not child: continue
                inc,dec=lengths[child]
                if child.val==node.val+1: increasing=max(increasing,inc+1)
                if child.val==node.val-1: decreasing=max(decreasing,dec+1)
            lengths[node]=(increasing,decreasing); best=max(best,increasing+decreasing-1)
        return best
