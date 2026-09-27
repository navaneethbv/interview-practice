class Solution {
public int maxEnvelopes(int[][] envelopes){Arrays.sort(envelopes,(a,b)->a[0]==b[0]?Integer.compare(b[1],a[1]):Integer.compare(a[0],b[0]));int[]tails=new int[envelopes.length];int size=0;for(int[]e:envelopes){int l=0,r=size;while(l<r){int m=(l+r)/2;if(tails[m]<e[1])l=m+1;else r=m;}tails[l]=e[1];if(l==size)size++;}return size;}
}
