class Solution:
    def minimumTime(self, d, r):
        import math

        total_deliveries = sum(d)
        least_common_multiple = r[0] * r[1] // math.gcd(r[0], r[1])
        left = 0
        right = 2 * total_deliveries
        while left < right:
            middle = (left + right) // 2
            first_available = middle - middle // r[0]
            second_available = middle - middle // r[1]
            shared_available = middle - middle // least_common_multiple
            feasible = (
                first_available >= d[0]
                and second_available >= d[1]
                and shared_available >= total_deliveries
            )
            if feasible:
                right = middle
            else:
                left = middle + 1
        return left
