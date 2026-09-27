class FileSystem {
    private final Map<String,Integer> values=new HashMap<>();
    public FileSystem() {}
    public boolean createPath(String path, int value) {
        String parent = path.substring(0, path.lastIndexOf('/'));
        boolean parentMissing = !parent.isEmpty() && !values.containsKey(parent);
        if (values.containsKey(path) || parentMissing) {
            return false;
        }
        values.put(path, value);
        return true;
    }

    public int get(String path) {
        return values.getOrDefault(path, -1);
    }
}
