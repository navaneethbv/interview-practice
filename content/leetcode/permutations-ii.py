from collections import Counter
class Solution:
    def permuteUnique(self, nums):
        counts = Counter(nums)
        output = []
        def visit(path):
            if len(path) == len(nums):
                output.append(path[:])
                return
            for value in counts:
                if counts[value] == 0:
                    continue
                counts[value] -= 1
                path.append(value)
                visit(path)
                path.pop()
                counts[value] += 1
        visit([])
        return output
