class Solution {
public int subsetXORSum(int[] nums){int out=0;for(int mask=0;mask<(1<<nums.length);mask++){int value=0;for(int i=0;i<nums.length;i++)if((mask&(1<<i))!=0)value^=nums[i];out+=value;}return out;}
}
