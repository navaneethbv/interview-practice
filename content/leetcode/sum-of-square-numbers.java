class Solution {
    public boolean judgeSquareSum(int c) {
        long left = 0;
        long right = (long) Math.sqrt(c);
        while (left <= right) {
            long squareSum = left * left + right * right;
            if (squareSum == c) {
                return true;
            }
            if (squareSum < c) {
                left++;
            } else {
                right--;
            }
        }
        return false;
    }
}
