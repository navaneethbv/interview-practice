class Solution {
    public int minimumDistance(int[] nums) {
        Map<Integer, List<Integer>> positions = new HashMap<>();
        int best = nums.length * 3;
        for (int index = 0; index < nums.length; index++) {
            List<Integer> occurrences = positions.computeIfAbsent(nums[index], key -> new ArrayList<>());
            occurrences.add(index);
            if (occurrences.size() >= 3) {
                int first = occurrences.get(occurrences.size() - 3);
                best = Math.min(best, 2 * (index - first));
            }
        }
        return best < nums.length * 3 ? best : -1;
    }
}
