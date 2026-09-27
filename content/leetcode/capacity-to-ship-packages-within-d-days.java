class Solution {
public int shipWithinDays(int[] weights,int days){int l=0,r=0;for(int w:weights){l=Math.max(l,w);r+=w;}while(l<r){int m=(l+r)/2,used=1,load=0;for(int w:weights){if(load+w>m){used++;load=0;}load+=w;}if(used<=days)r=m;else l=m+1;}return l;}
}
