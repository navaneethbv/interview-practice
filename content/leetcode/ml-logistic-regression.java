class Solution {
    public double[] train(int[][] X, int[] y, double learningRate, int epochs) {
        int n = X.length;
        int d = X[0].length;
        double[] params = new double[d + 1];
        for (int epoch = 0; epoch < epochs; epoch++) {
            double[] gradient = new double[d + 1];
            for (int i = 0; i < n; i++) {
                double z = params[0];
                for (int j = 0; j < d; j++) {
                    z += params[j + 1] * X[i][j];
                }
                double error = 1 / (1 + Math.exp(-z)) - y[i];
                gradient[0] += error;
                for (int j = 0; j < d; j++) {
                    gradient[j + 1] += error * X[i][j];
                }
            }
            for (int j = 0; j <= d; j++) {
                params[j] -= learningRate * gradient[j] / n;
            }
        }
        return params;
    }
}
