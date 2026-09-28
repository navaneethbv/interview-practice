class Solution {
    public int findNumbers(int[] nums) {
        int count = 0;
        for (int value : nums) {
            if (Integer.toString(value).length() % 2 == 0) {
                count++;
            }
        }
        return count;
    }
}
