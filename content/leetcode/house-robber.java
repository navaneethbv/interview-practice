class Solution {
public int rob(int[] nums){int older=0,prev=0;for(int value:nums){int next=Math.max(prev,older+value);older=prev;prev=next;}return prev;}
}
