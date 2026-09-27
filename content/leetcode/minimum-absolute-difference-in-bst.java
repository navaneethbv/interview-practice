class Solution {
public int getMinimumDifference(TreeNode root){Deque<TreeNode>stack=new ArrayDeque<>();Integer prev=null;int best=Integer.MAX_VALUE;while(root!=null||!stack.isEmpty()){while(root!=null){stack.push(root);root=root.left;}root=stack.pop();if(prev!=null)best=Math.min(best,root.val-prev);prev=root.val;root=root.right;}return best;}
}
