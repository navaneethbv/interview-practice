class Solution {
    private void search(
            int[] candidates,
            int startIndex,
            int remaining,
            List<Integer> path,
            List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int index = startIndex; index < candidates.length; index++) {
            if (index > startIndex && candidates[index] == candidates[index - 1]) {
                continue;
            }

            int value = candidates[index];
            if (value > remaining) {
                break;
            }

            path.add(value);
            search(candidates, index + 1, remaining - value, path, result);
            path.remove(path.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        search(candidates, 0, target, new ArrayList<>(), result);
        return result;
    }
}
