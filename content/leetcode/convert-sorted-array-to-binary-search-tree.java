class Solution {
    public TreeNode sortedArrayToBST(int[] nums) { return build(nums,0,nums.length); }
    private TreeNode build(int[] a,int lo,int hi) {
        if(lo>=hi)return null;
        int mid=lo+(hi-lo)/2;
        return new TreeNode(a[mid],build(a,lo,mid),build(a,mid+1,hi));
    }
}
