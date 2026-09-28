class _CoverTree:
    """Track the covered x-length for a compressed interval tree."""

    def __init__(self, coordinates):
        self.coordinates = coordinates
        self.interval_count = len(coordinates) - 1
        self.cover_count = [0] * (4 * self.interval_count)
        self.covered_length = [0] * (4 * self.interval_count)

    def update(self, node, left, right, start, end, delta):
        if start <= left and right <= end:
            self.cover_count[node] += delta
        else:
            middle = (left + right) // 2
            if start <= middle:
                self.update(node * 2, left, middle, start, end, delta)
            if end > middle:
                self.update(node * 2 + 1, middle + 1, right, start, end, delta)
        self._recalculate(node, left, right)

    def _recalculate(self, node, left, right):
        if self.cover_count[node] > 0:
            self.covered_length[node] = self.coordinates[right + 1] - self.coordinates[left]
        elif left == right:
            self.covered_length[node] = 0
        else:
            self.covered_length[node] = (
                self.covered_length[node * 2]
                + self.covered_length[node * 2 + 1]
            )


class Solution:
    def separateSquares(self, squares):
        coordinates = sorted(
            {coordinate for x, y, side in squares for coordinate in (x, x + side)}
        )
        coordinate_index = {coordinate: index for index, coordinate in enumerate(coordinates)}
        events = []
        for x, y, side in squares:
            left = coordinate_index[x]
            right = coordinate_index[x + side] - 1
            events.append((y, 1, left, right))
            events.append((y + side, -1, left, right))
        events.sort()

        strips, total_area = self._sweep(events, _CoverTree(coordinates))
        return self._find_halfway(strips, total_area, events[-1][0])

    def _sweep(self, events, cover_tree):
        """Collect y-strips while accumulating the union area."""
        previous_y = events[0][0]
        total_area = 0
        strips = []
        for y, delta, left, right in events:
            if y > previous_y:
                covered_width = cover_tree.covered_length[1]
                strips.append((previous_y, y, covered_width))
                total_area += (y - previous_y) * covered_width
                previous_y = y
            cover_tree.update(1, 0, cover_tree.interval_count - 1, left, right, delta)
        return strips, total_area

    def _find_halfway(self, strips, total_area, top_y):
        accumulated_area = 0
        for bottom_y, top, covered_width in strips:
            strip_area = (top - bottom_y) * covered_width
            if 2 * (accumulated_area + strip_area) >= total_area:
                if 2 * accumulated_area == total_area:
                    return float(bottom_y)
                numerator = total_area - 2 * accumulated_area
                return bottom_y + numerator / (2 * covered_width)
            accumulated_area += strip_area
        return float(top_y)
