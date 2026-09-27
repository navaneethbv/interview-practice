class Solution {
public long minimumCost(String source,String target,char[] original,char[] changed,int[] cost){long inf=Long.MAX_VALUE/4;long[][] d=new long[26][26];for(int i=0;i<26;i++){Arrays.fill(d[i],inf);d[i][i]=0;}for(int i=0;i<cost.length;i++){int a=original[i]-97,b=changed[i]-97;d[a][b]=Math.min(d[a][b],cost[i]);}for(int k=0;k<26;k++)for(int i=0;i<26;i++)for(int j=0;j<26;j++)d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);long answer=0;for(int i=0;i<source.length();i++){long c=d[source.charAt(i)-97][target.charAt(i)-97];if(c==inf)return -1;answer+=c;}return answer;}
}
