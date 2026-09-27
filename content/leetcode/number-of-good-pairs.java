class Solution {
public int numIdenticalPairs(int[] nums){int[]count=new int[101];int out=0;for(int x:nums)out+=count[x]++;return out;}
}
