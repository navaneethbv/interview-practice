class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int[][] cars = new int[position.length][2];
        for (int index = 0; index < position.length; index++) {
            cars[index][0] = position[index];
            cars[index][1] = speed[index];
        }
        Arrays.sort(cars, (first, second) -> Integer.compare(second[0], first[0]));
        int fleets = 0;
        double slowest = -1;
        for (int[] car : cars) {
            double arrival = (double) (target - car[0]) / car[1];
            if (arrival > slowest) {
                fleets++;
                slowest = arrival;
            }
        }
        return fleets;
    }
}
