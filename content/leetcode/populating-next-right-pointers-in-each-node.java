class Solution {
    public Node connect(Node root) {
        Queue<Node> q=new ArrayDeque<>();if(root!=null)q.add(root);
        while(!q.isEmpty()) {
            Node previous=null;int size=q.size();
            for(int i=0;i<size;i++) {
                Node node=q.remove();if(previous!=null)previous.next=node;previous=node;
                if(node.left!=null)q.add(node.left);if(node.right!=null)q.add(node.right);
            }
            previous.next=null;
        }
        return root;
    }
}
