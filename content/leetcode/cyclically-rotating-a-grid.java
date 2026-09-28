class Solution {
    public int[][] rotateGrid(int[][] grid, int k) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] result = new int[rows][columns];
        for (int layer = 0; layer < Math.min(rows, columns) / 2; layer++) {
            List<int[]> positions = layerPositions(rows, columns, layer);
            int shift = k % positions.size();
            for (int index = 0; index < positions.size(); index++) {
                int[] target = positions.get(index);
                int[] source = positions.get((index + shift) % positions.size());
                result[target[0]][target[1]] = grid[source[0]][source[1]];
            }
        }
        return result;
    }
    private List<int[]> layerPositions(int rows, int columns, int layer) {
        List<int[]> positions = new ArrayList<>();
        for (int column = layer; column < columns - layer; column++) {
            positions.add(new int[] {
                layer, column
            }
            );
        }
        for (int row = layer + 1; row < rows - layer; row++) {
            positions.add(new int[] {
                row, columns - layer - 1
            }
            );
        }
        for (int column = columns - layer - 2; column >= layer; column--) {
            positions.add(new int[] {
                rows - layer - 1, column
            }
            );
        }
        for (int row = rows - layer - 2; row > layer; row--) {
            positions.add(new int[] {
                row, layer
            }
            );
        }
        return positions;
    }
}
