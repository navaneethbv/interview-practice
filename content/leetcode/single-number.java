class Solution {
    public int singleNumber(int[] nums) {
        int uniqueValue = 0;
        for (int value : nums) {
            uniqueValue ^= value;
        }
        return uniqueValue;
    }
}
