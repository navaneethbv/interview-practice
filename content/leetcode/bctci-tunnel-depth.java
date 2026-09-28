class Solution {
    public int solve(int[][] tunnel_network) {
        int low = 0;
        int high = tunnel_network.length;
        while (low + 1 < high) {
            int middle = (low + high) / 2;
            boolean occupied = false;
            for (int value : tunnel_network[middle]) {
                occupied |= value == 1;
            }
            if (occupied) {
                low = middle;
            } else {
                high = middle;
            }
        }
        return low;
    }
}
