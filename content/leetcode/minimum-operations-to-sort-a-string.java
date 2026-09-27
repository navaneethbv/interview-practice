class Solution {
public int minOperations(String s){boolean sorted=true;char lo='z',hi='a';for(int i=0;i<s.length();i++){char c=s.charAt(i);lo=(char)Math.min(lo,c);hi=(char)Math.max(hi,c);if(i>0&&s.charAt(i-1)>c)sorted=false;}if(sorted)return 0;if(s.length()==2)return -1;if(s.charAt(0)==lo||s.charAt(s.length()-1)==hi)return 1;for(int i=1;i+1<s.length();i++)if(s.charAt(i)==lo||s.charAt(i)==hi)return 2;return 3;}
}
