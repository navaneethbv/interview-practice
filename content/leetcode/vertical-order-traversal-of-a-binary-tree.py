class Solution:
    def verticalTraversal(self, root):
        nodes=[];stack=[(root,0,0)]
        while stack:
            n,r,c=stack.pop();nodes.append((c,r,n.val))
            if n.left:stack.append((n.left,r+1,c-1))
            if n.right:stack.append((n.right,r+1,c+1))
        out=[];previous=None
        for c,r,v in sorted(nodes):
            if c!=previous:out.append([]);previous=c
            out[-1].append(v)
        return out
