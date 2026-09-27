class Solution {
public int maxOperations(int[] nums,int k) {Map<Integer,Integer> available=new HashMap<>();int total=0;for(int n:nums) {int count=available.getOrDefault(k-n,0);if(count>0) {available.put(k-n,count-1);total++;}else available.merge(n,1,Integer::sum);}return total;}
}
