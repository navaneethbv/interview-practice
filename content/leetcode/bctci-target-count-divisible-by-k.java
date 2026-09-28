class Solution {
    public boolean countDivisible(int[] arr, int target, int k) {
        int count = firstGreater(arr, target) - firstGreater(arr, target - 1L);
        return count % k == 0;
    }

    private int firstGreater(int[] arr, long value) {
        int low = 0;
        int high = arr.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (arr[mid] > value) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
