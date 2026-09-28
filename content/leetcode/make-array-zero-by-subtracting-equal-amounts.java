class Solution {
    public int minimumOperations(int[] nums) {
        Set<Integer> positiveValues = new HashSet<>();
        for (int value : nums) {
            if (value > 0) {
                positiveValues.add(value);
            }
        }
        return positiveValues.size();
    }
}
