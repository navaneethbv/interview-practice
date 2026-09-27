class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int low = 0;
        int high = 0;
        for (int weight : weights) {
            low = Math.max(low, weight);
            high += weight;
        }
        while (low < high) {
            int capacity = low + (high - low) / 2;
            if (daysNeeded(weights, capacity) <= days) {
                high = capacity;
            } else {
                low = capacity + 1;
            }
        }
        return low;
    }

    private int daysNeeded(int[] weights, int capacity) {
        int used = 1;
        int load = 0;
        for (int weight : weights) {
            if (load + weight > capacity) {
                used++;
                load = 0;
            }
            load += weight;
        }
        return used;
    }
}
