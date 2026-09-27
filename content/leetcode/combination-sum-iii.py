class Solution:
    def combinationSum3(self, k, n):
        out=[]
        def visit(start,path,total):
            if len(path)==k:
                if total==n:out.append(path)
                return
            for value in range(start,10):
                if total+value>n:break
                visit(value+1,path+[value],total+value)
        visit(1,[],0);return out
