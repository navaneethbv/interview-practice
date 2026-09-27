class Solution {
int cameras=0;int visit(TreeNode n){if(n==null)return 1;int a=visit(n.left),b=visit(n.right);if(a==0||b==0){cameras++;return 2;}return a==2||b==2?1:0;}public int minCameraCover(TreeNode root){cameras=0;if(visit(root)==0)cameras++;return cameras;}
}
