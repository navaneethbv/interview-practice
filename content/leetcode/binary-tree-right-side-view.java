class Solution {
public List<Integer> rightSideView(TreeNode root) {
    List<Integer> result=new ArrayList<>();if(root==null) return result;ArrayDeque<TreeNode> queue=new ArrayDeque<>();queue.add(root);
    while(!queue.isEmpty()) {int size=queue.size();for(int i=0;i<size;i++) {TreeNode node=queue.remove();if(i==size-1) result.add(node.val);if(node.left!=null) queue.add(node.left);if(node.right!=null) queue.add(node.right);}}
    return result;
}
}
