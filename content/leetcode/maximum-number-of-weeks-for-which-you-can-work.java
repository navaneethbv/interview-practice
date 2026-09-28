class Solution {
    public long numberOfWeeks(int[] milestones) {
        long total = 0;
        long largest = 0;
        for (int value : milestones) {
            total += value;
            largest = Math.max(largest, value);
        }
        return Math.min(total, 2 * (total - largest) + 1);
    }
}
