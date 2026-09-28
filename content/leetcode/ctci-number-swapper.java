class Solution {
    public int[] swapNumbers(int a, int b) {
        a ^= b;
        b ^= a;
        a ^= b;
        return new int[] {a, b};
    }
}
