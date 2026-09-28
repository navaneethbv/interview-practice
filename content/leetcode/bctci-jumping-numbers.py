class Solution:
    def jumpingNumbers(self, n):
        found = []

        def grow(number):
            if number >= n:
                return
            found.append(number)
            last = number % 10
            for digit in (last - 1, last + 1):
                if 0 <= digit <= 9:
                    grow(number * 10 + digit)

        for first in range(1, 10):
            grow(first)
        return sorted(found)
