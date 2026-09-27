class Solution {
    public int longestConsecutive(TreeNode root){
        if(root==null)return 0;List<TreeNode> order=new ArrayList<>();order.add(root);for(int i=0;i<order.size();i++){TreeNode n=order.get(i);if(n.left!=null)order.add(n.left);if(n.right!=null)order.add(n.right);}
        Map<TreeNode,int[]> lengths=new IdentityHashMap<>();int best=0;
        for(int i=order.size()-1;i>=0;i--){TreeNode n=order.get(i);int inc=1,dec=1;for(TreeNode child:new TreeNode[]{n.left,n.right})if(child!=null){int[] pair=lengths.get(child);if((long)child.val==(long)n.val+1)inc=Math.max(inc,pair[0]+1);if((long)child.val==(long)n.val-1)dec=Math.max(dec,pair[1]+1);}lengths.put(n,new int[]{inc,dec});best=Math.max(best,inc+dec-1);}return best;
    }
}
