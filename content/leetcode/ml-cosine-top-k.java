class Solution {
    public int[] topK(int[][] docs, int[] query, int k) {
        int n = docs.length;
        double[] scores = new double[n];
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            scores[i] = Math.round(cosine(docs[i], query) * 1e9) / 1e9;
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> scores[a] != scores[b] ? Double.compare(scores[b], scores[a]) : Integer.compare(a, b));
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = order[i];
        }
        return result;
    }

    private double cosine(int[] a, int[] b) {
        double dot = 0;
        double na = 0;
        double nb = 0;
        for (int i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            na += a[i] * a[i];
            nb += b[i] * b[i];
        }
        return na == 0 || nb == 0 ? 0 : dot / Math.sqrt(na * nb);
    }
}
