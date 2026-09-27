class Solution {
public ListNode reverseBetween(ListNode head,int left,int right) {ListNode dummy=new ListNode(0,head),before=dummy;for(int i=1;i<left;i++) before=before.next;ListNode start=before.next;for(int i=left;i<right;i++) {ListNode moving=start.next;start.next=moving.next;moving.next=before.next;before.next=moving;}return dummy.next;}
}
