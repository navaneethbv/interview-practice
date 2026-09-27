class Solution {
public int minIncrementForUnique(int[] nums){Arrays.sort(nums);int next=0,moves=0;for(int value:nums){int chosen=Math.max(next,value);moves+=chosen-value;next=chosen+1;}return moves;}
}
