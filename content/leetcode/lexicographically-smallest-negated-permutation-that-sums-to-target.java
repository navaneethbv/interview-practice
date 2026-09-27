class Solution {
    public int[] lexSmallestNegatedPerm(int n, long target) {
        long total = (long) n * (n + 1) / 2;
        if (Math.abs(target) > total || (total - target) % 2 != 0) {
            return new int[0];
        }
        long remaining = (total - target) / 2;
        int[] result = new int[n];
        int left = 0;
        int right = n - 1;
        for (int value = n; value >= 1; value--) {
            if (value <= remaining) {
                result[left] = -value;
                left++;
                remaining -= value;
            } else {
                result[right] = value;
                right--;
            }
        }
        return result;
    }
}
