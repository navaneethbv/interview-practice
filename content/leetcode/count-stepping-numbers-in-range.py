from functools import lru_cache

MOD = 1_000_000_007
NO_DIGIT = 10


class Solution:
    def countSteppingNumbers(self, low, high):
        return (self._count(high) - self._count(str(int(low) - 1))) % MOD

    def _count(self, bound):
        @lru_cache(None)
        def visit(index, previous, tight):
            if index == len(bound):
                return int(previous != NO_DIGIT)
            limit = int(bound[index]) if tight else 9
            total = 0
            for digit in range(limit + 1):
                next_previous = self._next_previous(previous, digit)
                if next_previous is None:
                    continue
                total += visit(index + 1, next_previous, tight and digit == limit)
            return total % MOD

        return visit(0, NO_DIGIT, True)

    @staticmethod
    def _next_previous(previous, digit):
        if previous == NO_DIGIT:
            return NO_DIGIT if digit == 0 else digit
        if abs(previous - digit) != 1:
            return None
        return digit
