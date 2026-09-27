class Solution {
    private int cameras;

    public int minCameraCover(TreeNode root) {
        cameras = 0;
        if (state(root) == 0) {
            cameras++;
        }
        return cameras;
    }

    private int state(TreeNode node) {
        if (node == null) {
            return 1;
        }
        int leftState = state(node.left);
        int rightState = state(node.right);
        if (leftState == 0 || rightState == 0) {
            cameras++;
            return 2;
        }
        return leftState == 2 || rightState == 2 ? 1 : 0;
    }
}
