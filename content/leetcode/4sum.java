class Solution {
public List<List<Integer>> fourSum(int[] nums,int target) {
    Arrays.sort(nums);List<List<Integer>> out=new ArrayList<>();
    for(int a=0;a<nums.length-3;a++) {if(a>0&&nums[a]==nums[a-1]) continue;for(int b=a+1;b<nums.length-2;b++) {if(b>a+1&&nums[b]==nums[b-1]) continue;int l=b+1,r=nums.length-1;
        while(l<r) {long sum=(long)nums[a]+nums[b]+nums[l]+nums[r];if(sum<target) l++;else if(sum>target) r--;else {out.add(Arrays.asList(nums[a],nums[b],nums[l],nums[r]));l++;r--;while(l<r&&nums[l]==nums[l-1]) l++;while(l<r&&nums[r]==nums[r+1]) r--;}}
    }}return out;
}
}
