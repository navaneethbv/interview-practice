class Solution {
    public int longestAtMostKDistinct(String[] bestSeller, int k) {
        Map<String, Integer> counts = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < bestSeller.length; right++) {
            counts.merge(bestSeller[right], 1, Integer::sum);
            while (counts.size() > k) {
                if (counts.merge(bestSeller[left], -1, Integer::sum) == 0) {
                    counts.remove(bestSeller[left]);
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
