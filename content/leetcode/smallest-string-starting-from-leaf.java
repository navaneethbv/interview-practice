class Solution {
    String best;
    public String smallestFromLeaf(TreeNode root){
        best=null;
        visit(root,"");
        return best;
    }
    void visit(TreeNode n,String s){
        if (n==null) {
            return;
        }
        s=(char)(97+n.val)+s;
        if (n.left==null&&n.right==null&&(best==null||s.compareTo(best)<0)) {
            best=s;
        }
        visit(n.left,s);
        visit(n.right,s);
    }
}
