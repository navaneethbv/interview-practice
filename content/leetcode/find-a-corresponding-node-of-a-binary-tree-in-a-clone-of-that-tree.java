class Solution {
    public TreeNode getTargetCopy(TreeNode original,TreeNode cloned,TreeNode target){
        Deque<TreeNode[]> stack=new ArrayDeque<>();stack.push(new TreeNode[]{original,cloned});
        while(!stack.isEmpty()){TreeNode[] pair=stack.pop();TreeNode a=pair[0],b=pair[1];if(a==target)return b;if(a.left!=null)stack.push(new TreeNode[]{a.left,b.left});if(a.right!=null)stack.push(new TreeNode[]{a.right,b.right});}
        return null;
    }
}
