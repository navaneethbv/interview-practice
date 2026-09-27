class Solution {
    public Node flatten(Node head){
        Deque<Node> stack=new ArrayDeque<>();if(head!=null)stack.push(head);Node previous=null;
        while(!stack.isEmpty()){Node node=stack.pop();if(node.next!=null)stack.push(node.next);if(node.child!=null)stack.push(node.child);node.prev=previous;node.child=null;if(previous!=null)previous.next=node;previous=node;}
        if(previous!=null)previous.next=null;return head;
    }
}
