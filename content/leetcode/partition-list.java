class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode smaller = new ListNode(0);
        ListNode larger = new ListNode(0);
        ListNode smallerTail = smaller;
        ListNode largerTail = larger;
        while (head != null) {
            ListNode nextNode = head.next;
            if (head.val < x) {
                smallerTail.next = head;
                smallerTail = head;
            } else {
                largerTail.next = head;
                largerTail = head;
            }
            head = nextNode;
        }
        largerTail.next = null;
        smallerTail.next = larger.next;
        return smaller.next;
    }
}
