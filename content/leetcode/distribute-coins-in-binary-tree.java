class Solution {
private int moves;public int distributeCoins(TreeNode root){moves=0;balance(root);return moves;}private int balance(TreeNode n){if(n==null)return 0;int a=balance(n.left),b=balance(n.right);moves+=Math.abs(a)+Math.abs(b);return n.val+a+b-1;}
}
