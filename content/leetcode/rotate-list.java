class Solution {
public ListNode rotateRight(ListNode head,int k){if(head==null)return null;ListNode tail=head;int n=1;while(tail.next!=null){tail=tail.next;n++;}k%=n;if(k==0)return head;tail.next=head;for(int i=0;i<n-k;i++)tail=tail.next;ListNode out=tail.next;tail.next=null;return out;}
}
