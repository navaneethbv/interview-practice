class Solution {
    public int twoCitySchedCost(int[][] costs){
        Arrays.sort(costs,Comparator.comparingInt(p->p[0]-p[1]));
        int out=0;
        for (int i=0;i<costs.length;i++) {
            out+=costs[i][i<costs.length/2?0:1];
        }
        return out;
    }
}
