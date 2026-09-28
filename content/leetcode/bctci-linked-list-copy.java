class Solution {
    public ListNode copyList(ListNode head) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (ListNode node = head; node != null; node = node.next) {
            tail.next = new ListNode(node.val);
            tail = tail.next;
        }
        return dummy.next;
    }
}
