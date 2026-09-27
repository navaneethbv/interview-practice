class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0, head);
        ListNode beforeReversed = dummy;
        for (int position = 1; position < left; position++) {
            beforeReversed = beforeReversed.next;
        }
        ListNode firstNode = beforeReversed.next;
        for (int position = left; position < right; position++) {
            ListNode movedNode = firstNode.next;
            firstNode.next = movedNode.next;
            movedNode.next = beforeReversed.next;
            beforeReversed.next = movedNode;
        }
        return dummy.next;
    }
}
