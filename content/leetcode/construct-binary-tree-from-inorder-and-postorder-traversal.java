class Solution {
public TreeNode buildTree(int[] inorder,int[] postorder) {TreeNode root=new TreeNode(postorder[postorder.length-1]);Deque<TreeNode> stack=new ArrayDeque<>();stack.push(root);int i=inorder.length-1;for(int p=postorder.length-2;p>=0;p--) {TreeNode node=new TreeNode(postorder[p]);if(stack.peek().val!=inorder[i]) stack.peek().right=node;else {TreeNode parent=null;while(!stack.isEmpty()&&stack.peek().val==inorder[i]) {parent=stack.pop();i--;}parent.left=node;}stack.push(node);}return root;}
}
