class Solution {
    public int numIslands(char[][] grid) {
        int m=grid.length,n=grid[0].length,count=0;boolean[][] seen=new boolean[m][n];int[][] ds={{1,0},{-1,0},{0,1},{0,-1}};
        for(int r=0;r<m;r++) for(int c=0;c<n;c++) if(grid[r][c]=='1'&&!seen[r][c]) {
            count++;ArrayDeque<int[]> q=new ArrayDeque<>();q.add(new int[]{r,c});seen[r][c]=true;
            while(!q.isEmpty()) {int[] p=q.remove();for(int[] d:ds) {int x=p[0]+d[0],y=p[1]+d[1];if(x>=0&&x<m&&y>=0&&y<n&&!seen[x][y]&&grid[x][y]=='1') {seen[x][y]=true;q.add(new int[]{x,y});}}}
        }
        return count;
    }
}
