class Solution {
public boolean isMonotonic(int[] nums) {boolean increasing=true,decreasing=true;for(int i=1;i<nums.length;i++) {increasing&=nums[i]>=nums[i-1];decreasing&=nums[i]<=nums[i-1];}return increasing||decreasing;}
}
