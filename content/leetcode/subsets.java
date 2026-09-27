class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        result.add(new ArrayList<>());

        for (int value : nums) {
            int existingCount = result.size();
            for (int index = 0; index < existingCount; index++) {
                List<Integer> subset = new ArrayList<>(result.get(index));
                subset.add(value);
                result.add(subset);
            }
        }

        return result;
    }
}
