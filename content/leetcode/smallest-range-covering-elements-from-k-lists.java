class Solution {
    public int[] smallestRange(List<List<Integer>> nums) {
        PriorityQueue<int[]> pending = new PriorityQueue<>(
                Comparator.comparingInt(value -> value[0]));
        int high = Integer.MIN_VALUE;
        for (int rowIndex = 0; rowIndex < nums.size(); rowIndex++) {
            int firstValue = nums.get(rowIndex).get(0);
            pending.add(new int[] {firstValue, rowIndex, 0});
            high = Math.max(high, firstValue);
        }
        int lowAnswer = pending.peek()[0];
        int highAnswer = high;
        while (true) {
            int[] current = pending.remove();
            int low = current[0];
            int currentLength = high - low;
            int answerLength = highAnswer - lowAnswer;
            if (currentLength < answerLength
                    || (currentLength == answerLength && low < lowAnswer)) {
                lowAnswer = low;
                highAnswer = high;
            }
            int nextIndex = current[2] + 1;
            if (nextIndex == nums.get(current[1]).size()) {
                break;
            }
            int nextValue = nums.get(current[1]).get(nextIndex);
            high = Math.max(high, nextValue);
            pending.add(new int[] {nextValue, current[1], nextIndex});
        }
        return new int[] {lowAnswer, highAnswer};
    }
}
