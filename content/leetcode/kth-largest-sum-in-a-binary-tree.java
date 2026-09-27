class Solution {
public long kthLargestLevelSum(TreeNode root,int k){Deque<TreeNode>q=new ArrayDeque<>();q.add(root);List<Long>sums=new ArrayList<>();while(!q.isEmpty()){long total=0;for(int size=q.size();size>0;size--){TreeNode n=q.remove();total+=n.val;if(n.left!=null)q.add(n.left);if(n.right!=null)q.add(n.right);}sums.add(total);}sums.sort(Collections.reverseOrder());return sums.size()<k?-1:sums.get(k-1);}
}
