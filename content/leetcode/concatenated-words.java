class Solution {
public List<String> findAllConcatenatedWordsInADict(String[] words){Set<String>all=new HashSet<>(Arrays.asList(words));List<String>out=new ArrayList<>();for(String word:words){boolean[]dp=new boolean[word.length()+1];dp[0]=true;for(int end=1;end<=word.length();end++)for(int start=0;start<end;start++)if(dp[start]&&(start>0||end<word.length())&&all.contains(word.substring(start,end))){dp[end]=true;break;}if(dp[word.length()])out.add(word);}return out;}
}
