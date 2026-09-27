class Solution {
public int maxSumSubmatrix(int[][] matrix,int k){int m=matrix.length,n=matrix[0].length,best=Integer.MIN_VALUE;for(int top=0;top<m;top++){int[]columns=new int[n];for(int bottom=top;bottom<m;bottom++){for(int c=0;c<n;c++)columns[c]+=matrix[bottom][c];TreeSet<Integer>seen=new TreeSet<>();seen.add(0);int sum=0;for(int value:columns){sum+=value;Integer prev=seen.ceiling(sum-k);if(prev!=null)best=Math.max(best,sum-prev);seen.add(sum);}}}return best;}
}
