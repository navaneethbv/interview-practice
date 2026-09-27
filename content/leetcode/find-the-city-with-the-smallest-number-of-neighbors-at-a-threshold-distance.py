class Solution:
    def findTheCity(self, n, edges, distanceThreshold):
        distances = [[float("inf")] * n for _ in range(n)]
        for city in range(n):
            distances[city][city] = 0
        for first, second, weight in edges:
            distances[first][second] = weight
            distances[second][first] = weight

        for middle in range(n):
            for first in range(n):
                for second in range(n):
                    distances[first][second] = min(
                        distances[first][second],
                        distances[first][middle] + distances[middle][second],
                    )

        fewest_neighbors = n
        answer = -1
        for city in range(n):
            reachable = sum(
                other != city and distances[city][other] <= distanceThreshold
                for other in range(n)
            )
            if reachable <= fewest_neighbors:
                fewest_neighbors = reachable
                answer = city
        return answer
