class Solution {
    public int shortestOver20(int[] sales) {
        int left = 0;
        int total = 0;
        int best = sales.length + 1;
        for (int right = 0; right < sales.length; right++) {
            total += sales[right];
            while (total > 20) {
                best = Math.min(best, right - left + 1);
                total -= sales[left++];
            }
        }
        return best <= sales.length ? best : -1;
    }
}
