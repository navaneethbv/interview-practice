class Solution {
    private boolean[][] reach(int[][] h, boolean pacific) {
        int m=h.length,n=h[0].length;
        boolean[][] seen=new boolean[m][n]; ArrayDeque<int[]> q=new ArrayDeque<>();
        for(int r=0;r<m;r++) {int c=pacific?0:n-1; seen[r][c]=true;q.add(new int[]{r,c});}
        for(int c=0;c<n;c++) {int r=pacific?0:m-1;if(!seen[r][c]) {seen[r][c]=true;q.add(new int[]{r,c});}}
        int[][] dirs={{1,0},{-1,0},{0,1},{0,-1}};
        while(!q.isEmpty()) {int[] x=q.remove();for(int[] d:dirs) {int r=x[0]+d[0],c=x[1]+d[1];if(r>=0&&r<m&&c>=0&&c<n&&!seen[r][c]&&h[r][c]>=h[x[0]][x[1]]) {seen[r][c]=true;q.add(new int[]{r,c});}}}
        return seen;
    }
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        boolean[][] p=reach(heights,true),a=reach(heights,false);List<List<Integer>> result=new ArrayList<>();
        for(int r=0;r<heights.length;r++) for(int c=0;c<heights[0].length;c++) if(p[r][c]&&a[r][c]) result.add(Arrays.asList(r,c));
        return result;
    }
}
