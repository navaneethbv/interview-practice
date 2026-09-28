class Solution {
    public ListNode reverseSublist(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode before = dummy;
        for (int step = 0; step < left; step++) {
            if (before.next == null) {
                return head;
            }
            before = before.next;
        }
        ListNode first = before.next;
        if (first == null) {
            return head;
        }
        for (int step = 0; step < right - left && first.next != null; step++) {
            ListNode moved = first.next;
            first.next = moved.next;
            moved.next = before.next;
            before.next = moved;
        }
        return dummy.next;
    }
}
