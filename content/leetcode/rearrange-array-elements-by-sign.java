class Solution {
public int[] rearrangeArray(int[] nums) {int[] result=new int[nums.length];int p=0,n=1;for(int value:nums) {if(value>0) {result[p]=value;p+=2;}else {result[n]=value;n+=2;}}return result;}
}
