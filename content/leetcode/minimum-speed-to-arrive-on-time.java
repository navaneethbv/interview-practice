class Solution {
    public int minSpeedOnTime(int[] dist, double hour) {
        if (hour <= dist.length - 1) {
            return -1;
        }
        int low = 1;
        int high = 10_000_000;
        while (low < high) {
            int middle = low + (high - low) / 2;
            if (canArrive(dist, hour, middle)) {
                high = middle;
            } else {
                low = middle + 1;
            }
        }
        return canArrive(dist, hour, low) ? low : -1;
    }

    private boolean canArrive(int[] dist, double hour, int speed) {
        double elapsed = 0.0;
        for (int index = 0; index < dist.length - 1; index++) {
            elapsed += Math.ceil((double) dist[index] / speed);
        }
        elapsed += (double) dist[dist.length - 1] / speed;
        return elapsed <= hour;
    }
}
