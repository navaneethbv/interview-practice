class Solution {
    public int sparseSearch(String[] words, String target) {
        int low = 0;
        int high = words.length - 1;
        while (low <= high) {
            int mid = nearestWord(words, (low + high) >>> 1, low, high);
            if (mid == -1) {
                return -1;
            }
            int order = words[mid].compareTo(target);
            if (order == 0) {
                return mid;
            }
            if (order < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    private int nearestWord(String[] words, int mid, int low, int high) {
        int left = mid;
        int right = mid + 1;
        while (left >= low || right <= high) {
            if (left >= low && !words[left].isEmpty()) {
                return left;
            }
            if (right <= high && !words[right].isEmpty()) {
                return right;
            }
            left--;
            right++;
        }
        return -1;
    }
}
