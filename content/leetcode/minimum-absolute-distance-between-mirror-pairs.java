class Solution {
public int minMirrorPairDistance(int[] nums){Map<Integer,Integer> last=new HashMap<>();int ans=nums.length+1;for(int i=0;i<nums.length;i++){int x=nums[i];if(last.containsKey(x))ans=Math.min(ans,i-last.get(x));int rev=0;while(x>0){rev=rev*10+x%10;x/=10;}last.put(rev,i);}return ans<=nums.length?ans:-1;}
}
