class Solution {
public int largestSubmatrix(int[][] matrix){int[]heights=new int[matrix[0].length];int best=0;for(int[]row:matrix){for(int c=0;c<row.length;c++)heights[c]=row[c]==1?heights[c]+1:0;int[]sorted=heights.clone();Arrays.sort(sorted);for(int i=0;i<sorted.length;i++)best=Math.max(best,sorted[i]*(sorted.length-i));}return best;}
}
