class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode reversedSecondHalf = null;
        while (slow != null) {
            ListNode next = slow.next;
            slow.next = reversedSecondHalf;
            reversedSecondHalf = slow;
            slow = next;
        }
        while (reversedSecondHalf != null) {
            if (head.val != reversedSecondHalf.val) {
                return false;
            }
            head = head.next;
            reversedSecondHalf = reversedSecondHalf.next;
        }
        return true;
    }
}
