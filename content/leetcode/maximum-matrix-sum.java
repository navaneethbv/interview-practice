class Solution {
public long maxMatrixSum(int[][] matrix) {long total=0;int negatives=0,minimum=Integer.MAX_VALUE;for(int[] row:matrix) for(int value:row) {total+=Math.abs(value);minimum=Math.min(minimum,Math.abs(value));if(value<0) negatives++;}return total-(negatives%2==1?2L*minimum:0);}
}
