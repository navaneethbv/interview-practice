class Solution {
public int minCost(int[][] costs) {int[] best=new int[3];for(int[] row:costs) {int[] next=new int[3];for(int c=0;c<3;c++) next[c]=row[c]+Math.min(best[(c+1)%3],best[(c+2)%3]);best=next;}return Arrays.stream(best).min().getAsInt();}
}
