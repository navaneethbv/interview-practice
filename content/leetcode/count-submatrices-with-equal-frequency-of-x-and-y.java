class Solution {
public int numberOfSubmatrices(char[][] grid){int n=grid[0].length,ans=0;int[] xs=new int[n],ys=new int[n];for(char[] row:grid){int x=0,y=0;for(int j=0;j<n;j++){if(row[j]=='X')x++;if(row[j]=='Y')y++;xs[j]+=x;ys[j]+=y;if(xs[j]>0&&xs[j]==ys[j])ans++;}}return ans;}
}
