class Solution {
    public long maxLaminalSum(int[] arr) {
        return solve(arr, 0, arr.length)[1];
    }

    private long[] solve(int[] arr, int start, int end) {
        if (end - start == 1) {
            return new long[] {arr[start], arr[start]};
        }
        int mid = (start + end) >>> 1;
        long[] left = solve(arr, start, mid);
        long[] right = solve(arr, mid, end);
        long total = left[0] + right[0];
        return new long[] {total, Math.max(total, Math.max(left[1], right[1]))};
    }
}
