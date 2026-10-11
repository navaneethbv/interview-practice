class Spreadsheet {
    private final Map<String, Integer> cells = new HashMap<>();

    public Spreadsheet(int rows) {
    }

    public void setCell(String cell, int value) {
        cells.put(cell, value);
    }

    public void resetCell(String cell) {
        cells.remove(cell);
    }

    public int getValue(String formula) {
        int total = 0;
        for (String term : formula.substring(1).split("\\+")) {
            total += Character.isDigit(term.charAt(0)) ? Integer.parseInt(term) : cells.getOrDefault(term, 0);
        }
        return total;
    }
}
