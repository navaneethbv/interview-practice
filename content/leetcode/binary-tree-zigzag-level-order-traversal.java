class Solution {
public List<List<Integer>> zigzagLevelOrder(TreeNode root){List<List<Integer>>out=new ArrayList<>();if(root==null)return out;Deque<TreeNode>q=new ArrayDeque<>();q.add(root);while(!q.isEmpty()){List<Integer>row=new ArrayList<>();for(int k=q.size();k>0;k--){TreeNode v=q.remove();row.add(v.val);if(v.left!=null)q.add(v.left);if(v.right!=null)q.add(v.right);}if(out.size()%2==1)Collections.reverse(row);out.add(row);}return out;}
}
