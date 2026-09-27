class Solution {
public TreeNode inorderSuccessor(TreeNode root,TreeNode p){TreeNode next=null;while(root!=null){if(root.val>p.val){next=root;root=root.left;}else root=root.right;}return next;}
}
