class Solution {
public List<List<Integer>> pathSum(TreeNode root,int targetSum){List<List<Integer>>out=new ArrayList<>();go(root,targetSum,new ArrayList<>(),out);return out;}private void go(TreeNode n,int target,List<Integer>p,List<List<Integer>>out){if(n==null)return;p.add(n.val);if(n.left==null&&n.right==null&&target==n.val)out.add(new ArrayList<>(p));go(n.left,target-n.val,p,out);go(n.right,target-n.val,p,out);p.remove(p.size()-1);}
}
