class Solution {
public int minimumDistance(int[] nums){Map<Integer,List<Integer>> p=new HashMap<>();int best=nums.length*3;for(int i=0;i<nums.length;i++){List<Integer> a=p.computeIfAbsent(nums[i],x->new ArrayList<>());a.add(i);if(a.size()>=3)best=Math.min(best,2*(i-a.get(a.size()-3)));}return best<nums.length*3?best:-1;}
}
