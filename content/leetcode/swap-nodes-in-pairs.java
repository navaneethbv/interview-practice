class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode previous = dummy;
        while (previous.next != null && previous.next.next != null) {
            ListNode first = previous.next;
            ListNode second = first.next;
            first.next = second.next;
            second.next = first;
            previous.next = second;
            previous = first;
        }
        return dummy.next;
    }
}
