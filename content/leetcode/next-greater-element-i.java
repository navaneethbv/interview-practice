class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Deque<Integer> decreasingStack = new ArrayDeque<>();
        Map<Integer, Integer> nextValues = new HashMap<>();

        for (int value : nums2) {
            while (!decreasingStack.isEmpty()
                    && decreasingStack.peek() < value) {
                nextValues.put(decreasingStack.pop(), value);
            }
            decreasingStack.push(value);
        }

        int[] result = new int[nums1.length];
        for (int index = 0; index < nums1.length; index++) {
            result[index] = nextValues.getOrDefault(nums1[index], -1);
        }
        return result;
    }
}
