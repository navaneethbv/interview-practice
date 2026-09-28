class Solution {
    public boolean checkPerfectNumber(int num) {
        if (num <= 1) {
            return false;
        }
        long total = 1;
        for (int divisor = 2; (long) divisor * divisor <= num; divisor++) {
            if (num % divisor == 0) {
                total += divisor;
                if (divisor != num / divisor) {
                    total += num / divisor;
                }
            }
        }
        return total == num;
    }
}
