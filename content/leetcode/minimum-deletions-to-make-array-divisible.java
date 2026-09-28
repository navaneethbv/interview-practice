class Solution {
    public int minOperations(int[] nums, int[] numsDivide) {
        int commonDivisor = 0;
        for (int value : numsDivide) {
            commonDivisor = gcd(commonDivisor, value);
        }
        Arrays.sort(nums);
        for (int deletions = 0; deletions < nums.length; deletions++) {
            if (commonDivisor % nums[deletions] == 0) {
                return deletions;
            }
        }
        return -1;
    }

    private int gcd(int first, int second) {
        while (second != 0) {
            int remainder = first % second;
            first = second;
            second = remainder;
        }
        return first;
    }
}
