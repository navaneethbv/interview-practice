class Solution {
    public int[] nextLargerNodes(ListNode head) {
        List<Integer> values = new ArrayList<>();
        for (ListNode current = head; current != null; current = current.next) {
            values.add(current.val);
        }
        int[] result = new int[values.size()];
        Deque<Integer> decreasingIndices = new ArrayDeque<>();
        for (int index = 0; index < values.size(); index++) {
            while (!decreasingIndices.isEmpty()
                    && values.get(decreasingIndices.peek()) < values.get(index)) {
                result[decreasingIndices.pop()] = values.get(index);
            }
            decreasingIndices.push(index);
        }
        return result;
    }
}
