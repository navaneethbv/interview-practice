class Solution {
    public ListNode removeZeroSumSublists(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        Map<Integer, ListNode> lastNodeForSum = new HashMap<>();
        int prefixSum = 0;
        for (ListNode node = dummy; node != null; node = node.next) {
            prefixSum += node.val;
            lastNodeForSum.put(prefixSum, node);
        }

        prefixSum = 0;
        for (ListNode node = dummy; node != null; node = node.next) {
            prefixSum += node.val;
            node.next = lastNodeForSum.get(prefixSum).next;
        }
        return dummy.next;
    }
}
