class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int[] best = new int[arr.length + 1];
        for (int end = 1; end <= arr.length; end++) {
            int maximum = 0;
            for (int size = 1; size <= k && size <= end; size++) {
                maximum = Math.max(maximum, arr[end - size]);
                best[end] = Math.max(best[end], best[end - size] + maximum * size);
            }
        }
        return best[arr.length];
    }
}
