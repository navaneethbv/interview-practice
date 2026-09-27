class Solution {
    public int[] findErrorNums(int[] nums) {
        int[] counts = new int[nums.length + 1];
        for (int value : nums) {
            counts[value]++;
        }
        int duplicate = 0;
        int missing = 0;
        for (int value = 1; value < counts.length; value++) {
            if (counts[value] == 2) {
                duplicate = value;
            }
            if (counts[value] == 0) {
                missing = value;
            }
        }
        return new int[] {duplicate, missing};
    }
}
