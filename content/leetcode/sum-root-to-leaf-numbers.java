class Solution {
private int sum(TreeNode n,int value) {if(n==null) return 0;value=value*10+n.val;if(n.left==null&&n.right==null) return value;return sum(n.left,value)+sum(n.right,value);}public int sumNumbers(TreeNode root) {return sum(root,0);}
}
