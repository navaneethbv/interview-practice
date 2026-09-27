class Solution:
    def removeKdigits(self, num, k):
        monotonic_digits = []

        for digit in num:
            while (k and monotonic_digits
                   and monotonic_digits[-1] > digit):
                monotonic_digits.pop()
                k -= 1
            monotonic_digits.append(digit)

        if k:
            monotonic_digits = monotonic_digits[:-k]

        return "".join(monotonic_digits).lstrip("0") or "0"
