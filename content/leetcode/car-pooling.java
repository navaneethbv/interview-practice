class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        int[] changes = new int[1001];
        for (int[] trip : trips) {
            changes[trip[1]] += trip[0];
            changes[trip[2]] -= trip[0];
        }
        int passengers = 0;
        for (int change : changes) {
            passengers += change;
            if (passengers > capacity) {
                return false;
            }
        }
        return true;
    }
}
