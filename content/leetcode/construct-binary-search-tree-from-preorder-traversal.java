class Solution {
public TreeNode bstFromPreorder(int[] preorder){TreeNode root=new TreeNode(preorder[0]);Deque<TreeNode> stack=new ArrayDeque<>();stack.push(root);for(int i=1;i<preorder.length;i++){TreeNode node=new TreeNode(preorder[i]);if(node.val<stack.peek().val)stack.peek().left=node;else{TreeNode parent=null;while(!stack.isEmpty()&&stack.peek().val<node.val)parent=stack.pop();parent.right=node;}stack.push(node);}return root;}
}
