class Solution {
public int maxSumDivThree(int[] nums) {int[] best={0,-1000000000,-1000000000};for(int value:nums) {int[] next=best.clone();for(int r=0;r<3;r++) next[(r+value)%3]=Math.max(next[(r+value)%3],best[r]+value);best=next;}return best[0];}
}
