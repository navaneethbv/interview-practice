class Solution {
    public ListNode zipLists(ListNode head1, ListNode head2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (head1 != null && head2 != null) {
            tail.next = head1;
            head1 = head1.next;
            tail = tail.next;
            tail.next = head2;
            head2 = head2.next;
            tail = tail.next;
        }
        tail.next = head1 != null ? head1 : head2;
        return dummy.next;
    }
}
