class Solution {
    public List<List<Integer>> minimumAbsDifference(int[] arr) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        int best = Integer.MAX_VALUE;
        for (int i = 1; i < sorted.length; i++) {
            best = Math.min(best, sorted[i] - sorted[i - 1]);
        }
        List<List<Integer>> pairs = new ArrayList<>();
        for (int i = 1; i < sorted.length; i++) {
            if (sorted[i] - sorted[i - 1] == best) {
                pairs.add(Arrays.asList(sorted[i - 1], sorted[i]));
            }
        }
        return pairs;
    }
}
