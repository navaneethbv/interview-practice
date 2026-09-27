class Solution {
public boolean increasingTriplet(int[] nums) {long first=Long.MAX_VALUE,second=Long.MAX_VALUE;for(int n:nums) {if(n<=first) first=n;else if(n<=second) second=n;else return true;}return false;}
}
