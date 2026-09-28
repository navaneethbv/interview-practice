class Solution {
    public int longestSumK(int[] arr, int k) {
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long prefix = 0;
        int best = -1;
        for (int index = 0; index < arr.length; index++) {
            prefix += arr[index];
            Integer start = first.get(prefix - k);
            if (start != null) {
                best = Math.max(best, index - start);
            }
            first.putIfAbsent(prefix, index);
        }
        return best;
    }
}
