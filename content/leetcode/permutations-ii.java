class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> output = new ArrayList<>();
        buildPermutations(nums, new boolean[nums.length], new ArrayList<>(), output);
        return output;
    }

    private void buildPermutations(int[] nums, boolean[] used, List<Integer> path,
            List<List<Integer>> output) {
        if (path.size() == nums.length) {
            output.add(new ArrayList<>(path));
            return;
        }
        for (int index = 0; index < nums.length; index++) {
            if (used[index] || (index > 0 && nums[index] == nums[index - 1] && !used[index - 1])) {
                continue;
            }
            used[index] = true;
            path.add(nums[index]);
            buildPermutations(nums, used, path, output);
            path.remove(path.size() - 1);
            used[index] = false;
        }
    }
}
