class Solution:
    def shortestOver20(self, sales):
        left = total = 0
        best = len(sales) + 1
        for right, value in enumerate(sales):
            total += value
            while total > 20:
                best = min(best, right - left + 1)
                total -= sales[left]
                left += 1
        return best if best <= len(sales) else -1
