class Solution:
    def generateParenthesis(self, n):
        result = []
        def build(prefix,opened,closed):
            if closed == n:
                result.append(prefix); return
            if opened < n: build(prefix+'(',opened+1,closed)
            if closed < opened: build(prefix+')',opened,closed+1)
        build('',0,0)
        return result
