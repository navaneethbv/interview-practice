class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int value : nums) {
            values.add(value);
        }
        int best = 0;
        for (int start : values) {
            if (!values.contains(start - 1)) {
                int end = start;
                while (values.contains(end)) {
                    end++;
                }
                best = Math.max(best, end - start);
            }
        }
        return best;
    }
}
