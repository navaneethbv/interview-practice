class Solution {
    public int findMaxSumSubArray(int k, int[] arr) {
        int best = 0, window = 0;
        for (int i = 0; i < arr.length; i++) {
            window += arr[i];
            if (i >= k - 1) { best = Math.max(best, window); window -= arr[i - k + 1]; }
        }
        return best;
    }
}
