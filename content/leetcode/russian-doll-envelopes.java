class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        Arrays.sort(envelopes, (first, second) -> {
            if (first[0] != second[0]) {
                return Integer.compare(first[0], second[0]);
            }
            return Integer.compare(second[1], first[1]);
        });

        int[] increasingHeights = new int[envelopes.length];
        int size = 0;
        for (int[] envelope : envelopes) {
            int left = 0;
            int right = size;
            while (left < right) {
                int middle = left + (right - left) / 2;
                if (increasingHeights[middle] < envelope[1]) {
                    left = middle + 1;
                } else {
                    right = middle;
                }
            }
            increasingHeights[left] = envelope[1];
            if (left == size) {
                size++;
            }
        }
        return size;
    }
}
