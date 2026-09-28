class Solution {
    public int countWays(List<Integer> nums) {
        Collections.sort(nums);
        int studentCount = nums.size();
        int ways = 0;
        for (int selected = 0; selected <= studentCount; selected++) {
            boolean enoughBefore = selected == 0 || nums.get(selected - 1) < selected;
            boolean enoughAfter = selected == studentCount || nums.get(selected) > selected;
            if (enoughBefore && enoughAfter) {
                ways++;
            }
        }
        return ways;
    }
}
