class Solution {
    public int minMoves(int[] nums,int limit){
        int[] d=new int[2*limit+3];
        for (int i=0;i<nums.length/2;i++){
            int a=nums[i],b=nums[nums.length-1-i];
            d[2]+=2;
            d[Math.min(a,b)+1]--;
            d[a+b]--;
            d[a+b+1]++;
            d[Math.max(a,b)+limit+1]++;
        }
        int cur=0,ans=nums.length;
        for (int s=2;s<=2*limit;s++){
            cur+=d[s];
            ans=Math.min(ans,cur);
        }
        return ans;
    }
}
