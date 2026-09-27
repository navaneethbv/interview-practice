class Solution {
public int numberOfArithmeticSlices(int[] nums) {int ending=0,total=0;for(int i=2;i<nums.length;i++) {ending=nums[i]-nums[i-1]==nums[i-1]-nums[i-2]?ending+1:0;total+=ending;}return total;}
}
