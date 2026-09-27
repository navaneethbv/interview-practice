class BSTIterator {
    private final Deque<TreeNode> stack=new ArrayDeque<>();
    public BSTIterator(TreeNode root) {push(root);}
    private void push(TreeNode node) {while(node!=null) {stack.push(node);node=node.left;}}
    public int next() {TreeNode node=stack.pop();push(node.right);return node.val;}
    public boolean hasNext() {return !stack.isEmpty();}
}
