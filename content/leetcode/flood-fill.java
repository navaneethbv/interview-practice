class Solution {
public int[][] floodFill(int[][] image,int sr,int sc,int color){int old=image[sr][sc];if(old==color)return image;Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{sr,sc});image[sr][sc]=color;int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<image.length&&b>=0&&b<image[0].length&&image[a][b]==old){image[a][b]=color;q.add(new int[]{a,b});}}}return image;}
}
