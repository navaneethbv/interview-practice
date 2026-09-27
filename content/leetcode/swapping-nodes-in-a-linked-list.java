class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        ListNode first = head;
        for (int position = 1; position < k; position++) {
            first = first.next;
        }
        ListNode runner = first;
        ListNode second = head;
        while (runner.next != null) {
            runner = runner.next;
            second = second.next;
        }
        int temporary = first.val;
        first.val = second.val;
        second.val = temporary;
        return head;
    }
}
