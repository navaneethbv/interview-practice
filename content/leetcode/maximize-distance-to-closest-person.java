class Solution {
    public int maxDistToClosest(int[] seats) {
        int firstOccupied = -1;
        int previousOccupied = -1;
        int bestDistance = 0;
        for (int index = 0; index < seats.length; index++) {
            if (seats[index] == 0) {
                continue;
            }
            if (firstOccupied == -1) {
                firstOccupied = index;
                bestDistance = index;
            } else {
                bestDistance = Math.max(bestDistance, (index - previousOccupied) / 2);
            }
            previousOccupied = index;
        }
        return Math.max(bestDistance, seats.length - 1 - previousOccupied);
    }
}
