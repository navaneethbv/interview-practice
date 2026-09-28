class Solution {
    public ListNode removeDups(ListNode head) {
        Set<Integer> seen = new HashSet<>();
        ListNode previous = null;
        ListNode node = head;
        while (node != null) {
            if (seen.contains(node.val)) {
                previous.next = node.next;
            } else {
                seen.add(node.val);
                previous = node;
            }
            node = node.next;
        }
        return head;
    }
}
