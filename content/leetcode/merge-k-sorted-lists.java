class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap=new PriorityQueue<>(Comparator.comparingInt(n->n.val));for(ListNode n:lists) if(n!=null) heap.add(n);
        ListNode dummy=new ListNode(),tail=dummy;
        while(!heap.isEmpty()) {ListNode n=heap.remove();tail.next=n;tail=n;if(n.next!=null) heap.add(n.next);}
        return dummy.next;
    }
}
