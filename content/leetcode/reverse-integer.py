class Solution:
    def reverse(self, x):
        sign = -1 if x < 0 else 1
        digits = str(x).lstrip("-")[::-1].lstrip("0") or "0"
        limit = "2147483648" if sign < 0 else "2147483647"
        exceeds_limit = (
            len(digits) > len(limit)
            or len(digits) == len(limit) and digits > limit
        )
        if exceeds_limit:
            return 0
        return sign * int(digits)
