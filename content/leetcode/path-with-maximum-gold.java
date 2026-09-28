class Solution {
    public int getMaximumGold(int[][] grid){
        int best=0;
        for (int r=0;r<grid.length;r++) {
            for (int c=0;c<grid[0].length;c++) {
                if (grid[r][c]>0) {
                    best=Math.max(best,visit(grid,r,c));
                }
            }
        }
        return best;
    }
    private int visit(int[][]g,int r,int c){
        int value=g[r][c],best=0;
        g[r][c]=0;
        int[]ds={
            -1,0,1,0,-1
        }
        ;
        for (int d=0;d<4;d++){
            int a=r+ds[d],b=c+ds[d+1];
            if (a>=0&&a<g.length&&b>=0&&b<g[0].length&&g[a][b]>0) {
                best=Math.max(best,visit(g,a,b));
            }
        }
        g[r][c]=value;
        return value+best;
    }
}
