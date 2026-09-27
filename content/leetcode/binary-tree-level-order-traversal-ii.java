class Solution {
public List<List<Integer>> levelOrderBottom(TreeNode root){LinkedList<List<Integer>>out=new LinkedList<>();if(root==null)return out;Deque<TreeNode>q=new ArrayDeque<>();q.add(root);while(!q.isEmpty()){List<Integer>row=new ArrayList<>();for(int size=q.size();size>0;size--){TreeNode n=q.remove();row.add(n.val);if(n.left!=null)q.add(n.left);if(n.right!=null)q.add(n.right);}out.addFirst(row);}return out;}
}
