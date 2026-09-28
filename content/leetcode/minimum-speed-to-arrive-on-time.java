class Solution {
    public int minSpeedOnTime(int[] dist, double hour) {
        long slowestTime = 0;
        for (int distance : dist) {
            slowestTime += distance;
        }
        if (hour >= slowestTime) {
            return 1;
        }
        long deadline = Math.round(hour * 100);
        if (deadline <= 100L * (dist.length - 1)) {
            return -1;
        }
        int low = 1;
        int high = 10_000_000;
        while (low < high) {
            int middle = low + (high - low) / 2;
            if (canArrive(dist, deadline, middle)) {
                high = middle;
            } else {
                low = middle + 1;
            }
        }
        return canArrive(dist, deadline, low) ? low : -1;
    }

    private boolean canArrive(int[] dist, long deadline, int speed) {
        long wholeHours = 0;
        for (int index = 0; index < dist.length - 1; index++) {
            wholeHours += (dist[index] + speed - 1) / speed;
        }
        long remaining = deadline - 100 * wholeHours;
        if (remaining <= 0) {
            return false;
        }
        long finalDistance = 100L * dist[dist.length - 1];
        long minimumFinalSpeed = (finalDistance + remaining - 1) / remaining;
        return speed >= minimumFinalSpeed;
    }
}
