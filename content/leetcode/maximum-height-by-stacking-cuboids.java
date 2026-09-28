class Solution {
    public int maxHeight(int[][] cuboids) {
        for (int[] cuboid : cuboids) {
            Arrays.sort(cuboid);
        }
        Arrays.sort(cuboids, (first, second) -> {
            for (int axis = 0; axis < 3; axis++) {
                if (first[axis] != second[axis]) {
                    return Integer.compare(first[axis], second[axis]);
                }
            }
            return 0;
        });
        int[] bestAt = new int[cuboids.length];
        int answer = 0;
        for (int index = 0; index < cuboids.length; index++) {
            bestAt[index] = cuboids[index][2];
            for (int previous = 0; previous < index; previous++) {
                if (fits(cuboids[previous], cuboids[index])) {
                    bestAt[index] = Math.max(bestAt[index], bestAt[previous] + cuboids[index][2]);
                }
            }
            answer = Math.max(answer, bestAt[index]);
        }
        return answer;
    }

    private boolean fits(int[] lower, int[] upper) {
        return lower[0] <= upper[0] && lower[1] <= upper[1] && lower[2] <= upper[2];
    }
}
