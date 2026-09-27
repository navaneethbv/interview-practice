class Solution {
public int minimumOperations(int[] nums){Set<Integer>seen=new HashSet<>();for(int x:nums)if(x>0)seen.add(x);return seen.size();}
}
