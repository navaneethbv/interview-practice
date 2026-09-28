class Solution {
    public long[] countDrops(int[] arr, int k) {
        long total = (long) arr.length * (arr.length + 1) / 2;
        long atMost = atMost(arr, k);
        long below = atMost(arr, k - 1L);
        return new long[] {atMost, atMost - below, total - below};
    }

    private long atMost(int[] arr, long k) {
        if (k < 0) {
            return 0;
        }
        int left = 0;
        int drops = 0;
        long count = 0;
        for (int right = 0; right < arr.length; right++) {
            if (right > 0 && arr[right - 1] > arr[right]) {
                drops++;
            }
            while (drops > k) {
                if (arr[left] > arr[left + 1]) {
                    drops--;
                }
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}
