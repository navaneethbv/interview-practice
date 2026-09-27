class Solution {
public String removeDuplicates(String s,int k) {char[] chars=new char[s.length()];int[] counts=new int[s.length()];int size=0;for(char c:s.toCharArray()) {if(size>0&&chars[size-1]==c) counts[size-1]++;else {chars[size]=c;counts[size++]=1;}if(counts[size-1]==k) size--;}StringBuilder out=new StringBuilder();for(int i=0;i<size;i++) out.append(String.valueOf(chars[i]).repeat(counts[i]));return out.toString();}
}
