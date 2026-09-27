class Solution {
public int minLength(int[] nums,int k){Map<Integer,Integer> c=new HashMap<>();long sum=0;int l=0,best=nums.length+1;for(int r=0;r<nums.length;r++){int x=nums[r];if(c.getOrDefault(x,0)==0)sum+=x;c.merge(x,1,Integer::sum);while(sum>=k){best=Math.min(best,r-l+1);int v=nums[l++];c.put(v,c.get(v)-1);if(c.get(v)==0)sum-=v;}}return best<=nums.length?best:-1;}
}
