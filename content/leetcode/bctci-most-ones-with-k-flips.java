class Solution {
    public int solve(int[] arr, int k) {
        int left = 0;
        int zeros = 0;
        int best = 0;
        for (int right = 0; right < arr.length; right++) {
            if (arr[right] == 0) {
                zeros++;
            }
            while (zeros > k) {
                if (arr[left] == 0) {
                    zeros--;
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
