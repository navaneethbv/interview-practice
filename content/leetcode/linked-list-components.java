class Solution {
public int numComponents(ListNode head,int[] nums){Set<Integer>set=new HashSet<>();for(int x:nums)set.add(x);int count=0;boolean inside=false;while(head!=null){boolean current=set.contains(head.val);if(current&&!inside)count++;inside=current;head=head.next;}return count;}
}
