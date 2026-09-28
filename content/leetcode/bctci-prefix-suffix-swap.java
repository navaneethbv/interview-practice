class Solution {
    public void prefixSuffixSwap(char[] arr) {
        int n = arr.length;
        reverse(arr, 0, n - 1);
        reverse(arr, 0, 2 * n / 3 - 1);
        reverse(arr, 2 * n / 3, n - 1);
    }

    private void reverse(char[] arr, int left, int right) {
        while (left < right) {
            char temp = arr[left];
            arr[left++] = arr[right];
            arr[right--] = temp;
        }
    }
}
