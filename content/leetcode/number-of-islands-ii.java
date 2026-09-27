class Solution {
    private int find(Map<Integer, Integer> parent, int cell) {
        int root = cell;
        while (parent.get(root) != root) {
            root = parent.get(root);
        }
        while (parent.get(cell) != cell) {
            int next = parent.get(cell);
            parent.put(cell, root);
            cell = next;
        }
        return root;
    }

    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        Map<Integer, Integer> parent = new HashMap<>();
        Map<Integer, Integer> componentSize = new HashMap<>();
        List<Integer> result = new ArrayList<>();
        int islandCount = 0;
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int[] position : positions) {
            int row = position[0];
            int column = position[1];
            int cell = row * n + column;
            if (!parent.containsKey(cell)) {
                addLand(parent, componentSize, cell);
                islandCount++;
                islandCount -= mergeNeighbors(parent, componentSize, row, column, cell, m, n, directions);
            }
            result.add(islandCount);
        }
        return result;
    }

    private void addLand(Map<Integer, Integer> parent, Map<Integer, Integer> componentSize, int cell) {
        parent.put(cell, cell);
        componentSize.put(cell, 1);
    }

    private int mergeNeighbors(Map<Integer, Integer> parent, Map<Integer, Integer> componentSize,
            int row, int column, int cell, int rows, int columns, int[][] directions) {
        int merges = 0;
        for (int[] direction : directions) {
            int neighborRow = row + direction[0];
            int neighborColumn = column + direction[1];
            if (!isValid(neighborRow, neighborColumn, rows, columns)) {
                continue;
            }
            int neighbor = neighborRow * columns + neighborColumn;
            if (parent.containsKey(neighbor) && union(parent, componentSize, cell, neighbor)) {
                merges++;
            }
        }
        return merges;
    }

    private boolean isValid(int row, int column, int rows, int columns) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }

    private boolean union(Map<Integer, Integer> parent, Map<Integer, Integer> componentSize,
            int first, int second) {
        int firstRoot = find(parent, first);
        int secondRoot = find(parent, second);
        if (firstRoot == secondRoot) {
            return false;
        }
        if (componentSize.get(firstRoot) > componentSize.get(secondRoot)) {
            int temporary = firstRoot;
            firstRoot = secondRoot;
            secondRoot = temporary;
        }
        parent.put(firstRoot, secondRoot);
        componentSize.put(secondRoot, componentSize.get(secondRoot) + componentSize.get(firstRoot));
        return true;
    }
}
