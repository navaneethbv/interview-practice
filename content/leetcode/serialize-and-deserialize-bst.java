class Codec {
    public String serialize(TreeNode root) {
        if(root==null) return "";StringBuilder result=new StringBuilder();Deque<TreeNode> stack=new ArrayDeque<>();stack.push(root);
        while(!stack.isEmpty()) {TreeNode node=stack.pop();if(result.length()>0) result.append(',');result.append(node.val);if(node.right!=null) stack.push(node.right);if(node.left!=null) stack.push(node.left);}return result.toString();
    }
    public TreeNode deserialize(String data) {
        if(data.isEmpty()) return null;String[] values=data.split(",");TreeNode root=new TreeNode(Integer.parseInt(values[0]));Deque<TreeNode> stack=new ArrayDeque<>();stack.push(root);
        for(int i=1;i<values.length;i++) {TreeNode node=new TreeNode(Integer.parseInt(values[i]));if(node.val<stack.peek().val) stack.peek().left=node;else {TreeNode parent=null;while(!stack.isEmpty()&&stack.peek().val<node.val) parent=stack.pop();parent.right=node;}stack.push(node);}return root;
    }
}
