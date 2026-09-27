class Solution:
    def findMode(self, root):
        stack=[];previous=None;run=best=0;out=[]
        while root or stack:
            while root:stack.append(root);root=root.left
            root=stack.pop();run=run+1 if root.val==previous else 1;previous=root.val
            if run>best:best=run;out=[root.val]
            elif run==best:out.append(root.val)
            root=root.right
        return out
