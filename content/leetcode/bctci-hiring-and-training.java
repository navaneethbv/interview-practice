class Solution {
    public int solve(int n) {
        int answer = 0;
        for (int factor = 2; factor * factor <= n; factor++) {
            while (n % factor == 0) {
                answer += factor;
                n /= factor;
            }
        }
        return answer + (n > 1 ? n : 0);
    }
}
