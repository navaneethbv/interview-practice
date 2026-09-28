class Solution {
    public int powerMod(int a, int p, int m) {
        if (p == 0) {
            return 1 % m;
        }
        long half = powerMod(a, p / 2, m);
        long result = half * half % m;
        if (p % 2 == 1) {
            result = result * (a % m) % m;
        }
        return (int) result;
    }
}
