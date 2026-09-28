class Solution {
    public int search(ArrayReader reader, int target) {
        int bound = 1;
        while (reader.get(bound - 1) < target) {
            bound *= 2;
        }
        int low = bound / 2;
        int high = bound - 1;
        while (low <= high) {
            int mid = (low + high) >>> 1;
            int value = reader.get(mid);
            if (value == target) {
                return mid;
            }
            if (value < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}
