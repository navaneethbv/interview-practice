class Solution {
public int diameterOfBinaryTree(TreeNode root) {
    Map<TreeNode,Integer> height=new IdentityHashMap<>();height.put(null,0);List<TreeNode> order=new ArrayList<>();order.add(root);
    for(int i=0;i<order.size();i++) {TreeNode n=order.get(i);if(n.left!=null) order.add(n.left);if(n.right!=null) order.add(n.right);}
    int best=0;for(int i=order.size()-1;i>=0;i--) {TreeNode n=order.get(i);int l=height.get(n.left),r=height.get(n.right);best=Math.max(best,l+r);height.put(n,Math.max(l,r)+1);}return best;
}
}
