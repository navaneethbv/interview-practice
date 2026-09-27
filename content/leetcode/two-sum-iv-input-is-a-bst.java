class Solution {
public boolean findTarget(TreeNode root,int k) {Set<Integer> seen=new HashSet<>();Deque<TreeNode> stack=new ArrayDeque<>();stack.push(root);while(!stack.isEmpty()) {TreeNode n=stack.pop();if(seen.contains(k-n.val)) return true;seen.add(n.val);if(n.left!=null) stack.push(n.left);if(n.right!=null) stack.push(n.right);}return false;}
}
