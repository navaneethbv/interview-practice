class Solution {
    public int missingNumber(int[] nums) {
        int answer = nums.length;
        for (int index = 0; index < nums.length; index++) {
            answer ^= index ^ nums[index];
        }
        return answer;
    }
}
