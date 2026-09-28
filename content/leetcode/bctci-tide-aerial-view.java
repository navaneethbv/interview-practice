class Solution {
    public int mostBalanced(List<List<String>> pictures) {
        int n = pictures.get(0).size();
        long total = (long) n * n;
        int low = 0;
        int high = pictures.size() - 1;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (2 * flooded(pictures.get(mid)) >= total) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        if (low > 0 && imbalance(pictures.get(low - 1), total) <= imbalance(pictures.get(low), total)) {
            return low - 1;
        }
        return low;
    }

    private long imbalance(List<String> picture, long total) {
        return Math.abs(2 * flooded(picture) - total);
    }

    private long flooded(List<String> picture) {
        long count = 0;
        for (String row : picture) {
            int low = 0;
            int high = row.length();
            while (low < high) {
                int mid = (low + high) >>> 1;
                if (row.charAt(mid) == '1') {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            count += low;
        }
        return count;
    }
}
