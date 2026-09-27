class Solution {
    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int jobCount = profit.length;
        int[][] jobs = new int[jobCount][3];
        for (int index = 0; index < jobCount; index++) {
            jobs[index] = new int[] {endTime[index], startTime[index], profit[index]};
        }
        Arrays.sort(jobs, Comparator.comparingInt(job -> job[0]));
        int[] bestProfit = new int[jobCount + 1];
        for (int index = 0; index < jobCount; index++) {
            int compatibleCount = findCompatibleCount(jobs, index, jobs[index][1]);
            int takeProfit = bestProfit[compatibleCount] + jobs[index][2];
            bestProfit[index + 1] = Math.max(bestProfit[index], takeProfit);
        }
        return bestProfit[jobCount];
    }

    private int findCompatibleCount(int[][] jobs, int currentIndex, int startTime) {
        int left = 0;
        int right = currentIndex;
        while (left < right) {
            int middle = left + (right - left) / 2;
            if (jobs[middle][0] <= startTime) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left;
    }
}
