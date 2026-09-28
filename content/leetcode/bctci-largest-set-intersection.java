class Solution {
    public int bestExclusion(int[][] sets) {
        int n = sets.length;
        if (n == 1) {
            return 0;
        }
        Map<Integer, Integer> counts = new HashMap<>();
        for (int[] group : sets) {
            for (int value : group) {
                counts.merge(value, 1, Integer::sum);
            }
        }
        int everywhere = 0;
        int missingOne = 0;
        for (int count : counts.values()) {
            if (count == n) {
                everywhere++;
            } else if (count == n - 1) {
                missingOne++;
            }
        }
        int bestIndex = 0;
        int bestSize = -1;
        for (int index = 0; index < n; index++) {
            int inGroupMissingOne = 0;
            for (int value : sets[index]) {
                if (counts.get(value) == n - 1) {
                    inGroupMissingOne++;
                }
            }
            int size = everywhere + missingOne - inGroupMissingOne;
            if (size > bestSize) {
                bestIndex = index;
                bestSize = size;
            }
        }
        return bestIndex;
    }
}
