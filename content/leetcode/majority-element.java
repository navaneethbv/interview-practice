class Solution {
public int majorityElement(int[] nums){int value=0,count=0;for(int x:nums){if(count==0)value=x;count+=x==value?1:-1;}return value;}
}
