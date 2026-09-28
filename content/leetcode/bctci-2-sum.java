class Solution {
    public boolean twoSum(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        while (left < right) {
            long total = (long) arr[left] + arr[right];
            if (total == 0) {
                return true;
            }
            if (total > 0) {
                right--;
            } else {
                left++;
            }
        }
        return false;
    }
}
