class Solution {
public int maxProduct(TreeNode root) {List<TreeNode> order=new ArrayList<>();order.add(root);for(int i=0;i<order.size();i++) {TreeNode n=order.get(i);if(n.left!=null) order.add(n.left);if(n.right!=null) order.add(n.right);}Map<TreeNode,Long> sums=new IdentityHashMap<>();sums.put(null,0L);for(int i=order.size()-1;i>=0;i--) {TreeNode n=order.get(i);sums.put(n,(long)n.val+sums.get(n.left)+sums.get(n.right));}long total=sums.get(root),best=0;for(int i=1;i<order.size();i++) {long sum=sums.get(order.get(i));best=Math.max(best,sum*(total-sum));}return (int)(best%1000000007);}
}
