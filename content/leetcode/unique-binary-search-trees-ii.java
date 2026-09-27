class Solution {
    public List<TreeNode> generateTrees(int n){return build(1,n);}
    private List<TreeNode> build(int lo,int hi){List<TreeNode> out=new ArrayList<>();if(lo>hi){out.add(null);return out;}for(int v=lo;v<=hi;v++)for(TreeNode l:build(lo,v-1))for(TreeNode r:build(v+1,hi)){TreeNode root=new TreeNode(v);root.left=l;root.right=r;out.add(root);}return out;}
}
