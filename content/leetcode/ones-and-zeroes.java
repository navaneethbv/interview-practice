class Solution {
public int findMaxForm(String[] strs,int m,int n){int[][] d=new int[m+1][n+1];for(String s:strs){int z=0;for(char c:s.toCharArray())if(c=='0')z++;int o=s.length()-z;for(int i=m;i>=z;i--)for(int j=n;j>=o;j--)d[i][j]=Math.max(d[i][j],1+d[i-z][j-o]);}return d[m][n];}
}
