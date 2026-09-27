class Solution {
public int minSwaps(int[][] grid){int n=grid.length;int[]zero=new int[n];for(int r=0;r<n;r++)for(int c=n-1;c>=0&&grid[r][c]==0;c--)zero[r]++;int out=0;for(int i=0;i<n;i++){int j=i;while(j<n&&zero[j]<n-i-1)j++;if(j==n)return -1;out+=j-i;int value=zero[j];while(j>i){zero[j]=zero[j-1];j--;}zero[i]=value;}return out;}
}
