class Solution {
    public String findDifferentBinaryString(String[] nums) {
        StringBuilder result = new StringBuilder();
        for (int index = 0; index < nums.length; index++) {
            result.append(nums[index].charAt(index) == '0' ? '1' : '0');
        }
        return result.toString();
    }
}
