class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> ranges = new ArrayList<>();

        for (int start = 0; start < nums.length;) {
            int end = start;
            while (end + 1 < nums.length
                    && (long) nums[end + 1] == (long) nums[end] + 1) {
                end++;
            }

            if (start == end) {
                ranges.add(String.valueOf(nums[start]));
            } else {
                ranges.add(nums[start] + "->" + nums[end]);
            }
            start = end + 1;
        }

        return ranges;
    }
}
