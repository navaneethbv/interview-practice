class Solution {
public boolean isBalanced(TreeNode root) {
    if(root==null) return true;Map<TreeNode,Integer> height=new IdentityHashMap<>();height.put(null,0);List<TreeNode> order=new ArrayList<>();order.add(root);
    for(int i=0;i<order.size();i++) {TreeNode n=order.get(i);if(n.left!=null) order.add(n.left);if(n.right!=null) order.add(n.right);}
    for(int i=order.size()-1;i>=0;i--) {TreeNode n=order.get(i);int l=height.get(n.left),r=height.get(n.right);if(Math.abs(l-r)>1) return false;height.put(n,Math.max(l,r)+1);}return true;
}
}
