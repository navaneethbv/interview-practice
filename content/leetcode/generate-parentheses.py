class Solution:
    def generateParenthesis(self, n):
        result = []
        path = []

        def build(opened, closed):
            if closed == n:
                result.append("".join(path))
                return
            if opened < n:
                path.append("(")
                build(opened + 1, closed)
                path.pop()
            if closed < opened:
                path.append(")")
                build(opened, closed + 1)
                path.pop()

        build(0, 0)
        return result
