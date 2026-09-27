class Solution:
    def fallingSquares(self, positions):
        placed_squares = []
        highest = 0
        result = []
        for left, side in positions:
            right = left + side
            base_height = 0
            for previous_left, previous_right, previous_height in placed_squares:
                overlaps = max(left, previous_left) < min(right, previous_right)
                if overlaps:
                    base_height = max(base_height, previous_height)
            height = base_height + side
            placed_squares.append((left, right, height))
            highest = max(highest, height)
            result.append(highest)
        return result
