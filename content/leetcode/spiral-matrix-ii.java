class Solution {
public int[][] generateMatrix(int n) {int[][] a=new int[n][n];int top=0,left=0,bottom=n-1,right=n-1,value=1;while(top<=bottom) {for(int c=left;c<=right;c++) a[top][c]=value++;top++;for(int r=top;r<=bottom;r++) a[r][right]=value++;right--;if(top<=bottom) {for(int c=right;c>=left;c--) a[bottom][c]=value++;bottom--;}if(left<=right) {for(int r=bottom;r>=top;r--) a[r][left]=value++;left++;}}return a;}
}
