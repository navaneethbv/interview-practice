class Solution {
    public boolean hasUniqueStreak(String[] bestSeller, int k) {
        Map<String, Integer> counts = new HashMap<>();
        int repeated = 0;
        for (int day = 0; day < bestSeller.length; day++) {
            if (counts.merge(bestSeller[day], 1, Integer::sum) == 2) {
                repeated++;
            }
            if (day >= k && counts.merge(bestSeller[day - k], -1, Integer::sum) == 1) {
                repeated--;
            }
            if (day >= k - 1 && repeated == 0) {
                return true;
            }
        }
        return false;
    }
}
