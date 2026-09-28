class Solution {
    public int findMaxVal(int n, int[][] restrictions, int[] diff) {
        int[] values = new int[n];
        Arrays.fill(values, 1000000000);
        values[0] = 0;
        for (int[] restriction : restrictions) {
            values[restriction[0]] = restriction[1];
        }
        for (int index = 1; index < n; index++) {
            values[index] = Math.min(values[index], values[index - 1] + diff[index - 1]);
        }
        for (int index = n - 2; index >= 0; index--) {
            values[index] = Math.min(values[index], values[index + 1] + diff[index]);
        }
        int maximum = values[0];
        for (int value : values) {
            maximum = Math.max(maximum, value);
        }
        return maximum;
    }
}
