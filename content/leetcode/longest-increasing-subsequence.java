class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int value : nums) {
            int position = lowerBound(tails, size, value);
            tails[position] = value;
            if (position == size) {
                size++;
            }
        }
        return size;
    }

    private int lowerBound(int[] tails, int size, int value) {
        int left = 0;
        int right = size;
        while (left < right) {
            int middle = left + (right - left) / 2;
            if (tails[middle] < value) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left;
    }
}
