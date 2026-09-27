class Solution {
public int kthSmallest(int[][] matrix,int k) {int n=matrix.length;long l=matrix[0][0],r=matrix[n-1][n-1];while(l<r) {long m=l+(r-l)/2;int count=0,c=n-1;for(int[] row:matrix) {while(c>=0&&row[c]>m) c--;count+=c+1;}if(count<k) l=m+1;else r=m;}return (int)l;}
}
