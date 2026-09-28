class Solution {
    public boolean smallerPrefixes(int[] arr) {
        long slowSum = 0;
        long fastSum = 0;
        int fast = 0;
        for (int slow = 0; slow < arr.length / 2; slow++) {
            slowSum += arr[slow];
            fastSum += (long) arr[fast] + arr[fast + 1];
            fast += 2;
            if (slowSum >= fastSum) {
                return false;
            }
        }
        return true;
    }
}
