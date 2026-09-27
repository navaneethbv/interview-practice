class Solution {
public int removeDuplicates(int[] nums) {int k=0;for(int n:nums) if(k==0||n!=nums[k-1]) nums[k++]=n;return k;}
}
