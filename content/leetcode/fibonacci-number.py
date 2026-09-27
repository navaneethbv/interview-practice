class Solution:
    def fib(self, n):
        previous = 0
        current = 1

        for _ in range(n):
            previous, current = current, previous + current

        return previous
