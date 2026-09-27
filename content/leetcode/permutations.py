class Solution:
    def permute(self, nums):
        result = []

        def visit(path, remaining):
            if not remaining:
                result.append(path)
                return

            for index, value in enumerate(remaining):
                next_remaining = remaining[:index] + remaining[index + 1:]
                visit(path + [value], next_remaining)

        visit([], nums)
        return result
