class Solution:
    def separateSquares(self, squares):
        events = []
        total_area = 0
        for _, bottom, side in squares:
            total_area += side * side
            events.append((bottom, side))
            events.append((bottom + side, -side))
        events.sort()

        area_below = 0
        active_width = 0
        current_y = events[0][0]
        event_index = 0
        while event_index < len(events):
            next_y = events[event_index][0]
            if next_y > current_y and active_width:
                candidate_area = area_below + active_width * (next_y - current_y)
                if 2 * candidate_area >= total_area:
                    remaining_twice = total_area - 2 * area_below
                    return float(current_y) + remaining_twice / (2 * active_width)
                area_below = candidate_area
            current_y = next_y
            while event_index < len(events) and events[event_index][0] == current_y:
                active_width += events[event_index][1]
                event_index += 1
        return float(current_y)
