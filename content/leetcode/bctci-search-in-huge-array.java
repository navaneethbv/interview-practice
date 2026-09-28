class Solution {
    public int searchHuge(ArrayReader reader, int target) {
        int bound = 1;
        while (reader.get(bound - 1) < target) {
            bound *= 2;
        }
        int low = bound / 2;
        int high = bound - 1;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (reader.get(mid) < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return reader.get(low) == target ? low : -1;
    }
}
