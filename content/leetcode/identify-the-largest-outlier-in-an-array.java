class Solution {
public int getLargestOutlier(int[] nums){Map<Integer,Integer> c=new HashMap<>();int total=0,ans=-1001;for(int x:nums){total+=x;c.merge(x,1,Integer::sum);}for(int x:nums){int rest=total-x;if(rest%2==0&&c.getOrDefault(rest/2,0)-(rest/2==x?1:0)>0)ans=Math.max(ans,x);}return ans;}
}
