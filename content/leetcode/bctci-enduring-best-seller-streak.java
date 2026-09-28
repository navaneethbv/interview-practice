class Solution {
    public boolean hasEnduringStreak(String[] bestSeller, int k) {
        int run = 0;
        for (int day = 0; day < bestSeller.length; day++) {
            run = day > 0 && bestSeller[day].equals(bestSeller[day - 1]) ? run + 1 : 1;
            if (run >= k) {
                return true;
            }
        }
        return false;
    }
}
