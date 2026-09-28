class Solution {
    public double assignCenters(int[][] points, int[] center1, int[] center2) {
        double[][] costs = new double[points.length][];
        for (int i = 0; i < points.length; i++) {
            costs[i] = new double[] {distance(points[i], center1), distance(points[i], center2)};
        }
        Arrays.sort(costs, Comparator.comparingDouble(pair -> pair[0] - pair[1]));
        double total = 0;
        for (int i = 0; i < costs.length; i++) {
            total += i < costs.length / 2 ? costs[i][0] : costs[i][1];
        }
        return total;
    }

    private double distance(int[] a, int[] b) {
        return Math.hypot(a[0] - b[0], a[1] - b[1]);
    }
}
