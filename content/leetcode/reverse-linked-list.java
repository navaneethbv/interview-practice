class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode previous = null;
        while (head != null) {
            ListNode following = head.next;
            head.next = previous;
            previous = head;
            head = following;
        }
        return previous;
    }
}
