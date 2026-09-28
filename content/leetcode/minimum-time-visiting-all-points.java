class Solution {
    public int minTimeToVisitAllPoints(int[][] points) {
        int total = 0;
        for (int index = 1; index < points.length; index++) {
            int horizontal = Math.abs(points[index][0] - points[index - 1][0]);
            int vertical = Math.abs(points[index][1] - points[index - 1][1]);
            total += Math.max(horizontal, vertical);
        }
        return total;
    }
}
