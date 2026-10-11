class SQL {
    private final Map<String, Map<Integer, String[]>> tables = new HashMap<>();
    private final Map<String, Integer> nextId = new HashMap<>();

    public SQL(String[] names, int[] columns) {
        for (String name : names) {
            tables.put(name, new HashMap<>());
            nextId.put(name, 1);
        }
    }

    public void insertRow(String name, String[] row) {
        int id = nextId.get(name);
        tables.get(name).put(id, row.clone());
        nextId.put(name, id + 1);
    }

    public void deleteRow(String name, int rowId) {
        tables.get(name).remove(rowId);
    }

    public String selectCell(String name, int rowId, int columnId) {
        return tables.get(name).get(rowId)[columnId - 1];
    }
}
