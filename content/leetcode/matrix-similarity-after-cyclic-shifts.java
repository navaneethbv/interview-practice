class Solution {
public boolean areSimilar(int[][] mat,int k){int n=mat[0].length;for(int[]row:mat)for(int c=0;c<n;c++)if(row[c]!=row[(c+k)%n])return false;return true;}
}
