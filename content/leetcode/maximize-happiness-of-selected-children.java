class Solution {
public long maximumHappinessSum(int[] happiness, int k) {
    Arrays.sort(happiness);
    long total = 0;
    for (int index = 0; index < k; index++) {
        int currentHappiness = happiness[happiness.length - 1 - index] - index;
        total += Math.max(0, currentHappiness);
    }
    return total;
}
}
