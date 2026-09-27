class Solution {
public int repeatedNTimes(int[] nums) {Set<Integer> seen=new HashSet<>();for(int n:nums) if(!seen.add(n)) return n;throw new IllegalStateException();}
}
