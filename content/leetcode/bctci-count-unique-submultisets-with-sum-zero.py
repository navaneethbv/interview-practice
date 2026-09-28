from collections import Counter


class Solution:
    def countZeroSubmultisets(self, S):
        groups = list(Counter(S).items())

        def count(index, total):
            if index == len(groups):
                return 1 if total == 0 else 0
            value, copies = groups[index]
            return sum(count(index + 1, total + taken * value) for taken in range(copies + 1))

        return count(0, 0)
