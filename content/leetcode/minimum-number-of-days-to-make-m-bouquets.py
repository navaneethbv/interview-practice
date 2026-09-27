class Solution:
    def minDays(self, bloomDay, m, k):
        if m * k > len(bloomDay):
            return -1
        low = min(bloomDay)
        high = max(bloomDay)
        while low<high:
            day = (low + high) // 2
            consecutive = 0
            bouquets = 0
            for value in bloomDay:
                consecutive = consecutive + 1 if value <= day else 0
                if consecutive == k:
                    bouquets += 1
                    consecutive = 0
            if bouquets >= m:
                high = day
            else:
                low = day + 1
        return low
