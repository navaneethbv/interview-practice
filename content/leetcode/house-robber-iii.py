class Solution:
    def rob(self, root):
        results={None:(0,0)};stack=[(root,False)]
        while stack:
            node,done=stack.pop()
            if done:
                a,b=results[node.left],results[node.right]
                results[node]=(node.val+a[1]+b[1],max(a)+max(b))
            else:
                stack.append((node,True))
                if node.left:stack.append((node.left,False))
                if node.right:stack.append((node.right,False))
        return max(results[root])
