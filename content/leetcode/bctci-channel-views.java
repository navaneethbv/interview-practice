class Solution {
    public int[] periodViews(int[] views, int[][] periods) {
        int[] prefix = new int[views.length + 1];
        for (int i = 0; i < views.length; i++) {
            prefix[i + 1] = prefix[i] + views[i];
        }
        int[] totals = new int[periods.length];
        for (int j = 0; j < periods.length; j++) {
            totals[j] = prefix[periods[j][1] + 1] - prefix[periods[j][0]];
        }
        return totals;
    }
}
