class Solution {
    public int[][] kClosest(int[][] points, int k) {
        int[][] ordered = points.clone();
        Arrays.sort(ordered, Comparator.comparingInt(this::squaredDistance));
        return Arrays.copyOf(ordered, k);
    }

    private int squaredDistance(int[] point) {
        return point[0] * point[0] + point[1] * point[1];
    }
}
