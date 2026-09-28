class Solution {
    public List<Integer> solve(int n) {
        List<Integer> small = new ArrayList<>();
        List<Integer> large = new ArrayList<>();
        for (int divisor = 1; divisor <= n / divisor; divisor++) {
            if (n % divisor == 0) {
                small.add(divisor);
                if (divisor != n / divisor) {
                    large.add(n / divisor);
                }
            }
        }
        Collections.reverse(large);
        small.addAll(large);
        return small;
    }
}
