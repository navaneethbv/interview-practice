class Solution {
public boolean containsNearbyDuplicate(int[] nums,int k) {Map<Integer,Integer> last=new HashMap<>();for(int i=0;i<nums.length;i++) {Integer previous=last.put(nums[i],i);if(previous!=null&&i-previous<=k) return true;}return false;}
}
