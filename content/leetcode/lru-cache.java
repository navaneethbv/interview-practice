class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer,Integer> cache=new LinkedHashMap<>(16,0.75f,true);
    public LRUCache(int capacity) {this.capacity=capacity;}
    public int get(int key) {return cache.getOrDefault(key,-1);}
    public void put(int key,int value) {cache.put(key,value);if(cache.size()>capacity) {Integer oldest=cache.keySet().iterator().next();cache.remove(oldest);}}
}
