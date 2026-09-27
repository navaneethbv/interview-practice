class Solution {
    public void reorderList(ListNode head) {
        ListNode slow=head,fast=head;
        while(fast.next!=null&&fast.next.next!=null) {slow=slow.next;fast=fast.next.next;}
        ListNode current=slow.next,previous=null;slow.next=null;
        while(current!=null) {ListNode next=current.next;current.next=previous;previous=current;current=next;}
        ListNode first=head,second=previous;
        while(second!=null) {ListNode a=first.next,b=second.next;first.next=second;second.next=a;first=a;second=b;}
    }
}
