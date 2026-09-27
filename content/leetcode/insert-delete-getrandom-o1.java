class RandomizedSet {
    List<Integer> values=new ArrayList<>(); Map<Integer,Integer> index=new HashMap<>(); Random random=new Random(0);
    public RandomizedSet() {}
    public boolean insert(int val) { if(index.containsKey(val))return false;index.put(val,values.size());values.add(val);return true; }
    public boolean remove(int val) { Integer i=index.remove(val);if(i==null)return false;int last=values.remove(values.size()-1);if(i<values.size()){values.set(i,last);index.put(last,i);}return true; }
    public int getRandom() { return values.get(random.nextInt(values.size())); }
}
