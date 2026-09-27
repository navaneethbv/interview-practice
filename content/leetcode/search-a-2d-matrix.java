class Solution {
public boolean searchMatrix(int[][] matrix,int target) {
    int n=matrix[0].length,l=0,r=matrix.length*n-1;
    while(l<=r) {int m=(l+r)/2,v=matrix[m/n][m%n];if(v==target) return true;if(v<target) l=m+1;else r=m-1;}
    return false;
}
}
