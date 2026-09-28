class Solution {
    public int getMax(int a, int b) {
        long difference = (long) a - b;
        int bIsLarger = (int) ((difference >>> 63) & 1);
        int aIsLarger = 1 ^ bIsLarger;
        return a * aIsLarger + b * bIsLarger;
    }
}
