class Solution:
    def isRectangleCover(self, rectangles):
        corner_parity = set()
        covered_area = 0
        min_x = min_y = float("inf")
        max_x = max_y = float("-inf")
        for left, bottom, right, top in rectangles:
            covered_area += (right - left) * (top - bottom)
            min_x = min(min_x, left)
            min_y = min(min_y, bottom)
            max_x = max(max_x, right)
            max_y = max(max_y, top)
            for corner in ((left, bottom), (left, top), (right, bottom), (right, top)):
                if corner in corner_parity:
                    corner_parity.remove(corner)
                else:
                    corner_parity.add(corner)
        outer_area = (max_x - min_x) * (max_y - min_y)
        outer_corners = {
            (min_x, min_y), (min_x, max_y),
            (max_x, min_y), (max_x, max_y),
        }
        return covered_area == outer_area and corner_parity == outer_corners
