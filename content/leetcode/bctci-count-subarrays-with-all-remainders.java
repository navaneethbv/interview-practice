class Solution {
    public long countAllRemainders(int[] arr) {
        int[] last = {-1, -1, -1};
        long total = 0;
        for (int index = 0; index < arr.length; index++) {
            last[arr[index] % 3] = index;
            total += Math.min(last[0], Math.min(last[1], last[2])) + 1;
        }
        return total;
    }
}
