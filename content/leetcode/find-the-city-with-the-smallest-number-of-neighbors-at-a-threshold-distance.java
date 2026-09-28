class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        int[][] distances = new int[n][n];
        for (int city = 0; city < n; city++) {
            Arrays.fill(distances[city], 100000000);
            distances[city][city] = 0;
        }
        for (int[] edge : edges) {
            distances[edge[0]][edge[1]] = edge[2];
            distances[edge[1]][edge[0]] = edge[2];
        }

        relaxThroughEachCity(distances, n);

        int fewestNeighbors = n;
        int answer = -1;
        for (int city = 0; city < n; city++) {
            int reachable = 0;
            for (int other = 0; other < n; other++) {
                if (city != other && distances[city][other] <= distanceThreshold) {
                    reachable++;
                }
            }
            if (reachable <= fewestNeighbors) {
                fewestNeighbors = reachable;
                answer = city;
            }
        }
        return answer;
    }

    private void relaxThroughEachCity(int[][] distances, int n) {
        for (int middle = 0; middle < n; middle++) {
            relaxThroughMiddle(distances, middle, n);
        }
    }

    private void relaxThroughMiddle(int[][] distances, int middle, int n) {
        for (int from = 0; from < n; from++) {
            for (int to = 0; to < n; to++) {
                distances[from][to] = Math.min(
                        distances[from][to],
                        distances[from][middle] + distances[middle][to]);
            }
        }
    }
}
