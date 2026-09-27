class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int value : nums) {
            int index = Math.abs(value) - 1;
            nums[index] = -Math.abs(nums[index]);
        }

        List<Integer> missing = new ArrayList<>();
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] > 0) {
                missing.add(index + 1);
            }
        }
        return missing;
    }
}
