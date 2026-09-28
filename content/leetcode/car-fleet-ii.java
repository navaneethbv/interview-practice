class Solution {
    public double[] getCollisionTimes(int[][] cars) {
        double[] collision = new double[cars.length];
        Arrays.fill(collision, -1.0);
        int[] candidates = new int[cars.length];
        int size = 0;
        for (int index = cars.length - 1; index >= 0; index--) {
            while (size > 0) {
                int nextIndex = candidates[size - 1];
                if (cars[index][1] <= cars[nextIndex][1]) {
                    size--;
                    continue;
                }
                double time = (double) (cars[nextIndex][0] - cars[index][0])
                        / (cars[index][1] - cars[nextIndex][1]);
                if (collision[nextIndex] < 0 || time <= collision[nextIndex]) {
                    collision[index] = time;
                    break;
                }
                size--;
            }
            candidates[size++] = index;
        }
        return collision;
    }
}
