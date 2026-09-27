class Solution {
    public List<List<Integer>> findMissingRanges(int[] nums, int lower, int upper) {
        List<List<Integer>> ranges = new ArrayList<>();
        long nextMissing = lower;
        for (int value : nums) {
            addRangeIfMissing(ranges, nextMissing, (long) value - 1);
            nextMissing = (long) value + 1;
        }
        addRangeIfMissing(ranges, nextMissing, upper);
        return ranges;
    }

    private void addRangeIfMissing(List<List<Integer>> ranges, long start, long end) {
        if (start > end) {
            return;
        }
        ranges.add(Arrays.asList((int) start, (int) end));
    }
}
