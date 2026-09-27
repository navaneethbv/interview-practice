class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int ending = 0;
        int total = 0;
        for (int index = 2; index < nums.length; index++) {
            boolean sameDifference = nums[index] - nums[index - 1]
                == nums[index - 1] - nums[index - 2];
            ending = sameDifference ? ending + 1 : 0;
            total += ending;
        }
        return total;
    }
}
