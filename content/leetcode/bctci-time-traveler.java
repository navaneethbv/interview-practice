class Solution {
    public boolean canReachFinal(int[] points, int k, int maxAging) {
        long[] gaps = new long[points.length - 1];
        for (int i = 1; i < points.length; i++) {
            gaps[i - 1] = (long) points[i] - points[i - 1];
        }
        Arrays.sort(gaps);
        long aging = 0;
        for (int i = 0; i < gaps.length - k; i++) {
            aging += gaps[i];
        }
        return aging <= maxAging;
    }
}
