class Solution {
public int findNumbers(int[] nums){int ans=0;for(int x:nums)if(Integer.toString(x).length()%2==0)ans++;return ans;}
}
