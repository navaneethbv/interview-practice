class Solution {
    public int maxDistance(int[] position, int m) {
        int[] positions = position.clone();
        Arrays.sort(positions);
        int left = 1;
        int right = positions[positions.length - 1] - positions[0];
        while (left < right) {
            int middle = left + (right - left + 1) / 2;
            if (possible(positions, m, middle)) {
                left = middle;
            } else {
                right = middle - 1;
            }
        }
        return left;
    }

    private boolean possible(int[] positions, int required, int gap) {
        int used = 1;
        int last = positions[0];
        for (int index = 1; index < positions.length; index++) {
            if (positions[index] - last >= gap) {
                used++;
                last = positions[index];
            }
        }
        return used >= required;
    }
}
