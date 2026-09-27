class Solution {
    public int minCostConnectPoints(int[][] points) {
        int pointCount = points.length;
        int[] bestEdge = new int[pointCount];
        Arrays.fill(bestEdge, Integer.MAX_VALUE);
        bestEdge[0] = 0;

        boolean[] connected = new boolean[pointCount];
        int totalCost = 0;
        for (int count = 0; count < pointCount; count++) {
            int nextPoint = findCheapestPoint(bestEdge, connected);
            connected[nextPoint] = true;
            totalCost += bestEdge[nextPoint];

            updateEdges(points, nextPoint, bestEdge, connected);
        }
        return totalCost;
    }

    private int findCheapestPoint(int[] bestEdge, boolean[] connected) {
        int cheapestPoint = -1;
        for (int point = 0; point < bestEdge.length; point++) {
            if (!connected[point]
                    && (cheapestPoint == -1
                    || bestEdge[point] < bestEdge[cheapestPoint])) {
                cheapestPoint = point;
            }
        }
        return cheapestPoint;
    }

    private void updateEdges(
            int[][] points,
            int connectedPoint,
            int[] bestEdge,
            boolean[] connected) {
        for (int point = 0; point < points.length; point++) {
            if (connected[point]) {
                continue;
            }
            int distance = Math.abs(points[connectedPoint][0] - points[point][0])
                    + Math.abs(points[connectedPoint][1] - points[point][1]);
            bestEdge[point] = Math.min(bestEdge[point], distance);
        }
    }
}
