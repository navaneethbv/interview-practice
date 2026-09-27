class Solution {
int gcd(int a,int b){while(b!=0){int t=a%b;a=b;b=t;}return a;}public int minOperations(int[] nums,int[] numsDivide){int g=0;for(int x:numsDivide)g=gcd(g,x);Arrays.sort(nums);for(int i=0;i<nums.length;i++)if(g%nums[i]==0)return i;return -1;}
}
