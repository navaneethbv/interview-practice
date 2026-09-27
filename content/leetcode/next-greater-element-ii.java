class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int length = nums.length;
        int[] result = new int[length];
        Arrays.fill(result, -1);
        Deque<Integer> decreasingIndices = new ArrayDeque<>();

        for (int index = 0; index < 2 * length; index++) {
            int valueIndex = index % length;
            while (!decreasingIndices.isEmpty()
                    && nums[decreasingIndices.peek()] < nums[valueIndex]) {
                result[decreasingIndices.pop()] = nums[valueIndex];
            }
            if (index < length) {
                decreasingIndices.push(valueIndex);
            }
        }
        return result;
    }
}
