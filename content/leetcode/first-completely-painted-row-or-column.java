class Solution {
public int firstCompleteIndex(int[] arr,int[][] mat){int m=mat.length,n=mat[0].length;int[][] pos=new int[m*n+1][2];for(int i=0;i<m;i++)for(int j=0;j<n;j++)pos[mat[i][j]]=new int[]{i,j};int[] rows=new int[m],cols=new int[n];for(int t=0;t<arr.length;t++){int i=pos[arr[t]][0],j=pos[arr[t]][1];rows[i]++;cols[j]++;if(rows[i]==n||cols[j]==m)return t;}return -1;}
}
