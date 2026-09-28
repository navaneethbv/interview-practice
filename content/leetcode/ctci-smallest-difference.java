class Solution {
    public long smallestDifference(int[] a, int[] b) {
        int[] first = a.clone();
        int[] second = b.clone();
        Arrays.sort(first);
        Arrays.sort(second);
        int i = 0;
        int j = 0;
        long best = Long.MAX_VALUE;
        while (i < first.length && j < second.length) {
            best = Math.min(best, Math.abs((long) first[i] - second[j]));
            if (first[i] < second[j]) {
                i++;
            } else {
                j++;
            }
        }
        return best;
    }
}
