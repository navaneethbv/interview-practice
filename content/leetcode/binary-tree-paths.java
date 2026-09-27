class Solution {
public List<String> binaryTreePaths(TreeNode root){List<String>out=new ArrayList<>();visit(root,"",out);return out;}private void visit(TreeNode n,String path,List<String>out){if(n==null)return;String next=path.isEmpty()?String.valueOf(n.val):path+"->"+n.val;if(n.left==null&&n.right==null)out.add(next);visit(n.left,next,out);visit(n.right,next,out);}
}
