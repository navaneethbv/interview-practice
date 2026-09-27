class Solution {
public TreeNode balanceBST(TreeNode root){List<Integer> a=new ArrayList<>();ArrayDeque<TreeNode> st=new ArrayDeque<>();TreeNode n=root;while(n!=null||!st.isEmpty()){while(n!=null){st.push(n);n=n.left;}n=st.pop();a.add(n.val);n=n.right;}return build(a,0,a.size());}TreeNode build(List<Integer>a,int l,int r){if(l>=r)return null;int m=(l+r)/2;TreeNode n=new TreeNode(a.get(m));n.left=build(a,l,m);n.right=build(a,m+1,r);return n;}
}
