class Solution {
    private static class Position {
        final TreeNode node;
        final int row;
        final int column;

        Position(TreeNode node, int row, int column) {
            this.node = node;
            this.row = row;
            this.column = column;
        }
    }

    public List<List<Integer>> verticalTraversal(TreeNode root) {
        List<int[]> positions = collectPositions(root);
        positions.sort(Comparator.comparingInt((int[] position) -> position[0])
                .thenComparingInt(position -> position[1])
                .thenComparingInt(position -> position[2]));
        List<List<Integer>> columns = new ArrayList<>();
        Integer previousColumn = null;
        for (int[] position : positions) {
            if (previousColumn == null || position[0] != previousColumn) {
                columns.add(new ArrayList<>());
                previousColumn = position[0];
            }
            columns.get(columns.size() - 1).add(position[2]);
        }
        return columns;
    }

    private List<int[]> collectPositions(TreeNode root) {
        List<int[]> positions = new ArrayList<>();
        Deque<Position> stack = new ArrayDeque<>();
        stack.push(new Position(root, 0, 0));
        while (!stack.isEmpty()) {
            Position current = stack.pop();
            positions.add(new int[]{current.column, current.row, current.node.val});
            if (current.node.left != null) {
                stack.push(new Position(current.node.left, current.row + 1, current.column - 1));
            }
            if (current.node.right != null) {
                stack.push(new Position(current.node.right, current.row + 1, current.column + 1));
            }
        }
        return positions;
    }
}
