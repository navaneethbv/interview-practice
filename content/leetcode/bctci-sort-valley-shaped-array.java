class Solution {
    public int[] sortValley(int[] arr) {
        int[] result = new int[arr.length];
        int left = 0;
        int right = arr.length - 1;
        for (int position = arr.length - 1; position >= 0; position--) {
            if (arr[left] >= arr[right]) {
                result[position] = arr[left++];
            } else {
                result[position] = arr[right--];
            }
        }
        return result;
    }
}
