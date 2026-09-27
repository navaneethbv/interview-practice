class Solution {
public ListNode sortList(ListNode head){if(head==null||head.next==null)return head;ListNode slow=head,fast=head.next;while(fast!=null&&fast.next!=null){slow=slow.next;fast=fast.next.next;}ListNode right=slow.next;slow.next=null;ListNode a=sortList(head),b=sortList(right),dummy=new ListNode(0),tail=dummy;while(a!=null&&b!=null){if(a.val<=b.val){tail.next=a;a=a.next;}else{tail.next=b;b=b.next;}tail=tail.next;}tail.next=a!=null?a:b;return dummy.next;}
}
