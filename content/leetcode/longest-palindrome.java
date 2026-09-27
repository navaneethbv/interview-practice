class Solution {
public int longestPalindrome(String s){int[]c=new int[128];for(char x:s.toCharArray())c[x]++;int total=0;for(int n:c)total+=n/2*2;return total+(total<s.length()?1:0);}
}
