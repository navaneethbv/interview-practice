class Solution {
public int rangeSumBST(TreeNode root,int low,int high){if(root==null)return 0;return (root.val>=low&&root.val<=high?root.val:0)+(root.val>low?rangeSumBST(root.left,low,high):0)+(root.val<high?rangeSumBST(root.right,low,high):0);}
}
