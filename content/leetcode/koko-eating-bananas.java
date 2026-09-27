class Solution {
public int minEatingSpeed(int[] piles,int h) {
    int l=1,r=Arrays.stream(piles).max().getAsInt();
    while(l<r) {int m=l+(r-l)/2;long hours=0;for(int p:piles) hours+=(p+(long)m-1)/m;if(hours<=h) r=m;else l=m+1;}
    return l;
}
}
