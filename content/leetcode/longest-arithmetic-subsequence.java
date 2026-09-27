class Solution {
public int longestArithSeqLength(int[] nums) {List<Map<Integer,Integer>> ending=new ArrayList<>();for(int n:nums) ending.add(new HashMap<>());int best=2;for(int r=0;r<nums.length;r++) for(int l=0;l<r;l++) {int d=nums[r]-nums[l],length=ending.get(l).getOrDefault(d,1)+1;ending.get(r).merge(d,length,Math::max);best=Math.max(best,length);}return best;}
}
