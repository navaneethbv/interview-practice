class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length);
    }

    private TreeNode build(int[] nums, int left, int right) {
        if (left >= right) {
            return null;
        }
        int middle = left + (right - left) / 2;
        TreeNode leftSubtree = build(nums, left, middle);
        TreeNode rightSubtree = build(nums, middle + 1, right);
        return new TreeNode(nums[middle], leftSubtree, rightSubtree);
    }
}
