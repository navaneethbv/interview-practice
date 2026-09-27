class Solution {
public char findTheDifference(String s,String t){char value=0;for(char c:s.toCharArray())value^=c;for(char c:t.toCharArray())value^=c;return value;}
}
