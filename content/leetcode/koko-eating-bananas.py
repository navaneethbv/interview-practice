class Solution:
    def minEatingSpeed(self, piles, h):
        left = 1
        right = max(piles)
        while left < right:
            speed = left + (right - left) // 2
            hours = sum((pile + speed - 1) // speed for pile in piles)
            if hours <= h:
                right = speed
            else:
                left = speed + 1
        return left
