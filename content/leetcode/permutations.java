class Solution {
    private void buildPermutations(
            int[] nums,
            boolean[] used,
            List<Integer> path,
            List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int index = 0; index < nums.length; index++) {
            if (used[index]) {
                continue;
            }

            used[index] = true;
            path.add(nums[index]);
            buildPermutations(nums, used, path, result);
            path.remove(path.size() - 1);
            used[index] = false;
        }
    }

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        buildPermutations(nums, new boolean[nums.length], new ArrayList<>(), result);
        return result;
    }
}
