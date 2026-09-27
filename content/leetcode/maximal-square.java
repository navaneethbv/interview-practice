class Solution {
public int maximalSquare(char[][] matrix){int[]prev=new int[matrix[0].length+1];int best=0;for(char[]row:matrix){int[]cur=new int[prev.length];for(int j=0;j<row.length;j++)if(row[j]=='1'){cur[j+1]=1+Math.min(prev[j],Math.min(prev[j+1],cur[j]));best=Math.max(best,cur[j+1]);}prev=cur;}return best*best;}
}
