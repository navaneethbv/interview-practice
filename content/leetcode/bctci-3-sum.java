class Solution {
    public boolean solve(int[] arr, int w) {
        Arrays.sort(arr);
        for (int first = 0; first + 2 < arr.length; first++) {
            int left = first + 1;
            int right = arr.length - 1;
            while (left < right) {
                int total = arr[first] + arr[left] + arr[right];
                if (total == w) {
                    return true;
                }
                if (total < w) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return false;
    }
}
