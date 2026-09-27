class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head);
        ListNode before = dummy;
        ListNode end = advance(before, k);
        while (end != null) {
            ListNode after = end.next;
            ListNode oldStart = before.next;
            reverseBlock(oldStart, after);
            before.next = end;
            before = oldStart;
            end = advance(before, k);
        }
        return dummy.next;
    }

    private ListNode advance(ListNode node, int count) {
        for (int step = 0; step < count && node != null; step++) {
            node = node.next;
        }
        return node;
    }

    private void reverseBlock(ListNode current, ListNode after) {
        ListNode previous = after;
        while (current != after) {
            ListNode following = current.next;
            current.next = previous;
            previous = current;
            current = following;
        }
    }
}
