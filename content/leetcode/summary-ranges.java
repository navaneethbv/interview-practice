class Solution {
public List<String> summaryRanges(int[] nums){List<String>out=new ArrayList<>();for(int i=0;i<nums.length;){int j=i;while(j+1<nums.length&&(long)nums[j+1]==(long)nums[j]+1)j++;out.add(i==j?String.valueOf(nums[i]):nums[i]+"->"+nums[j]);i=j+1;}return out;}
}
