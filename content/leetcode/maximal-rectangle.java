class Solution {
public int maximalRectangle(char[][] matrix) {
    int[] heights=new int[matrix[0].length];int best=0;
    for(char[] row:matrix) {for(int c=0;c<row.length;c++) heights[c]=row[c]=='1'?heights[c]+1:0;
        Deque<int[]> stack=new ArrayDeque<>();for(int i=0;i<=heights.length;i++) {int h=i==heights.length?0:heights[i],start=i;while(!stack.isEmpty()&&stack.peek()[1]>h) {int[] p=stack.pop();start=p[0];best=Math.max(best,p[1]*(i-start));}stack.push(new int[]{start,h});}
    }return best;
}
}
