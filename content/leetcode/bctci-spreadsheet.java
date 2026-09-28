class Spreadsheet {
    private int[][] cells;

    public Spreadsheet(int rows, int cols) {
        cells = new int[rows][cols];
    }

    public void set(int row, int col, int value) {
        cells[row][col] = value;
    }

    public int get(int row, int col) {
        return cells[row][col];
    }

    public void sortColumnsByRow(int row) {
        int cols = cells[row].length;
        Integer[] order = new Integer[cols];
        for (int col = 0; col < cols; col++) {
            order[col] = col;
        }
        int[] key = cells[row];
        Arrays.sort(order, Comparator.comparingInt(col -> key[col]));
        int[][] next = new int[cells.length][cols];
        for (int r = 0; r < cells.length; r++) {
            for (int col = 0; col < cols; col++) {
                next[r][col] = cells[r][order[col]];
            }
        }
        cells = next;
    }

    public void sortRowsByColumn(int col) {
        Arrays.sort(cells, Comparator.comparingInt(line -> line[col]));
    }
}
