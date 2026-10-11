class Excel {
    private final int[][] values;
    private final Map<Integer, List<Integer>> formulas = new HashMap<>();
    private final int width;

    public Excel(int height, char width) {
        this.width = width - 'A' + 1;
        values = new int[height + 1][this.width];
    }

    public void set(int row, char column, int val) {
        formulas.remove(key(row, column - 'A'));
        values[row][column - 'A'] = val;
    }

    public int get(int row, char column) {
        return value(key(row, column - 'A'));
    }

    public int sum(int row, char column, String[] numbers) {
        List<Integer> refs = new ArrayList<>();
        for (String item : numbers) {
            String[] parts = item.split(":");
            String first = parts[0];
            String last = parts.length > 1 ? parts[1] : first;
            int r1 = Integer.parseInt(first.substring(1));
            int r2 = Integer.parseInt(last.substring(1));
            for (int r = r1; r <= r2; r++) {
                for (int c = first.charAt(0) - 'A'; c <= last.charAt(0) - 'A'; c++) {
                    refs.add(key(r, c));
                }
            }
        }
        formulas.put(key(row, column - 'A'), refs);
        return get(row, column);
    }

    private int key(int row, int col) {
        return row * width + col;
    }

    private int value(int cell) {
        List<Integer> refs = formulas.get(cell);
        if (refs == null) {
            return values[cell / width][cell % width];
        }
        int total = 0;
        for (int ref : refs) {
            total += value(ref);
        }
        return total;
    }
}
