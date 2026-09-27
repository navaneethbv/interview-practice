class Solution {
public int rob(TreeNode root){int[]r=go(root);return Math.max(r[0],r[1]);}private int[]go(TreeNode n){if(n==null)return new int[]{0,0};int[]a=go(n.left),b=go(n.right);return new int[]{n.val+a[1]+b[1],Math.max(a[0],a[1])+Math.max(b[0],b[1])};}
}
