class Solution:
    def numberOf2sInRange(self, n):
        total = 0
        power = 1
        while power <= n:
            higher, current, lower = n // (power * 10), (n // power) % 10, n % power
            if current < 2:
                total += higher * power
            elif current == 2:
                total += higher * power + lower + 1
            else:
                total += (higher + 1) * power
            power *= 10
        return total
