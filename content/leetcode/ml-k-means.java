class Solution {
    public int[] kMeans(int[][] points, int k, int iterations) {
        int n = points.length;
        double[][] centroids = new double[k][2];
        for (int j = 0; j < k; j++) {
            centroids[j][0] = points[j][0];
            centroids[j][1] = points[j][1];
        }
        int[] labels = new int[n];
        Arrays.fill(labels, -1);
        for (int iter = 0; iter < iterations; iter++) {
            boolean changed = false;
            for (int i = 0; i < n; i++) {
                int best = 0;
                double bestDistance = Double.MAX_VALUE;
                for (int j = 0; j < k; j++) {
                    double dx = points[i][0] - centroids[j][0];
                    double dy = points[i][1] - centroids[j][1];
                    double distance = dx * dx + dy * dy;
                    if (distance < bestDistance) {
                        bestDistance = distance;
                        best = j;
                    }
                }
                if (best != labels[i]) {
                    labels[i] = best;
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
            double[][] sums = new double[k][2];
            int[] counts = new int[k];
            for (int i = 0; i < n; i++) {
                sums[labels[i]][0] += points[i][0];
                sums[labels[i]][1] += points[i][1];
                counts[labels[i]]++;
            }
            for (int j = 0; j < k; j++) {
                if (counts[j] > 0) {
                    centroids[j][0] = sums[j][0] / counts[j];
                    centroids[j][1] = sums[j][1] / counts[j];
                }
            }
        }
        return labels;
    }
}
