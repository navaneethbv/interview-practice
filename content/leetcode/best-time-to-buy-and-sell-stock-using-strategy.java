class Solution {
public long maxProfit(int[] prices,int[] strategy,int k) {int n=prices.length;long[] original=new long[n+1],values=new long[n+1];for(int i=0;i<n;i++) {original[i+1]=original[i]+(long)prices[i]*strategy[i];values[i+1]=values[i]+prices[i];}long best=original[n];for(int start=0;start+k<=n;start++) {int end=start+k;long gain=values[end]-values[start+k/2]-(original[end]-original[start]);best=Math.max(best,original[n]+gain);}return best;}
}
