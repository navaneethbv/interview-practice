class Solution {
    public int numberOf2sInRange(int n) {
        long total = 0;
        for (long power = 1; power <= n; power *= 10) {
            long higher = n / (power * 10);
            long current = (n / power) % 10;
            long lower = n % power;
            if (current < 2) {
                total += higher * power;
            } else if (current == 2) {
                total += higher * power + lower + 1;
            } else {
                total += (higher + 1) * power;
            }
        }
        return (int) total;
    }
}
