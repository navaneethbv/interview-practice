class Solution {
public int uniquePathsWithObstacles(int[][] obstacleGrid) {int[] paths=new int[obstacleGrid[0].length];paths[0]=1;for(int[] row:obstacleGrid) for(int c=0;c<row.length;c++) {if(row[c]==1) paths[c]=0;else if(c>0) paths[c]+=paths[c-1];}return paths[paths.length-1];}
}
