class Solution {
    public int minimumCost(int[] nums) {
        int smallest = Integer.MAX_VALUE;
        int secondSmallest = Integer.MAX_VALUE;
        for (int index = 1; index < nums.length; index++) {
            int value = nums[index];
            if (value < smallest) {
                secondSmallest = smallest;
                smallest = value;
            } else if (value < secondSmallest) {
                secondSmallest = value;
            }
        }
        return nums[0] + smallest + secondSmallest;
    }
}
