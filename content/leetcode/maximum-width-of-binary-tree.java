class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        List<TreeNode> nodes = new ArrayList<>();
        List<Long> positions = new ArrayList<>();
        nodes.add(root);
        positions.add(0L);
        long widest = 0;
        while (!nodes.isEmpty()) {
            long offset = positions.get(0);
            long lastPosition = positions.get(positions.size() - 1) - offset;
            widest = Math.max(widest, lastPosition + 1);
            List<TreeNode> nextNodes = new ArrayList<>();
            List<Long> nextPositions = new ArrayList<>();
            for (int index = 0; index < nodes.size(); index++) {
                TreeNode node = nodes.get(index);
                long normalized = positions.get(index) - offset;
                if (node.left != null) {
                    nextNodes.add(node.left);
                    nextPositions.add(normalized * 2);
                }
                if (node.right != null) {
                    nextNodes.add(node.right);
                    nextPositions.add(normalized * 2 + 1);
                }
            }
            nodes = nextNodes;
            positions = nextPositions;
        }
        return (int) widest;
    }
}
