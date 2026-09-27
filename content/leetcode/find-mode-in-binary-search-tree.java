class Solution {
public int[] findMode(TreeNode root){Deque<TreeNode>stack=new ArrayDeque<>();Integer prev=null;int run=0,best=0;List<Integer>out=new ArrayList<>();while(root!=null||!stack.isEmpty()){while(root!=null){stack.push(root);root=root.left;}root=stack.pop();run=prev!=null&&root.val==prev?run+1:1;prev=root.val;if(run>best){best=run;out.clear();out.add(root.val);}else if(run==best)out.add(root.val);root=root.right;}return out.stream().mapToInt(Integer::intValue).toArray();}
}
