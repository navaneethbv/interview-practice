class Solution {
public TreeNode lowestCommonAncestor(TreeNode root,TreeNode p,TreeNode q){Map<TreeNode,TreeNode>parents=new HashMap<>();parents.put(root,null);Deque<TreeNode>stack=new ArrayDeque<>();stack.push(root);while(!parents.containsKey(p)||!parents.containsKey(q)){TreeNode v=stack.pop();if(v.left!=null){parents.put(v.left,v);stack.push(v.left);}if(v.right!=null){parents.put(v.right,v);stack.push(v.right);}}Set<TreeNode>seen=new HashSet<>();while(p!=null){seen.add(p);p=parents.get(p);}while(!seen.contains(q))q=parents.get(q);return q;}
}
