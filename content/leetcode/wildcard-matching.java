class Solution {
public boolean isMatch(String s,String p){int i=0,j=0,star=-1,matched=0;while(i<s.length()){if(j<p.length()&&(p.charAt(j)=='?'||p.charAt(j)==s.charAt(i))){i++;j++;}else if(j<p.length()&&p.charAt(j)=='*'){star=j++;matched=i;}else if(star>=0){i=++matched;j=star+1;}else return false;}while(j<p.length()&&p.charAt(j)=='*')j++;return j==p.length();}
}
