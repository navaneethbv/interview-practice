class Solution {
public int[] findMissingAndRepeatedValues(int[][] grid){int n=grid.length;int[] count=new int[n*n+1],answer=new int[2];for(int[] row:grid)for(int x:row)count[x]++;for(int x=1;x<count.length;x++){if(count[x]==2)answer[0]=x;if(count[x]==0)answer[1]=x;}return answer;}
}
