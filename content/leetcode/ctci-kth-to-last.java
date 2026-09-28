class Solution {
    public int kthToLast(ListNode head, int k) {
        ListNode lead = head;
        for (int step = 0; step < k; step++) {
            lead = lead.next;
        }
        ListNode trail = head;
        while (lead != null) {
            lead = lead.next;
            trail = trail.next;
        }
        return trail.val;
    }
}
