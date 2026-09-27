class Solution {
    private final int[] prefixSums;
    private final Random random = new Random(0);

    public Solution(int[] w) {
        prefixSums = w.clone();
        for (int index = 1; index < prefixSums.length; index++) {
            prefixSums[index] += prefixSums[index - 1];
        }
    }

    public int pickIndex() {
        int target = random.nextInt(prefixSums[prefixSums.length - 1]);
        int left = 0;
        int right = prefixSums.length - 1;
        while (left < right) {
            int middle = left + (right - left) / 2;
            if (prefixSums[middle] > target) {
                right = middle;
            } else {
                left = middle + 1;
            }
        }
        return left;
    }
}
