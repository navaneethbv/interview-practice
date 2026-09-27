class Solution {
    public int minRefuelStops(int target, int startFuel, int[][] stations) {
        PriorityQueue<Integer> availableFuel = new PriorityQueue<>(Comparator.reverseOrder());
        long reached = startFuel;
        int stationIndex = 0;
        int stops = 0;
        while (reached < target) {
            while (stationIndex < stations.length && stations[stationIndex][0] <= reached) {
                availableFuel.add(stations[stationIndex][1]);
                stationIndex++;
            }
            if (availableFuel.isEmpty()) {
                return -1;
            }
            reached += availableFuel.remove();
            stops++;
        }
        return stops;
    }
}
