class Solution {
    public int[] shortestSeq(int[] shorter, int[] longer) {
        Set<Integer> needed = new HashSet<>();
        for (int value : shorter) {
            needed.add(value);
        }
        Map<Integer, Integer> counts = new HashMap<>();
        int covered = 0;
        int[] best = {-1, -1};
        int left = 0;
        for (int right = 0; right < longer.length; right++) {
            if (needed.contains(longer[right]) && counts.merge(longer[right], 1, Integer::sum) == 1) {
                covered++;
            }
            while (covered == needed.size()) {
                if (best[0] == -1 || right - left < best[1] - best[0]) {
                    best = new int[] {left, right};
                }
                int outgoing = longer[left];
                if (needed.contains(outgoing) && counts.merge(outgoing, -1, Integer::sum) == 0) {
                    covered--;
                }
                left++;
            }
        }
        return best;
    }
}
