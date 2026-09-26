class Solution {
    public ListNode findCycleStart(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if (slow == fast) break;
        }
        ListNode p = head;
        while (p != slow) { p = p.next; slow = slow.next; }
        return p;
    }
}
