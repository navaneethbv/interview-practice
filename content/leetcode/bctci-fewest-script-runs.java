class Solution {
    public int fewestRuns(int[][] meetings) {
        int[][] ordered = meetings.clone();
        Arrays.sort(ordered, Comparator.comparingInt(meeting -> meeting[1]));
        int runs = 0;
        long lastRun = -1;
        for (int[] meeting : ordered) {
            if (meeting[0] > lastRun) {
                runs++;
                lastRun = meeting[1];
            }
        }
        return runs;
    }
}
