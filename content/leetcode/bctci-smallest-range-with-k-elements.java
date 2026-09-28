class Solution {
    public int[] smallestRange(int[] arr, int k) {
        int[] ordered = arr.clone();
        Arrays.sort(ordered);
        int[] best = null;
        for (int start = 0; start + k <= ordered.length; start++) {
            long width = (long) ordered[start + k - 1] - ordered[start];
            if (best == null || width < (long) best[1] - best[0]) {
                best = new int[] {ordered[start], ordered[start + k - 1]};
            }
        }
        return best;
    }
}
