class Solution {
public int[] maxValue(int[] nums){int n=nums.length;int[] suffix=new int[n+1],ans=new int[n];suffix[n]=Integer.MAX_VALUE;for(int i=n-1;i>=0;i--)suffix[i]=Math.min(nums[i],suffix[i+1]);int start=0,largest=0;for(int i=0;i<n;i++){largest=Math.max(largest,nums[i]);if(largest<=suffix[i+1]){Arrays.fill(ans,start,i+1,largest);start=i+1;largest=0;}}return ans;}
}
