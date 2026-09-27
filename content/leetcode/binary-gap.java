class Solution {
public int binaryGap(int n){int prev=-1,best=0;for(int bit=0;n>0;bit++,n>>>=1)if((n&1)!=0){if(prev>=0)best=Math.max(best,bit-prev);prev=bit;}return best;}
}
