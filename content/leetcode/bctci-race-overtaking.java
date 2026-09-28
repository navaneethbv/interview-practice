class Solution {
    public int overtakeIndex(int[] p1, int[] p2) {
        int low = 0;
        int high = p1.length - 1;
        while (high - low > 1) {
            int mid = (low + high) >>> 1;
            if (p1[mid] > p2[mid]) {
                low = mid;
            } else {
                high = mid;
            }
        }
        return high;
    }
}
