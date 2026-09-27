class Solution {
public void recoverTree(TreeNode root){Deque<TreeNode>stack=new ArrayDeque<>();TreeNode prev=null,first=null,second=null,node=root;while(node!=null||!stack.isEmpty()){while(node!=null){stack.push(node);node=node.left;}node=stack.pop();if(prev!=null&&prev.val>node.val){if(first==null)first=prev;second=node;}prev=node;node=node.right;}int t=first.val;first.val=second.val;second.val=t;}
}
