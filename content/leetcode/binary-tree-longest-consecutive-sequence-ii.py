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
            lengths[node]=self._runs(node,lengths)
            best=max(best,sum(lengths[node])-1)
        return best

    def _runs(self, node, lengths):
        """Longest increasing and decreasing downward runs starting at node."""
        increasing=decreasing=1
        for child in (node.left,node.right):
            if not child: continue
            inc,dec=lengths[child]
            if child.val==node.val+1: increasing=max(increasing,inc+1)
            if child.val==node.val-1: decreasing=max(decreasing,dec+1)
        return increasing,decreasing
