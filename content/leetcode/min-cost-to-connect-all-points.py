class Solution:
    def minCostConnectPoints(self, points):
        point_count = len(points)
        best_edge = [float('inf')] * point_count
        connected = [False] * point_count
        best_edge[0] = 0
        total_cost = 0

        for _ in range(point_count):
            next_point = min(
                (
                    index
                    for index in range(point_count)
                    if not connected[index]
                ),
                key=lambda index: best_edge[index],
            )
            connected[next_point] = True
            total_cost += best_edge[next_point]
            row, column = points[next_point]

            for index, (other_row, other_column) in enumerate(points):
                if not connected[index]:
                    distance = abs(row - other_row) + abs(column - other_column)
                    best_edge[index] = min(best_edge[index], distance)

        return total_cost
