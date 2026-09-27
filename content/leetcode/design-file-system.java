class FileSystem {
    private final Map<String,Integer> values=new HashMap<>();
    public FileSystem() {}
    public boolean createPath(String path,int value) {String parent=path.substring(0,path.lastIndexOf('/'));if(values.containsKey(path)||!parent.isEmpty()&&!values.containsKey(parent)) return false;values.put(path,value);return true;}
    public int get(String path) {return values.getOrDefault(path,-1);}
}
