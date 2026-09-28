class Solution {
    public int leastBricks(List<List<Integer>> wall){
        Map<Long,Integer>count=new HashMap<>();
        int best=0;
        for (List<Integer>row:wall){
            long p=0;
            for (int i=0;i+1<row.size();i++){
                p+=row.get(i);
                int n=count.merge(p,1,Integer::sum);
                best=Math.max(best,n);
            }
        }
        return wall.size()-best;
    }
}
