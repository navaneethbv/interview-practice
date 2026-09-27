class Solution:
    def backspaceCompare(self, s, t):
        def typed(text):
            out=[]
            for c in text:
                if c=='#':
                    if out:out.pop()
                else:out.append(c)
            return out
        return typed(s)==typed(t)
