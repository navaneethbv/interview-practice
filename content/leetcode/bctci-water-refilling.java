class Solution {
    public int pourCount(int a, int b) {
        long low = 1;
        long high = a;
        while (low < high) {
            long mid = (low + high + 1) >> 1;
            if (mid * b <= a) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        return (int) low;
    }
}
