class Solution {
    public ListNode[] splitListToParts(ListNode head, int k) {
        int length = length(head);
        int base = length / k;
        int extra = length % k;
        ListNode[] parts = new ListNode[k];
        for (int index = 0; index < k; index++) {
            parts[index] = head;
            int size = base + (index < extra ? 1 : 0);
            head = cutPart(head, size);
        }
        return parts;
    }

    private int length(ListNode head) {
        int count = 0;
        while (head != null) {
            count++;
            head = head.next;
        }
        return count;
    }

    private ListNode cutPart(ListNode head, int size) {
        if (size == 0) {
            return head;
        }
        ListNode tail = head;
        for (int count = 1; count < size; count++) {
            tail = tail.next;
        }
        ListNode following = tail.next;
        tail.next = null;
        return following;
    }
}
