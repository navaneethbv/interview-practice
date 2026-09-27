class Solution {
public TreeNode subtreeWithAllDeepest(TreeNode root){return visit(root).node;}private static class R{int depth;TreeNode node;R(int d,TreeNode n){depth=d;node=n;}}private R visit(TreeNode n){if(n==null)return new R(0,null);R a=visit(n.left),b=visit(n.right);return new R(Math.max(a.depth,b.depth)+1,a.depth==b.depth?n:a.depth>b.depth?a.node:b.node);}
}
