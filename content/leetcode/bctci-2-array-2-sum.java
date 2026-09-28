class Solution {
    public int[] twoArrayTwoSum(int[] sorted_arr, int[] unsorted_arr) {
        for (int j = 0; j < unsorted_arr.length; j++) {
            int i = Arrays.binarySearch(sorted_arr, -unsorted_arr[j]);
            if (i >= 0) {
                return new int[] {i, j};
            }
        }
        return new int[] {-1, -1};
    }
}
