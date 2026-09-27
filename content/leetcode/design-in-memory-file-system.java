class FileSystem {
    private Set<String> directories = new HashSet<>(Arrays.asList("/"));
    private Map<String, String> files = new HashMap<>();

    public FileSystem() {
    }

    public List<String> ls(String path) {
        if (files.containsKey(path)) {
            return Arrays.asList(path.substring(path.lastIndexOf('/') + 1));
        }
        String prefix = path.equals("/") ? "/" : path + "/";
        TreeSet<String> names = new TreeSet<>();
        Set<String> allPaths = new HashSet<>(directories);
        allPaths.addAll(files.keySet());
        for (String childPath : allPaths) {
            if (childPath.equals(path) || !childPath.startsWith(prefix)) {
                continue;
            }
            String relativePath = childPath.substring(prefix.length());
            if (!relativePath.contains("/")) {
                names.add(relativePath);
            }
        }
        return new ArrayList<>(names);
    }

    public void mkdir(String path) {
        String currentPath = "";
        for (String part : path.substring(1).split("/")) {
            currentPath += "/" + part;
            directories.add(currentPath);
        }
    }

    public void addContentToFile(String filePath, String content) {
        files.merge(filePath, content, String::concat);
    }

    public String readContentFromFile(String filePath) {
        return files.get(filePath);
    }
}
