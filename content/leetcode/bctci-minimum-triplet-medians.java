class Solution {
    public long minMedianSum(int[] arr) {
        int[] ordered = arr.clone();
        Arrays.sort(ordered);
        long total = 0;
        for (int i = 0; i < arr.length / 3; i++) {
            total += ordered[2 * i + 1];
        }
        return total;
    }
}
