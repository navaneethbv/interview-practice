class Solution {
public int smallestDistancePair(int[] nums,int k){Arrays.sort(nums);int l=0,r=nums[nums.length-1]-nums[0];while(l<r){int d=(l+r)/2,left=0,count=0;for(int right=0;right<nums.length;right++){while(nums[right]-nums[left]>d)left++;count+=right-left;}if(count>=k)r=d;else l=d+1;}return l;}
}
