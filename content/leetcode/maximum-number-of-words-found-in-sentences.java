class Solution {
public int mostWordsFound(String[] sentences) {int best=0;for(String s:sentences) {int count=1;for(char c:s.toCharArray()) if(c==' ') count++;best=Math.max(best,count);}return best;}
}
