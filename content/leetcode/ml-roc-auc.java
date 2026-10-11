class Solution {
    public double rocAuc(double[] scores, int[] labels) {
        int n = scores.length;
        long positives = 0;
        for (int label : labels) {
            positives += label;
        }
        long negatives = n - positives;
        // Count correctly ordered pairs directly.
        // This suits the test sizes and stays independent of the rank-sum implementation.
        double correct = 0;
        for (int i = 0; i < n; i++) {
            if (labels[i] != 1) {
                continue;
            }
            for (int j = 0; j < n; j++) {
                if (labels[j] != 0) {
                    continue;
                }
                if (scores[i] > scores[j]) {
                    correct += 1;
                } else if (scores[i] == scores[j]) {
                    correct += 0.5;
                }
            }
        }
        return correct / (positives * negatives);
    }
}
