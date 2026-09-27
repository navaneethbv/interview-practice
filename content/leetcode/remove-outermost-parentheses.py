class Solution:
    def removeOuterParentheses(self, s):
        depth=0; result=[]
        for c in s:
            if c==')': depth-=1
            if depth: result.append(c)
            if c=='(': depth+=1
        return ''.join(result)
