class Solution {
public int countBinarySubstrings(String s) {int previous=0,current=1,total=0;for(int i=1;i<s.length();i++) {if(s.charAt(i)==s.charAt(i-1)) current++;else {total+=Math.min(previous,current);previous=current;current=1;}}return total+Math.min(previous,current);}
}
