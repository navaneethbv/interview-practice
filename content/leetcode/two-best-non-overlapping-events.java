class Solution {
public int maxTwoEvents(int[][] events) {Arrays.sort(events,Comparator.comparingInt(e->e[0]));int n=events.length;int[] suffix=new int[n+1];for(int i=n-1;i>=0;i--) suffix[i]=Math.max(suffix[i+1],events[i][2]);int best=0;for(int[] e:events) {int l=0,r=n;while(l<r) {int m=(l+r)/2;if(events[m][0]<=e[1]) l=m+1;else r=m;}best=Math.max(best,e[2]+suffix[l]);}return best;}
}
