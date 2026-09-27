import heapq


class Solution:
    def getSkyline(self, buildings):
        events = sorted(
            [(left, right, height) for left, right, height in buildings]
        )
        positions = sorted({point for left, right, _ in events for point in (left, right)})
        active_heights = [(0, float("inf"))]
        skyline = []
        building_index = 0

        for position in positions:
            while (building_index < len(events)
                   and events[building_index][0] <= position):
                _, right, height = events[building_index]
                heapq.heappush(active_heights, (-height, right))
                building_index += 1

            while active_heights[0][1] <= position:
                heapq.heappop(active_heights)

            current_height = -active_heights[0][0]
            if not skyline or skyline[-1][1] != current_height:
                skyline.append([position, current_height])

        return skyline
