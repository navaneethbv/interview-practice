class Solution {
    public double[] attention(int[] query, int[][] keys, int[][] values) {
        int n = keys.length;
        double scale = Math.sqrt(query.length);
        double[] weights = new double[n];
        double top = Double.NEGATIVE_INFINITY;
        for (int i = 0; i < n; i++) {
            double dot = 0;
            for (int j = 0; j < query.length; j++) {
                dot += query[j] * keys[i][j];
            }
            weights[i] = dot / scale;
            top = Math.max(top, weights[i]);
        }
        double total = 0;
        for (int i = 0; i < n; i++) {
            weights[i] = Math.exp(weights[i] - top);
            total += weights[i];
        }
        double[] out = new double[values[0].length];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < out.length; j++) {
                out[j] += weights[i] / total * values[i][j];
            }
        }
        return out;
    }
}
