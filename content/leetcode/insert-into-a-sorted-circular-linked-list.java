class Solution {
    public Node insert(Node head,int insertVal){
        if(head==null){head=new Node(insertVal);head.next=head;return head;}
        Node node=head;
        do {Node next=node.next;if((node.val<=insertVal && insertVal<=next.val)||(node.val>next.val && (insertVal>=node.val || insertVal<=next.val)))break;node=next;}while(node!=head);
        node.next=new Node(insertVal,node.next);return head;
    }
}
