class Solution {
public int[] getSubarrayBeauty(int[] nums,int k,int x){int[] f=new int[101],a=new int[nums.length-k+1];for(int i=0;i<nums.length;i++){f[nums[i]+50]++;if(i>=k)f[nums[i-k]+50]--;if(i>=k-1){int rem=x;for(int j=0;j<50;j++){rem-=f[j];if(rem<=0){a[i-k+1]=j-50;break;}}}}return a;}
}
