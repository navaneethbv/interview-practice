class Solution {
public boolean wordBreak(String s,List<String> wordDict){Set<String> words=new HashSet<>(wordDict);boolean[] dp=new boolean[s.length()+1];dp[0]=true;int limit=0;for(String w:words)limit=Math.max(limit,w.length());for(int end=1;end<=s.length();end++)for(int start=Math.max(0,end-limit);start<end;start++)if(dp[start]&&words.contains(s.substring(start,end))){dp[end]=true;break;}return dp[s.length()];}
}
