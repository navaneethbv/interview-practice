class Solution {
    public Node copyRandomList(Node head) {
        Map<Node,Node> copies=new IdentityHashMap<>();
        for(Node p=head;p!=null;p=p.next) copies.put(p,new Node(p.val));
        for(Node p=head;p!=null;p=p.next) {copies.get(p).next=copies.get(p.next);copies.get(p).random=copies.get(p.random);}
        return copies.get(head);
    }
}
