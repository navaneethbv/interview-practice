class Solution {
    private long completedHeight(long budget, int time, int maximumHeight) {
        long low = 0;
        long high = maximumHeight;
        while (low < high) {
            long middle = (low + high + 1) / 2;
            if (middle * (middle + 1) / 2 <= budget / time) {
                low = middle;
            } else {
                high = middle - 1;
            }
        }
        return low;
    }

    private boolean canFinish(long seconds, int mountainHeight, int[] workerTimes) {
        long completed = 0;
        for (int time : workerTimes) {
            completed += completedHeight(seconds, time, mountainHeight);
            if (completed >= mountainHeight) {
                return true;
            }
        }
        return false;
    }

    public long minNumberOfSeconds(int mountainHeight, int[] workerTimes) {
        int fastest = Arrays.stream(workerTimes).min().getAsInt();
        long low = 0;
        long high = (long) fastest * mountainHeight * (mountainHeight + 1) / 2;
        while (low < high) {
            long middle = low + (high - low) / 2;
            if (canFinish(middle, mountainHeight, workerTimes)) {
                high = middle;
            } else {
                low = middle + 1;
            }
        }
        return low;
    }
}
