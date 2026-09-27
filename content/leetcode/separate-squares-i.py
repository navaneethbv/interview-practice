class Solution:
    def separateSquares(self, squares):
        total_area = sum(side * side for _, _, side in squares)
        target = total_area / 2
        left = min(y for _, y, _ in squares)
        right = max(y + side for _, y, side in squares)
        for _ in range(90):
            middle = (left + right) / 2
            below = sum(
                side * max(0, min(side, middle - y))
                for _, y, side in squares
            )
            if below >= target:
                right = middle
            else:
                left = middle
        return right
