class Solution {
public int removeDuplicates(int[] nums){int write=0;for(int value:nums)if(write<2||value!=nums[write-2])nums[write++]=value;return write;}
}
