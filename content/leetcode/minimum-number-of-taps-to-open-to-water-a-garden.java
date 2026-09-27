class Solution {
public int minTaps(int n,int[] ranges) {int[] reach=new int[n+1];for(int i=0;i<=n;i++) {int l=Math.max(0,i-ranges[i]);reach[l]=Math.max(reach[l],Math.min(n,i+ranges[i]));}int used=0,end=0,far=0;for(int p=0;p<n;p++) {far=Math.max(far,reach[p]);if(p==end) {if(far<=p) return -1;used++;end=far;}}return used;}
}
