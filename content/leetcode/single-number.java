class Solution {
public int singleNumber(int[] nums){int out=0;for(int x:nums)out^=x;return out;}
}
