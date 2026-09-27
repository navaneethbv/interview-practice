class Solution {
public List<Integer> largestDivisibleSubset(int[] nums){Arrays.sort(nums);int n=nums.length,best=0;int[]len=new int[n],parent=new int[n];Arrays.fill(len,1);Arrays.fill(parent,-1);for(int i=0;i<n;i++){for(int j=0;j<i;j++)if(nums[i]%nums[j]==0&&len[j]+1>len[i]){len[i]=len[j]+1;parent[i]=j;}if(len[i]>len[best])best=i;}List<Integer>out=new ArrayList<>();while(best>=0){out.add(nums[best]);best=parent[best];}return out;}
}
