class Solution {
public TreeNode recoverFromPreorder(String traversal){List<TreeNode>stack=new ArrayList<>();int i=0;while(i<traversal.length()){int depth=0,value=0;while(i<traversal.length()&&traversal.charAt(i)=='-'){depth++;i++;}while(i<traversal.length()&&Character.isDigit(traversal.charAt(i)))value=value*10+traversal.charAt(i++)-'0';TreeNode n=new TreeNode(value);while(stack.size()>depth)stack.remove(stack.size()-1);if(!stack.isEmpty()){TreeNode p=stack.get(stack.size()-1);if(p.left==null)p.left=n;else p.right=n;}stack.add(n);}return stack.get(0);}
}
