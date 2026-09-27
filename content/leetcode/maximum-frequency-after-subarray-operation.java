class Solution {
public int maxFrequency(int[] nums,int k) {int baseline=0,best=0;for(int n:nums) if(n==k) baseline++;for(int source=1;source<=50;source++) {if(source==k) continue;int gain=0;for(int n:nums) {gain=Math.max(0,gain+(n==source?1:0)-(n==k?1:0));best=Math.max(best,gain);}}return baseline+best;}
}
