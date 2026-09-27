class Solution {
public int findMaxVal(int n,int[][] restrictions,int[] diff){int[] a=new int[n];Arrays.fill(a,1000000000);a[0]=0;for(int[] r:restrictions)a[r[0]]=r[1];for(int i=1;i<n;i++)a[i]=Math.min(a[i],a[i-1]+diff[i-1]);for(int i=n-2;i>=0;i--)a[i]=Math.min(a[i],a[i+1]+diff[i]);return Arrays.stream(a).max().getAsInt();}
}
