class Solution {
    public double bestRatings(double[] ratings) {
        double withoutLast = 0;
        double best = 0;
        for (double rating : ratings) {
            double next = Math.max(best, withoutLast + rating);
            withoutLast = best;
            best = next;
        }
        return best;
    }
}
