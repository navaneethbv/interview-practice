class Solution:
    def permute(self, nums):
        result = []
        def visit(path, remaining):
            if not remaining:
                result.append(path)
            for i, value in enumerate(remaining):
                visit(path+[value], remaining[:i]+remaining[i+1:])
        visit([], nums)
        return result
