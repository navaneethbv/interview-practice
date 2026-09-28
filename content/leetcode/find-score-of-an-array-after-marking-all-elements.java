class Solution {
    public long findScore(int[] nums) {
        Integer[] indices = new Integer[nums.length];
        for (int index = 0; index < nums.length; index++) {
            indices[index] = index;
        }
        Arrays.sort(indices, (first, second) -> nums[first] == nums[second]
                ? Integer.compare(first, second)
                : Integer.compare(nums[first], nums[second]));

        boolean[] marked = new boolean[nums.length];
        long score = 0;
        for (int index : indices) {
            if (marked[index]) {
                continue;
            }
            score += nums[index];
            marked[index] = true;
            if (index > 0) {
                marked[index - 1] = true;
            }
            if (index + 1 < nums.length) {
                marked[index + 1] = true;
            }
        }
        return score;
    }
}
