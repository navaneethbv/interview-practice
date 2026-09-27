class Solution {
public int goodNodes(TreeNode root) {
    Deque<TreeNode> nodes=new ArrayDeque<>();Deque<Integer> maxima=new ArrayDeque<>();nodes.push(root);maxima.push(root.val);int count=0;
    while(!nodes.isEmpty()) {TreeNode node=nodes.pop();int maximum=maxima.pop();if(node.val>=maximum) count++;maximum=Math.max(maximum,node.val);
        if(node.left!=null) {nodes.push(node.left);maxima.push(maximum);}if(node.right!=null) {nodes.push(node.right);maxima.push(maximum);}}
    return count;
}
}
