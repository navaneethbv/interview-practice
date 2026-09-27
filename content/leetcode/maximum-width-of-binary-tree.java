class Solution {
public int widthOfBinaryTree(TreeNode root){List<TreeNode>nodes=new ArrayList<>();List<Long>pos=new ArrayList<>();nodes.add(root);pos.add(0L);long best=0;while(!nodes.isEmpty()){long offset=pos.get(0);best=Math.max(best,pos.get(pos.size()-1)-offset+1);List<TreeNode>next=new ArrayList<>();List<Long>indices=new ArrayList<>();for(int i=0;i<nodes.size();i++){TreeNode v=nodes.get(i);long p=pos.get(i)-offset;if(v.left!=null){next.add(v.left);indices.add(2*p);}if(v.right!=null){next.add(v.right);indices.add(2*p+1);}}nodes=next;pos=indices;}return (int)best;}
}
