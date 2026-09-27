class Solution {
Set<Integer> deleted;List<TreeNode> out;public List<TreeNode> delNodes(TreeNode root,int[] to_delete){deleted=new HashSet<>();for(int x:to_delete)deleted.add(x);out=new ArrayList<>();visit(root,true);return out;}TreeNode visit(TreeNode n,boolean top){if(n==null)return null;boolean remove=deleted.contains(n.val);if(top&&!remove)out.add(n);n.left=visit(n.left,remove);n.right=visit(n.right,remove);return remove?null:n;}
}
