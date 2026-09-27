class Solution {
public boolean isPalindrome(ListNode head){ListNode slow=head,fast=head;while(fast!=null&&fast.next!=null){slow=slow.next;fast=fast.next.next;}ListNode prev=null;while(slow!=null){ListNode next=slow.next;slow.next=prev;prev=slow;slow=next;}while(prev!=null){if(head.val!=prev.val)return false;head=head.next;prev=prev.next;}return true;}
}
