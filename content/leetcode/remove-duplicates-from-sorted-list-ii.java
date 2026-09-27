class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (head != null) {
            ListNode nextDistinct = head.next;
            while (nextDistinct != null && nextDistinct.val == head.val) {
                nextDistinct = nextDistinct.next;
            }
            if (head.next == nextDistinct) {
                tail.next = head;
                tail = head;
            }
            head = nextDistinct;
        }
        tail.next = null;
        return dummy.next;
    }
}
