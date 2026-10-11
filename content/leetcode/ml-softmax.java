class Solution {
    public double[] softmax(double[] logits) {
        double top = Double.NEGATIVE_INFINITY;
        for (double x : logits) {
            top = Math.max(top, x);
        }
        double[] out = new double[logits.length];
        double total = 0;
        for (int i = 0; i < logits.length; i++) {
            out[i] = Math.exp(logits[i] - top);
            total += out[i];
        }
        for (int i = 0; i < out.length; i++) {
            out[i] /= total;
        }
        return out;
    }
}
