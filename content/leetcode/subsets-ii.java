class Solution {
    private void buildSubsets(
            int[] nums,
            int startIndex,
            List<Integer> path,
            List<List<Integer>> result) {
        result.add(new ArrayList<>(path));

        for (int index = startIndex; index < nums.length; index++) {
            if (index > startIndex && nums[index] == nums[index - 1]) {
                continue;
            }

            path.add(nums[index]);
            buildSubsets(nums, index + 1, path, result);
            path.remove(path.size() - 1);
        }
    }

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        buildSubsets(nums, 0, new ArrayList<>(), result);
        return result;
    }
}
