class Solution {
public int findMaxConsecutiveOnes(int[] nums) {int best=0,current=0;for(int n:nums) {current=n==1?current+1:0;best=Math.max(best,current);}return best;}
}
