class Solution {
public List<List<Integer>> verticalOrder(TreeNode root) {
    TreeMap<Integer,List<Integer>> cols=new TreeMap<>();if(root==null) return new ArrayList<>();Deque<TreeNode> nodes=new ArrayDeque<>();Deque<Integer> positions=new ArrayDeque<>();nodes.add(root);positions.add(0);
    while(!nodes.isEmpty()) {TreeNode n=nodes.remove();int c=positions.remove();cols.computeIfAbsent(c,k->new ArrayList<>()).add(n.val);if(n.left!=null) {nodes.add(n.left);positions.add(c-1);}if(n.right!=null) {nodes.add(n.right);positions.add(c+1);}}
    return new ArrayList<>(cols.values());
}
}
