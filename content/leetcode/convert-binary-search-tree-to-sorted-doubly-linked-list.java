class Solution {
    public Node treeToDoublyList(Node root) {
        if(root==null)return null;
        Deque<Node> stack=new ArrayDeque<>();Node node=root,first=null,previous=null;
        while(node!=null || !stack.isEmpty()){
            while(node!=null){stack.push(node);node=node.left;}
            node=stack.pop();Node right=node.right;
            if(previous!=null){previous.right=node;node.left=previous;}else first=node;
            previous=node;node=right;
        }
        previous.right=first;first.left=previous;return first;
    }
}
