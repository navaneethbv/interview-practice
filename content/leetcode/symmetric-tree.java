class Solution {
public boolean isSymmetric(TreeNode root){Deque<TreeNode[]>q=new ArrayDeque<>();q.add(new TreeNode[]{root.left,root.right});while(!q.isEmpty()){TreeNode[]p=q.remove();TreeNode a=p[0],b=p[1];if(a==null||b==null){if(a!=b)return false;continue;}if(a.val!=b.val)return false;q.add(new TreeNode[]{a.left,b.right});q.add(new TreeNode[]{a.right,b.left});}return true;}
}
