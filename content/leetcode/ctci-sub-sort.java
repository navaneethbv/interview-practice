class Solution {
    public int[] findUnsortedSequence(int[] array) {
        int end = -1;
        long runningMax = Long.MIN_VALUE;
        for (int index = 0; index < array.length; index++) {
            if (array[index] < runningMax) {
                end = index;
            }
            runningMax = Math.max(runningMax, array[index]);
        }
        if (end == -1) {
            return new int[] {-1, -1};
        }
        int start = -1;
        long runningMin = Long.MAX_VALUE;
        for (int index = array.length - 1; index >= 0; index--) {
            if (array[index] > runningMin) {
                start = index;
            }
            runningMin = Math.min(runningMin, array[index]);
        }
        return new int[] {start, end};
    }
}
