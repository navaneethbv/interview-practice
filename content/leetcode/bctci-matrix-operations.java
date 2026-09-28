class Matrix {
    private final int[][] grid;

    public Matrix(int[][] grid) {
        this.grid = new int[grid.length][];
        for (int r = 0; r < grid.length; r++) {
            this.grid[r] = grid[r].clone();
        }
    }

    public void transpose() {
        for (int r = 0; r < grid.length; r++) {
            for (int c = r + 1; c < grid.length; c++) {
                int temp = grid[r][c];
                grid[r][c] = grid[c][r];
                grid[c][r] = temp;
            }
        }
    }

    public void rotateClockwise() {
        transpose();
        reflectVertically();
    }

    public void rotateAnticlockwise() {
        transpose();
        reflectHorizontally();
    }

    public void reflectHorizontally() {
        for (int top = 0, bottom = grid.length - 1; top < bottom; top++, bottom--) {
            int[] temp = grid[top];
            grid[top] = grid[bottom];
            grid[bottom] = temp;
        }
    }

    public void reflectVertically() {
        for (int[] row : grid) {
            for (int left = 0, right = row.length - 1; left < right; left++, right--) {
                int temp = row[left];
                row[left] = row[right];
                row[right] = temp;
            }
        }
    }

    public int[][] getGrid() {
        int[][] copy = new int[grid.length][];
        for (int r = 0; r < grid.length; r++) {
            copy[r] = grid[r].clone();
        }
        return copy;
    }
}
