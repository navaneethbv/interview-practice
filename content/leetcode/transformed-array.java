class Solution {
    public int[] constructTransformedArray(int[] nums) {
        int size = nums.length;
        int[] result = new int[size];
        for (int index = 0; index < size; index++) {
            result[index] = nums[Math.floorMod(index + nums[index], size)];
        }
        return result;
    }
}
