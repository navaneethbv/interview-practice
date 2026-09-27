class Solution:
    def combine(self, n, k):
        result=[]; path=[]
        def visit(start):
            if len(path)==k: result.append(path.copy()); return
            for value in range(start,n-(k-len(path))+2):
                path.append(value); visit(value+1); path.pop()
        visit(1)
        return result
