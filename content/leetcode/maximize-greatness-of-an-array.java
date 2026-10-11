class Solution {
    public int maximizeGreatness(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int matched = 0;
        for (int x : sorted) {
            if (x > sorted[matched]) {
                matched++;
            }
        }
        return matched;
    }
}
