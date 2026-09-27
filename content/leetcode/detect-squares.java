class DetectSquares {
    private final Map<Integer,Integer> points = new HashMap<>();
    public DetectSquares() {}
    private int key(int x,int y){return x*1001+y;}
    public void add(int[] point){points.merge(key(point[0],point[1]),1,Integer::sum);}
    public int count(int[] point){
        int x=point[0],y=point[1],answer=0;
        for(Map.Entry<Integer,Integer> entry:points.entrySet()){
            int a=entry.getKey()/1001,b=entry.getKey()%1001;
            if(a!=x&&Math.abs(a-x)==Math.abs(b-y))
                answer+=entry.getValue()*points.getOrDefault(key(a,y),0)*points.getOrDefault(key(x,b),0);
        }
        return answer;
    }
}
