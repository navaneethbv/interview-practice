class Solution {
public int closestValue(TreeNode root,double target) {int best=root.val;while(root!=null) {double d=Math.abs(root.val-target),old=Math.abs(best-target);if(d<old||d==old&&root.val<best) best=root.val;root=target<root.val?root.left:root.right;}return best;}
}
