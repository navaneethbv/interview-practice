class Solution {
public boolean canConstruct(String s,int k) {int[] counts=new int[26];for(char c:s.toCharArray()) counts[c-'a']++;int odd=0;for(int count:counts) odd+=count%2;return odd<=k&&k<=s.length();}
}
