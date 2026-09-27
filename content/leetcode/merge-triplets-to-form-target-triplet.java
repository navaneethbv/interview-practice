class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        boolean[] reachedCoordinate = new boolean[3];
        for (int[] triplet : triplets) {
            if (exceedsTarget(triplet, target)) {
                continue;
            }
            for (int coordinate = 0; coordinate < 3; coordinate++) {
                if (triplet[coordinate] == target[coordinate]) {
                    reachedCoordinate[coordinate] = true;
                }
            }
        }
        return reachedCoordinate[0] && reachedCoordinate[1] && reachedCoordinate[2];
    }

    private boolean exceedsTarget(int[] triplet, int[] target) {
        return triplet[0] > target[0]
                || triplet[1] > target[1]
                || triplet[2] > target[2];
    }
}
