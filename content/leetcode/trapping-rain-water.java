class Solution {
public int trap(int[] height) {
    int l=0,r=height.length-1,lmax=0,rmax=0,total=0;
    while(l<=r) {if(lmax<=rmax) {lmax=Math.max(lmax,height[l]);total+=lmax-height[l++];}else {rmax=Math.max(rmax,height[r]);total+=rmax-height[r--];}}
    return total;
}
}
