class Solution {
    public int arrayNesting(int[] nums) {
        boolean[] visited = new boolean[nums.length];
        int longestCycle = 0;
        for (int start = 0; start < nums.length; start++) {
            int current = start;
            int cycleLength = 0;
            while (!visited[current]) {
                visited[current] = true;
                cycleLength++;
                current = nums[current];
            }
            longestCycle = Math.max(longestCycle, cycleLength);
        }
        return longestCycle;
    }
}
