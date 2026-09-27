class Solution:
    def generateTrees(self, n):
        def build(lo,hi):
            if lo>hi: return [None]
            trees=[]
            for value in range(lo,hi+1):
                for left in build(lo,value-1):
                    for right in build(value+1,hi):
                        trees.append(TreeNode(value,left,right))
            return trees
        return build(1,n)
