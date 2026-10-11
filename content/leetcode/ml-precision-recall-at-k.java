class Solution {
    public double[] precisionRecallAtK(int[] ranked, int[] relevant, int k) {
        Set<Integer> wanted = new HashSet<>();
        for (int item : relevant) {
            wanted.add(item);
        }
        int hits = 0;
        for (int i = 0; i < k; i++) {
            if (wanted.contains(ranked[i])) {
                hits++;
            }
        }
        return new double[] {(double) hits / k, (double) hits / wanted.size()};
    }
}
