class Solution {
private void relax(int[][] grid,long[][] distance) {for(int r=0;r<grid.length;r++) for(int c=0;c<grid[0].length;c++) {if(r>0) distance[r][c]=Math.min(distance[r][c],distance[r-1][c]+grid[r][c]);if(c>0) distance[r][c]=Math.min(distance[r][c],distance[r][c-1]+grid[r][c]);}}
public int minCost(int[][] grid,int k) {
    int rows=grid.length,cols=grid[0].length;long infinity=Long.MAX_VALUE/4;long[][] distance=new long[rows][cols];for(long[] row:distance) Arrays.fill(row,infinity);distance[0][0]=0;relax(grid,distance);
    for(int iteration=0;iteration<k;iteration++) {TreeMap<Integer,Long> best=new TreeMap<>(Comparator.reverseOrder());for(int r=0;r<rows;r++) for(int c=0;c<cols;c++) best.merge(grid[r][c],distance[r][c],Math::min);long running=infinity;for(Map.Entry<Integer,Long> entry:best.entrySet()) {running=Math.min(running,entry.getValue());entry.setValue(running);}long[][] next=new long[rows][cols];for(int r=0;r<rows;r++) for(int c=0;c<cols;c++) next[r][c]=best.get(grid[r][c]);relax(grid,next);distance=next;}
    return (int)distance[rows-1][cols-1];
}
}
