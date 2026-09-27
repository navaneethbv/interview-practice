class Solution {
    public int longestConsecutive(TreeNode root){if(root==null)return 0;Deque<TreeNode> nodes=new ArrayDeque<>();Deque<Integer> lengths=new ArrayDeque<>();nodes.push(root);lengths.push(1);int best=0;while(!nodes.isEmpty()){TreeNode node=nodes.pop();int len=lengths.pop();best=Math.max(best,len);for(TreeNode child:new TreeNode[]{node.left,node.right})if(child!=null){nodes.push(child);lengths.push((long)child.val==(long)node.val+1?len+1:1);}}return best;}
}
