class Solution {
public int longestSubstring(String s,int k){return solve(s,0,s.length(),k);}private int solve(String s,int start,int end,int k){if(end-start<k)return 0;int[]count=new int[26];for(int i=start;i<end;i++)count[s.charAt(i)-'a']++;for(int i=start;i<end;i++)if(count[s.charAt(i)-'a']<k){int best=0,left=start;for(int j=start;j<end;j++)if(count[s.charAt(j)-'a']<k){best=Math.max(best,solve(s,left,j,k));left=j+1;}return Math.max(best,solve(s,left,end,k));}return end-start;}
}
