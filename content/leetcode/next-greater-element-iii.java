class Solution {
    public int nextGreaterElement(int n) {
        char[] digits = Integer.toString(n).toCharArray();
        int pivot = digits.length - 2;
        while (pivot >= 0 && digits[pivot] >= digits[pivot + 1]) {
            pivot--;
        }
        if (pivot < 0) {
            return -1;
        }
        int swapIndex = digits.length - 1;
        while (digits[swapIndex] <= digits[pivot]) {
            swapIndex--;
        }
        char temporary = digits[pivot];
        digits[pivot] = digits[swapIndex];
        digits[swapIndex] = temporary;
        int left = pivot + 1;
        int right = digits.length - 1;
        while (left < right) {
            temporary = digits[left];
            digits[left] = digits[right];
            digits[right] = temporary;
            left++;
            right--;
        }
        long value = Long.parseLong(new String(digits));
        return value <= Integer.MAX_VALUE ? (int) value : -1;
    }
}
