class Solution {
public int[] getConcatenation(int[] nums){int[]out=new int[2*nums.length];for(int i=0;i<out.length;i++)out[i]=nums[i%nums.length];return out;}
}
