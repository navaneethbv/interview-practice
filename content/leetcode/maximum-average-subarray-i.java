class Solution {
public double findMaxAverage(int[] nums,int k){int total=0;for(int i=0;i<k;i++)total+=nums[i];int best=total;for(int i=k;i<nums.length;i++){total+=nums[i]-nums[i-k];best=Math.max(best,total);}return (double)best/k;}
}
