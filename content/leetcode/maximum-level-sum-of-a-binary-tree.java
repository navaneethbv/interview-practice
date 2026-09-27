class Solution {
public int maxLevelSum(TreeNode root) {Deque<TreeNode> q=new ArrayDeque<>();q.add(root);long best=Long.MIN_VALUE;int depth=0,answer=1;while(!q.isEmpty()) {int size=q.size();long total=0;depth++;for(int i=0;i<size;i++) {TreeNode n=q.remove();total+=n.val;if(n.left!=null) q.add(n.left);if(n.right!=null) q.add(n.right);}if(total>best) {best=total;answer=depth;}}return answer;}
}
