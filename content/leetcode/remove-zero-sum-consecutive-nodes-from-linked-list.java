class Solution {
public ListNode removeZeroSumSublists(ListNode head) {ListNode dummy=new ListNode(0,head);Map<Integer,ListNode> last=new HashMap<>();int sum=0;for(ListNode p=dummy;p!=null;p=p.next) {sum+=p.val;last.put(sum,p);}sum=0;for(ListNode p=dummy;p!=null;p=p.next) {sum+=p.val;p.next=last.get(sum).next;}return dummy.next;}
}
