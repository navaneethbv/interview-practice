class Solution {
public String removeDuplicateLetters(String s){int[]left=new int[26];boolean[]used=new boolean[26];for(char c:s.toCharArray())left[c-'a']++;StringBuilder out=new StringBuilder();for(char c:s.toCharArray()){left[c-'a']--;if(used[c-'a'])continue;while(out.length()>0&&out.charAt(out.length()-1)>c&&left[out.charAt(out.length()-1)-'a']>0){used[out.charAt(out.length()-1)-'a']=false;out.setLength(out.length()-1);}out.append(c);used[c-'a']=true;}return out.toString();}
}
